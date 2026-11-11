import styles from "./Contact.module.css";
import { EMAIL, PHONE_HREF } from "../../data/contact";

function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      {/* Two frames of dithered stardust that fade into each other, so the stars twinkle.
          The art has a clearing in the middle and sits behind the text. */}
      <div aria-hidden="true" className={`${styles.stars} ${styles.starsA}`}></div>
      <div aria-hidden="true" className={`${styles.stars} ${styles.starsB}`}></div>

      {/* Always three lines: each span is a block that never wraps */}
      <h2 className={styles.title}>
        <span className={styles.lineLarge}>One Partner</span>
        <span className={styles.lineSmall}>for the whole</span>
        <span className={styles.lineLarge}>Digital Side</span>
      </h2>
      <p className={styles.text}>
        Whether you need a website, more people finding it, ads that pay for themselves, or just someone to explain
        what the numbers mean, tell me the goal and I will take it from there.
      </p>
      <div className={styles.buttons}>
        <a href={`mailto:${EMAIL}`} className={styles.primaryButton}>
          Email Me
        </a>
        <a href={PHONE_HREF} className={styles.secondaryButton}>
          Call Me
        </a>
      </div>
    </section>
  );
}

export default Contact;
