import { useEffect } from "react";
import styles from "./Contact.module.css";

function Contact() {
  // * Set page title
  useEffect(() => {
    document.title = "Gilmer Perez | Contact";
  }, []);

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
      <main>
        <div className={styles.contactContainer}>
          {/* Contact section */}
          <section className={styles.contactSection}>
            {/* Heading */}
            <h1 className={styles.contactHeading}>CONTACT ME</h1>
            {/* Description` */}
            <p className={styles.contactDescription}>
              Whether you are starting a project, have business inquiries or just want to say hi, I'm always open so
              feel free to reach out and I will get back to you as soon as possible.
            </p>
            {/* CTA buttons */}
            <div className={styles.buttonContainer}>
              <button onClick={handleEmailClick} className={styles.contactButton} aria-label="Email me">
                EMAIL ME
              </button>
              <button onClick={handlePhoneClick} className={styles.contactButton} aria-label="Call me">
                CALL ME
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Contact;
