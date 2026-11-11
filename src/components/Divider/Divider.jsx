import styles from "./Divider.module.css";

// * A dithered band between sections, each a different piece of a space scene:
// "wave" (a starry wave with small planets), "galaxy" (an edge-on galaxy),
// "asteroids" (an asteroid belt around a small planet), "stardust",
// "sound" (two waves crossing like sound waves), and "ripples".
function Divider({ variant }) {
  return <div aria-hidden="true" className={`${styles.divider} ${styles[variant]}`}></div>;
}

export default Divider;
