"use client";

import styles from "./page.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

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
    <>
      <Header />
      <main>
        <div className={styles.contactContainer}>
          {/* Contact me */}
          <section className={styles.contactSection}>
            {/* Title */}
            <h1 className={styles.contactTitle}>CONTACT ME</h1>
            {/* Description */}
            <p className={styles.contactDescription}>
              Whether you are starting a project, have business inquiries or just want to say hi, I'm always open so
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
      <Footer />
    </>
  );
}
