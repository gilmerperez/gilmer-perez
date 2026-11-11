import styles from "./Divider.module.css";

// * A dithered band between sections. Each `variant` (1 to 7) is a different
// dot pattern, so the page never repeats the same divider twice in a row.
function Divider({ variant = 1 }) {
  return <div aria-hidden="true" className={`${styles.divider} ${styles[`v${variant}`]}`}></div>;
}

export default Divider;
