"use client";
import styles from "./page.module.css";

export default function Contact() {
  // * Email handler
  const handleEmailClick = () => {
    window.location.href = "mailto:gilmer2002@outlook.com";
  };

  // * Phone handler
  const handlePhoneClick = () => {
    window.location.href = "tel:4073501805";
  };

  return (
    <main>
      <div className={styles.contactContainer}>
        {/* Contact me */}
        <section className={styles.contactSection}>
          {/* Title */}
          <h1 className={styles.contactTitle}>CONTACT ME</h1>
          {/* Description */}
          <p className={styles.contactDescription}>
            Whether you are starting a project, have business inquiries or just want to say hi, I&apos;m always open so
            feel free to reach out and I will get back to you as soon as possible.
          </p>
          {/* CTA buttons */}
          <div className={styles.buttonContainer}>
            {/* Email button */}
            <button onClick={handleEmailClick} className={styles.contactButton} aria-label="Email me">
              EMAIL ME
            </button>
            {/* Call button */}
            <button onClick={handlePhoneClick} className={styles.contactButton} aria-label="Call me">
              CALL ME
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
