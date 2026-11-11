import styles from "./Footer.module.css";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

// * Scene at the bottom of the footer. The landscape (mountains, glowing horizon,
// grid, and road) is a dithered mask image tinted with the theme's footer dither
// color: at night the sky has stars, constellations, and a shooting star; by day
// it has clouds. On top: an original low, wide sports car seen from behind, and
// the moon (the sun by day), which is the theme switch.
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

      {/* Taillight glow on the road */}
      <span aria-hidden="true" className={styles.carGlow}></span>

      {/* Sports car, rear view */}
      <svg aria-hidden="true" viewBox="0 0 160 72" className={styles.car}>
        {/* Tires */}
        <rect x="12" y="50" width="26" height="18" rx="4" fill="#050505" />
        <rect x="122" y="50" width="26" height="18" rx="4" fill="#050505" />
        {/* Cabin and rear glass */}
        <path d="M54 27 L63 11 Q80 6 97 11 L106 27 Z" fill="var(--car-body)" stroke="var(--car-rim)" strokeWidth="1.1" />
        <path d="M60 25 L67 13.5 Q80 10 93 13.5 L100 25 Z" fill="var(--footer-bg)" opacity="0.9" />
        {/* Wide body with flared rear fenders */}
        <path
          d="M6 50 Q4 36 20 31 L48 26.5 Q80 22.5 112 26.5 L140 31 Q156 36 154 50 Q154 58 145 58 L15 58 Q6 58 6 50 Z"
          fill="var(--car-body)"
          stroke="var(--car-rim)"
          strokeWidth="1.1"
        />
        {/* Ducktail lip */}
        <path d="M24 31.5 Q80 23.5 136 31.5" fill="none" stroke="var(--car-rim)" strokeWidth="1.6" strokeLinecap="round" />
        {/* Taillights */}
        <path d="M15 37 L45 34.5 L43 40.5 L18 42.5 Z" fill="var(--footer-accent)" className={styles.taillight} />
        <path d="M145 37 L115 34.5 L117 40.5 L142 42.5 Z" fill="var(--footer-accent)" className={styles.taillight} />
        <circle cx="30" cy="38.5" r="1.6" fill="#ffd2cc" opacity="0.9" />
        <circle cx="130" cy="38.5" r="1.6" fill="#ffd2cc" opacity="0.9" />
        {/* Plate */}
        <rect x="66" y="38" width="28" height="8" rx="1.5" fill="var(--footer-bg)" stroke="var(--car-rim)" strokeWidth="0.8" />
        {/* Diffuser and quad exhaust */}
        <path d="M44 52 H116 L110 58 H50 Z" fill="#070707" />
        <path d="M58 52.5 V57.5 M70 52.5 V57.5 M90 52.5 V57.5 M102 52.5 V57.5" stroke="var(--car-rim)" strokeWidth="0.7" opacity="0.6" />
        <circle cx="73" cy="60" r="2.4" fill="#0a0a0a" stroke="var(--car-rim)" strokeWidth="0.9" />
        <circle cx="80" cy="60" r="2.4" fill="#0a0a0a" stroke="var(--car-rim)" strokeWidth="0.9" />
        <circle cx="87" cy="60" r="2.4" fill="#0a0a0a" stroke="var(--car-rim)" strokeWidth="0.9" />
        <circle cx="94" cy="60" r="2.4" fill="#0a0a0a" stroke="var(--car-rim)" strokeWidth="0.9" />
      </svg>
    </div>
  );
}

export default FooterScene;
