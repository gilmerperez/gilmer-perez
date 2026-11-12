"use client";
import { useEffect, useRef } from "react";
import styles from "./Divider.module.css";

// * A dithered band between sections.
// Light theme: a strip of sky with clouds, wind lines, and small birds. There
// are six strips; the `sky` prop (1 to 6) picks one.
// Dark theme: every divider is the same braid, two stardust streams crossing
// like sound waves around a dotted center line.
// The first time a divider scrolls into view it draws itself out from the
// center (in the dark theme two glints also race to the edges). After that
// the sky drifts slowly and the stardust shimmers.

function Divider({ sky = 1 }) {
  const ref = useRef(null);

  // Hide the art until it is scrolled to, then play the reveal once.
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
    <div ref={ref} aria-hidden="true" className={styles.divider}>
      <div className={styles.sky} style={{ "--art": `url("/dither/dv-sky-${sky}.png")` }}></div>
      <div className={styles.braid}>
        <span className={`${styles.stream} ${styles.streamA}`}></span>
        <span className={`${styles.stream} ${styles.streamB}`}></span>
        <span className={`${styles.glint} ${styles.glintLeft}`}></span>
        <span className={`${styles.glint} ${styles.glintRight}`}></span>
      </div>
    </div>
  );
}

export default Divider;
