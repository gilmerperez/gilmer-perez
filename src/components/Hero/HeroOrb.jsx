"use client";
import { useSyncExternalStore } from "react";
import styles from "./Hero.module.css";
import { readTheme, subscribeTheme, switchTheme } from "../../lib/theme";

// * The invisible button over the hero's sun (light theme) or black hole (dark
// theme). Clicking it switches the theme, so the sun collapses into a black hole
// or the black hole opens back out into the sun. A second switch alongside the
// moon in the footer.

function HeroOrb() {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => null);
  const label =
    theme === "light"
      ? "Collapse the sun into a black hole (switch to the dark theme)"
      : "Turn the black hole back into the sun (switch to the light theme)";

  return <button type="button" aria-label={label} className={styles.orb} onClick={(event) => switchTheme(event, 1100)}></button>;
}

export default HeroOrb;
