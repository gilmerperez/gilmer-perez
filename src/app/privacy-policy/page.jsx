import styles from "./page.module.css";

export const metadata = {
  title: "Gilmer Perez | Privacy Policy",
  description:
    "Your privacy matters. This privacy policy outlines how we manage your information when visiting our website.",
};

export default function PrivacyPolicy() {
  // * Month names array
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

  // * Get current year and month
  const now = new Date();
  const year = now.getFullYear();
  const month = monthNames[now.getMonth()];

  return (
    <>
      <main>
        <div className={styles.privacyPolicyContainer}>
          {/* Introduction */}
          <section className={styles.privacyPolicyIntroduction}>
            {/* Title */}
            <h1 className={styles.privacyPolicyTitle}>PRIVACY POLICY</h1>
            {/* Description */}
            <p className={styles.privacyPolicyDescription}>
              Your privacy matters. This privacy policy outlines how we manage your information when visiting our
              website. Please read this policy carefully to understand our practices regarding your data and how we
              strive to protect your privacy.
            </p>
          </section>

          {/* Privacy policy */}
          <section className={styles.policy}>
            {/* Policy Updates */}
            <p className={styles.policyHeading}>POLICY UPDATES</p>
            <p className={styles.policyText}>
              We may revise this policy occasionally. Updates will always appear on this page. Last updated: {month}{" "}
              {year}.
            </p>
            {/* Third-party links */}
            <p className={styles.policyHeading}>THIRD-PARTY LINKS</p>
            <p className={styles.policyText}>
              My portfolio may contain links to external websites, including project repositories, live demos, or
              professional profiles. These external sites have their own privacy policies, and I am not responsible for
              their content or privacy practices.
            </p>
            {/* Purpose of the site */}
            <p className={styles.policyHeading}>PURPOSE OF THE SITE</p>
            <p className={styles.policyText}>
              This website serves as my personal portfolio to showcase my web development projects, skills, and
              professional experience. It includes information about my background, featured projects, technologies I
              work with, and ways to contact me. No purchases or account logins are required to browse.
            </p>
            {/* Contact information */}
            <p className={styles.policyHeading}>CONTACT INFORMATION</p>
            <p className={styles.policyText}>
              If you have any questions about this privacy policy or my portfolio, please feel free to contact me
              through the contact information provided on this website. I am committed to transparency and will respond
              to any privacy-related inquiries.
            </p>
            {/* Personal information */}
            <p className={styles.policyHeading}>PERSONAL INFORMATION</p>
            <p className={styles.policyText}>
              I do not collect any personal data directly through this website. You can navigate my portfolio content
              without providing your name, email, or other personal details. If you choose to contact me through the
              provided contact methods, any information you share will be used solely for responding to your inquiry.
            </p>
            {/* Cookies and analytics */}
            <p className={styles.policyHeading}>COOKIES AND ANALYTICS</p>
            <p className={styles.policyText}>
              This website does not use cookies, tracking pixels, or third-party analytics tools. I do not track your
              browsing behavior or device usage. Your visit to my portfolio is completely private and anonymous.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
