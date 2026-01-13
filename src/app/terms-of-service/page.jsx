import styles from "./page.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export const metadata = {
  title: "Gilmer Perez | Terms of Service",
  description:
    "By accessing this website, you agree to comply with the following terms and conditions. It is important to thoroughly read and understand these terms as they govern your use of our services and website.",
};

export default function TermsOfService() {
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

  // * Get current year and month
  const now = new Date();
  const year = now.getFullYear();
  const month = monthNames[now.getMonth()];

  return (
    <>
      <Header />
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
            {/* Site usage */}
            <p className={styles.termsHeading}>SITE USAGE</p>
            <p className={styles.termsText}>
              This website serves as my personal portfolio to showcase my web development projects, skills, and
              professional experience. All content is subject to change without notice. You may view and browse the
              content for personal and professional purposes, but unauthorized reproduction or distribution of my work
              is prohibited.
            </p>
            {/* No liability */}
            <p className={styles.termsHeading}>NO LIABILITY</p>
            <p className={styles.termsText}>
              I am not responsible for any loss or damage that may occur from using this website. All information is
              provided "as is" without any warranties of any kind. While I strive to keep my portfolio accurate and
              up-to-date, I cannot guarantee the completeness or accuracy of all information presented.
            </p>
            {/* Modifications */}
            <p className={styles.termsHeading}>MODIFICATIONS</p>
            <p className={styles.termsText}>
              I may revise these terms at any time. By using this website, you agree to be bound by the current version
              of these terms. Last updated: {month} {year}.
            </p>
            {/* Third-party content */}
            <p className={styles.termsHeading}>THIRD-PARTY CONTENT</p>
            <p className={styles.termsText}>
              This portfolio may contain links to external websites, project repositories, or third-party services. I am
              not responsible for the content, privacy practices, or availability of these external sites. Use of
              third-party services is at your own risk and subject to their respective terms.
            </p>
            {/* Contact and inquiries */}
            <p className={styles.termsHeading}>CONTACT AND INQUIRIES</p>
            <p className={styles.termsText}>
              If you have any questions about these terms or would like to discuss potential collaboration
              opportunities, please contact me through the information provided on this website. I welcome professional
              inquiries and networking opportunities.
            </p>
            {/* Intellectual property */}
            <p className={styles.termsHeading}>INTELLECTUAL PROPERTY</p>
            <p className={styles.termsText}>
              All content on this website, including but not limited to text, graphics, logos, images, and software, is
              the property of Gilmer Perez and is protected by copyright laws. You may not reproduce, distribute, or use
              any content without explicit written permission. Project screenshots and descriptions are provided for
              portfolio demonstration purposes only.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
