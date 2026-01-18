"use client";
import styles from "./page.module.css";
import StructuredData from "../../components/StructuredData/StructuredData";

const BASE_URL = "https://gilmer-perez.vercel.app";

export default function Contact() {
  // * Email handler
  const handleEmailClick = () => {
    window.location.href = "mailto:gilmer2002@outlook.com";
  };

  // * Phone handler
  const handlePhoneClick = () => {
    window.location.href = "tel:4073501805";
  };

  // JSON-LD Structured Data for Contact Page
  const contactStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Gilmer Perez",
    description:
      "Get in touch with Gilmer Perez for web development projects, business inquiries, or collaboration opportunities.",
    url: `${BASE_URL}/contact`,
    mainEntity: {
      "@type": "Person",
      name: "Gilmer Perez",
      email: "gilmer2002@outlook.com",
      telephone: "+1-407-350-1805",
      jobTitle: "Front-End Web Developer",
    },
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: `${BASE_URL}/contact`,
      },
    ],
  };

  return (
    <>
      <StructuredData data={contactStructuredData} />
      <StructuredData data={breadcrumbStructuredData} />
      <main>
        <div className={styles.contactContainer}>
          {/* Contact me */}
          <section className={styles.contactSection}>
            {/* Title */}
            <h1 className={styles.contactTitle}>CONTACT ME</h1>
            {/* Description */}
            <p className={styles.contactDescription}>
              Whether you are starting a project, have business inquiries or just want to say hi, I&apos;m always open
              so feel free to reach out and I will get back to you as soon as possible.
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
    </>
  );
}
