"use client";
import { useSyncExternalStore } from "react";
import styles from "./ThemeToggle.module.css";

// * The moon in the footer sky. Clicking it switches between the dark theme
// (Graphite and Blue) and the light theme (Cream and Cobalt). In browsers with
// the View Transitions API the new theme spreads out from the moon as a growing
// circle; elsewhere it switches instantly. The choice is saved in localStorage
// and read back before first paint by the script in layout.jsx.

const STORAGE_KEY = "theme";

function readTheme() {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Private browsing can block storage. The switch still works for this visit.
  }
}

// Re-render whenever data-theme on <html> changes
function subscribe(onChange) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function ThemeToggle() {
  // null on the server: it cannot know the visitor's saved theme
  const theme = useSyncExternalStore(subscribe, readTheme, () => null);

  const handleClick = (event) => {
    const next = readTheme() === "dark" ? "light" : "dark";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || reduceMotion) {
      applyTheme(next);
      return;
    }

    // Grow the new theme out of the moon, far enough to cover the farthest corner
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = document.startViewTransition(() => applyTheme(next));
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 900, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
  };

  const label = theme === "light" ? "Switch to the dark theme" : "Switch to the light theme";

  return (
    <button type="button" onClick={handleClick} aria-label={label} className={styles.orb}>
      <span aria-hidden="true" className={styles.halo}></span>
      <span aria-hidden="true" className={styles.disc}></span>
      <span aria-hidden="true" className={styles.shade}></span>
      <span aria-hidden="true" className={styles.sparkle}></span>
    </button>
  );
}

export default ThemeToggle;
