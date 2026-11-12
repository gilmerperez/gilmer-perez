import styles from "./Contact.module.css";
import { EMAIL, PHONE_HREF } from "../../data/contact";

function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      {/* Backdrop, edge to edge, kept clear of the words.
          Dark theme: twinkling stardust plus planets, galaxies, a comet, and constellations
          (two frames each that fade into one another, so everything shimmers).
          Light theme: the sky above the footer, with drifting clouds, wind, and birds, and a
          bank of cloud along the bottom that thickens into the footer's blue. */}
      <div aria-hidden="true" className={styles.night}>
        <div className={`${styles.layer} ${styles.starsA}`}></div>
        <div className={`${styles.layer} ${styles.starsB}`}></div>
        <div className={`${styles.layer} ${styles.space}`}>
          <div className={styles.spaceA}></div>
          <div className={styles.spaceB}></div>
        </div>
      </div>
      <div aria-hidden="true" className={styles.day}>
        <div className={`${styles.layer} ${styles.clouds}`}></div>
        <div className={`${styles.layer} ${styles.wind}`}></div>
        <div className={`${styles.layer} ${styles.bank}`}></div>
      </div>

      {/* Always three lines: each span is a block that never wraps */}
      <h2 className={styles.title}>
        <span className={styles.lineLarge}>One Partner</span>
        <span className={styles.lineSmall}>for the Whole</span>
        <span className={styles.lineLarge}>Digital Side</span>
      </h2>
      <p className={styles.text}>
        Whether you need a website, more people finding it, ads that pay for themselves, or just someone to explain
        what the numbers mean, tell me the goal and I will take it from there.
      </p>
      <div className={styles.buttons}>
        <a href={`mailto:${EMAIL}`} className="btn btn-primary">
          Email Me
        </a>
        <a href={PHONE_HREF} className="btn btn-secondary">
          Call Me
        </a>
      </div>
    </section>
  );
}

export default Contact;
