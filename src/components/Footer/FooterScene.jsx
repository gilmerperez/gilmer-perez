import styles from "./Footer.module.css";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

// * Night scene at the bottom of the footer. The landscape (stars, constellations,
// mountains, glowing horizon, grid, and road) is one dithered mask image tinted with
// the theme's footer dither color. On top of it: a car whose taillights pulse, a
// shooting star that streaks across now and then, and the moon, which is the theme switch.
function FooterScene() {
  return (
    <div className={styles.scene}>
      <div aria-hidden="true" className={styles.sceneArt}></div>

      {/* Shooting star */}
      <span aria-hidden="true" className={styles.shootingStar}></span>

      {/* The moon: click it to switch between dark and light */}
      <div className={styles.moon}>
        <ThemeToggle />
      </div>

      {/* Car on the road, seen from behind */}
      <svg aria-hidden="true" viewBox="0 0 120 70" className={styles.car}>
        <rect x="22" y="6" width="76" height="30" rx="12" fill="var(--footer-bg)" />
        <rect x="8" y="24" width="104" height="36" rx="10" fill="var(--footer-bg)" />
        <rect x="14" y="32" width="22" height="8" rx="3" fill="var(--footer-accent)" className={styles.taillight} />
        <rect x="84" y="32" width="22" height="8" rx="3" fill="var(--footer-accent)" className={styles.taillight} />
        <rect x="40" y="34" width="40" height="3" rx="1.5" fill="var(--footer-accent)" opacity="0.6" />
      </svg>
      <span aria-hidden="true" className={styles.carGlow}></span>
    </div>
  );
}

export default FooterScene;
