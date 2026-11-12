"use client";
import { useSyncExternalStore } from "react";
import styles from "./ThemeToggle.module.css";
import { readTheme, subscribeTheme, switchTheme } from "../../lib/theme";

// * The moon in the footer sky. Clicking it switches between the dark and light
// themes (see src/lib/theme.js). In the light theme its shade slides away and it
// becomes a small sun.

function ThemeToggle() {
  // null on the server: it cannot know the visitor's saved theme
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => null);
  const label = theme === "light" ? "Switch to the dark theme" : "Switch to the light theme";

  return (
    <button type="button" onClick={(event) => switchTheme(event)} aria-label={label} className={styles.orb}>
      <span aria-hidden="true" className={styles.halo}></span>
      <span aria-hidden="true" className={styles.disc}></span>
      <span aria-hidden="true" className={styles.shade}></span>
      <span aria-hidden="true" className={styles.sparkle}></span>
    </button>
  );
}

export default ThemeToggle;
