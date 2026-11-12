"use client";
import { useEffect, useRef } from "react";
import styles from "./Divider.module.css";

// * A dithered band between sections.
// Light theme: each divider is a different piece of a space scene, named by
// variant: "wave", "galaxy", "asteroids", "stardust", "sound", and "ripples".
// Dark theme: every divider is the same braid, two stardust streams crossing
// like sound waves around a dotted center line, with a small planet sitting
// on one of the crossings. Which planet and where depends on the variant.
// The first time a dark divider scrolls into view it draws itself out from
// the center, two glints race to the edges, and the planet rises into place.

// Planet per divider: plain or ringed, and its offset from the center crossing
// (crossings are 380px apart). Phones always use the center crossing.
const PLANETS = {
  wave: { type: "plain", x: 0 },
  galaxy: { type: "ringed", x: 380 },
  asteroids: { type: "plain", x: -380 },
  stardust: { type: "ringed", x: 0 },
  sound: { type: "plain", x: 380 },
  ripples: { type: "ringed", x: -380 },
};

function Divider({ variant }) {
  const ref = useRef(null);
  const planet = PLANETS[variant] || PLANETS.wave;

  // Hide the braid until it is scrolled to, then play the reveal once.
  // Without JavaScript, or with reduced motion, it simply shows.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    el.classList.add(styles.armed);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.classList.add(styles.shown);
          observer.disconnect();
        }
      },
      { threshold: 0.6, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className={`${styles.divider} ${styles[variant]}`}>
      <div className={styles.art}></div>
      <div className={styles.braid} style={{ "--planet-x": `${planet.x}px` }}>
        <span className={`${styles.stream} ${styles.streamA}`}></span>
        <span className={`${styles.stream} ${styles.streamB}`}></span>
        <span className={`${styles.glint} ${styles.glintLeft}`}></span>
        <span className={`${styles.glint} ${styles.glintRight}`}></span>
        <span className={`${styles.planet} ${planet.type === "ringed" ? styles.ringed : styles.plain}`}>
          <span className={styles.planetSolid}></span>
          <span className={styles.planetDots}></span>
        </span>
      </div>
    </div>
  );
}

export default Divider;
