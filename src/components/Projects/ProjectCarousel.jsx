"use client";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import ProjectCard from "./ProjectCard";
import styles from "./Projects.module.css";

// Drift speed in pixels per second. Slow enough to read a card as it passes.
const DRIFT_SPEED = 22;
// Length of a manual move (arrows, dots, swipe snap)
const MOVE_MS = 650;
// Pointer travel before a press counts as a drag instead of a click
const DRAG_THRESHOLD = 6;
// Narrow screens fit one card, so they glide card to card and hold each one
// instead of drifting (a constant drift would leave two half cards most of the time)
const STEP_MODE_MAX_WIDTH = 640;
const HOLD_MS = 4000;

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const mod = (value, size) => ((value % size) + size) % size;

// Reduced-motion preference as an external store (false on the server)
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (callback) => {
  const query = window.matchMedia(REDUCED_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};
const getReduced = () => window.matchMedia(REDUCED_QUERY).matches;
const getReducedOnServer = () => false;

// * Infinite carousel. The project list is rendered three times (the middle copy is
// the real one, the outer copies are aria-hidden clones) and the track is moved by
// `offset`, wrapped to one copy's width, so the loop never runs out of cards.
// When offset is i * step, real card i sits in the center.
// Every frame each card gets a --focus value from 0 to 1 based on how close it is
// to the center. CSS turns that into the scale and the glow, so the card grows
// smoothly as it slides in instead of popping.
function ProjectCarousel({ projects, onOpen, cardRefs, modalOpen }) {
  const total = projects.length;
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const slideRefs = useRef([]);

  // Motion state lives in a ref: it changes every frame and must not re-render React
  const motion = useRef({ offset: 0, step: 0, tween: null, drag: null, visible: true, reduced: false, stepMode: false, holdUntil: 0 });

  const [activeIndex, setActiveIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeReduced, getReduced, getReducedOnServer);

  // Drift only when nobody is reading, pointing, typing, or looking at a project
  const drifting = !userPaused && !hovered && !focused && !modalOpen && !reducedMotion;
  const driftingRef = useRef(drifting);
  useEffect(() => {
    driftingRef.current = drifting;
    motion.current.reduced = reducedMotion;
  }, [drifting, reducedMotion]);

  // * Layout: place the track and set each card's focus value
  const render = useCallback(() => {
    const m = motion.current;
    if (!m.step || !trackRef.current) return;
    const setWidth = m.step * total;
    const shown = mod(m.offset, setWidth);
    trackRef.current.style.transform = `translate3d(${-shown}px, 0, 0)`;

    slideRefs.current.forEach((el, j) => {
      if (!el) return;
      // Distance from the center, in cards (copy 1 starts at j = total)
      const distance = Math.abs((j - total) * m.step - shown) / m.step;
      el.style.setProperty("--focus", Math.max(0, 1 - distance).toFixed(3));
    });

    const nearest = mod(Math.round(m.offset / m.step), total);
    setActiveIndex((current) => (current === nearest ? current : nearest));
  }, [total]);

  // * Measure one step (card width plus gap) and re-measure on resize
  useEffect(() => {
    const measure = () => {
      const card = slideRefs.current[total];
      const track = trackRef.current;
      if (!card || !track) return;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const m = motion.current;
      const oldStep = m.step;
      m.step = card.offsetWidth + gap;
      m.stepMode = viewportRef.current.offsetWidth <= STEP_MODE_MAX_WIDTH;
      // Keep the same card centered when the step changes
      if (oldStep) m.offset = (m.offset / oldStep) * m.step;
      render();
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, [render, total]);

  // * Stop the frame loop while the section is off screen
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      motion.current.visible = entry.isIntersecting;
    });
    observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, []);

  // * Frame loop: runs a manual move if one is in progress, otherwise drifts
  useEffect(() => {
    let frame;
    let last = performance.now();
    const tick = (now) => {
      const m = motion.current;
      // Cap the time step so returning to a background tab does not jump the track
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      if (m.visible && m.step && !m.drag) {
        if (m.tween) {
          const t = Math.min((now - m.tween.start) / m.tween.duration, 1);
          m.offset = m.tween.from + (m.tween.to - m.tween.from) * easeOutCubic(t);
          if (t === 1) {
            m.tween = null;
            m.holdUntil = now + HOLD_MS;
          }
          render();
        } else if (!driftingRef.current) {
          // Paused: start a fresh hold when motion resumes
          m.holdUntil = now + HOLD_MS;
        } else if (m.stepMode) {
          if (now >= m.holdUntil) {
            m.tween = { from: m.offset, to: (Math.round(m.offset / m.step) + 1) * m.step, start: now, duration: MOVE_MS * 1.6 };
          }
        } else {
          m.offset += DRIFT_SPEED * dt;
          render();
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [render]);

  // * Manual moves. Positions are in card units; the track wraps on its own.
  const moveTo = useCallback(
    (cardPosition) => {
      const m = motion.current;
      if (!m.step) return;
      const to = cardPosition * m.step;
      if (m.reduced) {
        m.tween = null;
        m.offset = to;
        render();
        return;
      }
      m.tween = { from: m.offset, to, start: performance.now(), duration: MOVE_MS };
    },
    [render]
  );

  // The card position nearest the center right now (unwrapped)
  const currentPosition = () => {
    const m = motion.current;
    const target = m.tween ? m.tween.to : m.offset;
    return Math.round(target / m.step);
  };

  const goBy = (delta) => moveTo(currentPosition() + delta);

  // Go to a real project by the shortest way around the loop
  const goToIndex = useCallback(
    (index) => {
      const m = motion.current;
      if (!m.step) return;
      const position = Math.round((m.tween ? m.tween.to : m.offset) / m.step);
      let diff = mod(index - mod(position, total), total);
      if (diff > total / 2) diff -= total;
      if (diff !== 0) moveTo(position + diff);
    },
    [moveTo, total]
  );

  // * Keyboard: arrow keys move one card when focus is anywhere in the carousel
  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goBy(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goBy(-1);
    }
  };

  // * Focus: tabbing to a real card brings it to the center
  const handleFocus = (event) => {
    setFocused(true);
    const slide = event.target.closest("[data-index]");
    if (slide && slide.dataset.clone === "false") goToIndex(Number(slide.dataset.index));
  };

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
  };

  // * Drag and swipe. Capture starts only after the threshold so a plain click
  // still reaches the card's buttons; after a real drag the click is swallowed.
  const handlePointerDown = (event) => {
    if (event.button !== 0) return;
    const m = motion.current;
    m.drag = { startX: event.clientX, startOffset: m.offset, moved: false, id: event.pointerId };
    m.tween = null;
  };

  const handlePointerMove = (event) => {
    const m = motion.current;
    if (!m.drag || m.drag.id !== event.pointerId) return;
    const dx = event.clientX - m.drag.startX;
    if (!m.drag.moved && Math.abs(dx) > DRAG_THRESHOLD) {
      m.drag.moved = true;
      viewportRef.current.setPointerCapture(event.pointerId);
    }
    if (m.drag.moved) {
      m.offset = m.drag.startOffset - dx;
      render();
    }
  };

  const endDrag = (event) => {
    const m = motion.current;
    if (!m.drag || m.drag.id !== event.pointerId) return;
    const { moved } = m.drag;
    m.drag = moved ? { ...m.drag, swallowClick: true, done: true } : null;
    if (moved) {
      // Snap to the nearest card
      moveTo(Math.round(m.offset / m.step));
      // Clear after the click that follows this pointerup has been swallowed
      setTimeout(() => {
        if (m.drag?.done) m.drag = null;
      }, 0);
    }
  };

  const handleClickCapture = (event) => {
    if (motion.current.drag?.swallowClick) {
      event.preventDefault();
      event.stopPropagation();
      motion.current.drag = null;
    }
  };

  // Three copies: [clones][real][clones]
  const slides = [0, 1, 2].flatMap((copy) =>
    projects.map((project, i) => ({ project, i, copy, key: `${copy}-${project.id}` }))
  );

  const activeProject = projects[activeIndex];
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-roledescription="carousel"
      aria-label="Projects"
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        ref={viewportRef}
        className={styles.viewport}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={handleClickCapture}
        onDragStart={(event) => event.preventDefault()}
      >
        <div ref={trackRef} className={styles.track} style={{ "--count": total }}>
          {slides.map(({ project, i, copy, key }, j) => {
            const isClone = copy !== 1;
            return (
              <div
                key={key}
                ref={(el) => {
                  slideRefs.current[j] = el;
                }}
                className={styles.slide}
                data-index={i}
                data-clone={String(isClone)}
                // The first real card starts centered, so the server HTML already matches
                style={{ "--focus": j === total ? 1 : 0 }}
                {...(isClone
                  ? { "aria-hidden": "true" }
                  : { role: "group", "aria-roledescription": "slide", "aria-label": `${i + 1} of ${total}: ${project.title}` })}
              >
                <ProjectCard
                  project={project}
                  isClone={isClone}
                  onOpen={() => onOpen(i)}
                  buttonRef={
                    isClone
                      ? undefined
                      : (el) => {
                          cardRefs.current[i] = el;
                        }
                  }
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls: previous, a dot per project, pause, next */}
      <div className={styles.controls}>
        <button type="button" className={styles.controlButton} onClick={() => goBy(-1)} aria-label="Previous project">
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>

        <div className={styles.dots}>
          {projects.map((project, i) => (
            <button
              key={project.id}
              type="button"
              className={styles.dot}
              onClick={() => goToIndex(i)}
              aria-label={`Show project ${i + 1}: ${project.title}`}
              aria-current={i === activeIndex ? "true" : undefined}
            >
              <span className={styles.dotMark} />
            </button>
          ))}
        </div>

        {!reducedMotion && (
          <button
            type="button"
            className={styles.controlButton}
            onClick={() => setUserPaused((paused) => !paused)}
            aria-label={userPaused ? "Play the carousel" : "Pause the carousel"}
            aria-pressed={userPaused}
          >
            {userPaused ? (
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            ) : (
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6.5" y="5" width="3.5" height="14" rx="1" />
                <rect x="14" y="5" width="3.5" height="14" rx="1" />
              </svg>
            )}
          </button>
        )}

        <button type="button" className={styles.controlButton} onClick={() => goBy(1)} aria-label="Next project">
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Counter. Announced only while the carousel is still, so drift does not spam screen readers. */}
      <p className={styles.counter} aria-live={drifting ? "off" : "polite"} aria-atomic="true">
        <span className={styles.counterNum}>
          {pad(activeIndex + 1)} / {pad(total)}
        </span>
        <span className={styles.counterTitle}>{activeProject.title}</span>
      </p>
    </div>
  );
}

export default ProjectCarousel;
