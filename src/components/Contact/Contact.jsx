import styles from "./Contact.module.css";
import { EMAIL, PHONE_HREF } from "../../data/contact";

function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      {/* Always three lines in title case: each span is a block that never wraps */}
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
        <a href={`mailto:${EMAIL}`} className={styles.primaryButton}>
          Email me
        </a>
        <a href={PHONE_HREF} className={styles.secondaryButton}>
          Call me
        </a>
      </div>
    </section>
  );
}

export default Contact;
