import { useEffect } from "react";
import styles from "./TermsOfService.module.css";

function TermsOfService() {
  // * Set page title
  useEffect(() => {
    document.title = "Gilmer Perez | Terms of Service";
  }, []);

  // Month names array
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // * Get current date
  const now = new Date();
  const year = now.getFullYear();
  const month = monthNames[now.getMonth()];

  return (
    <>
      <main>
        <div className={styles.termsOfServiceContainer}>
          {/* Introduction */}
          <section className={styles.termsOfServiceIntroduction}>
            {/* Title */}
            <h1 className={styles.termsOfServiceTitle}>TERMS OF SERVICE</h1>
            {/* Description */}
            <p className={styles.termsOfServiceDescription}>
              By accessing this website, you agree to comply with the following terms and conditions. It is important to
              thoroughly read and understand these terms as they govern your use of our services and website. If you do
              not agree with any part of these terms, please refrain from using our website.
            </p>
          </section>

          {/* Terms of service */}
          <section className={styles.terms}>
            {/* First term */}
            <p className={styles.termsHeading}>SITE USAGE</p>
            <p className={styles.termsText}>
              This website serves as an informational platform for Bubbalous Bodacious BBQ. All content is subject to
              change without notice. Unauthorized use of this site may give rise to a claim for damages.
            </p>
            {/* Second term */}
            <p className={styles.termsHeading}>NO LIABILITY</p>
            <p className={styles.termsText}>
              We are not responsible for any loss or damage that may occur from using this website. All information is
              provided "as is" without any warranties of any kind.
            </p>
            {/* Third term */}
            <p className={styles.termsHeading}>MODIFICATIONS</p>
            <p className={styles.termsText}>
              We may revise these terms at any time. By using this website, you agree to be bound by the current version
              of these terms. Last updated: {month} {year}.
            </p>
            {/* Fourth term */}
            <p className={styles.termsHeading}>MENU AND SERVICE DISCLAIMER</p>
            <p className={styles.termsText}>
              Our menu items and service offerings are subject to change without prior notice. While we strive to keep
              all information up-to-date, availability and offerings may vary. Please contact our team directly for the
              most current details.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}

export default TermsOfService;
