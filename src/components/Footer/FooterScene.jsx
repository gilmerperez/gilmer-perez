import styles from "./Footer.module.css";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

// * Scene at the bottom of the footer. The landscape (mountains, glowing horizon,
// grid, and road) is a dithered mask image tinted with the theme's footer dither
// color: at night the sky has stars, constellations, and a shooting star; by day
// it has the same engraved clouds, wind lines, and birds as the final CTA. On top sits the moon (the sun by day), which is the theme switch.
function FooterScene() {
  return (
    <div className={styles.scene}>
      <div aria-hidden="true" className={styles.sceneArt}></div>

      {/* Shooting star (night only) */}
      <span aria-hidden="true" className={styles.shootingStar}></span>

      {/* The moon: click it to switch between dark and light */}
      <div className={styles.moon}>
        <ThemeToggle />
      </div>
    </div>
  );
}

export default FooterScene;
