import Link from "next/link";
import styles from "./page.module.css";
import StructuredData from "../components/StructuredData/StructuredData";

const BASE_URL = "https://gilmer-perez.vercel.app";

export const metadata = {
  title: "Gilmer Perez | Home",
  description:
    "A Front-End Developer specialized in building high-performance, SEO-optimized applications using Next.js. I blend creative UI/UX design with a strong full-stack foundation to create digital products that are not only visually stunning but also discoverable, fast, and built for business growth.",
  alternates: {
    canonical: BASE_URL,
  },
};

export default function Home() {
  // JSON-LD Structured Data for Home Page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Gilmer Perez",
    jobTitle: "Front-End Web Developer",
    description:
      "A passionate Front-End Web Developer and UI/UX enthusiast with Full-Stack knowledge, specialized in building stunning pixel-perfect interactive websites and applications.",
    url: BASE_URL,
    image: `${BASE_URL}/images/gilmer-perez-1.jpg`,
    sameAs: [
      // Add social media profiles if available
      // "https://github.com/yourusername",
      // "https://linkedin.com/in/yourusername",
    ],
    knowsAbout: [
      "Front-End Development",
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "UI/UX Design",
      "Node.js",
      "Web Development",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "University of Central Florida",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Orlando",
      addressRegion: "FL",
      addressCountry: "US",
    },
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Gilmer Perez Portfolio",
    url: BASE_URL,
    description:
      "Portfolio website of Gilmer Perez, a Front-End Web Developer specializing in React, Next.js, and modern web development.",
    author: {
      "@type": "Person",
      name: "Gilmer Perez",
    },
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <StructuredData data={websiteStructuredData} />
      <main>
        <div className={styles.homeContainer}>
          {/* Hero section */}
          <section className={styles.heroSection}>
            {/* Greeting */}
            <span className={styles.greeting}>
              Hi, I&apos;m <strong>Gilmer</strong>
            </span>
            {/* Title */}
            <h1 className={styles.homeTitle}>
              FRONT-END
              <br />
              WEB DEVELOPER.
            </h1>
            {/* Description */}
            <p className={styles.homeDescription}>
              A <strong>FRONT-END DEVELOPER</strong> specialized in building{" "}
              <strong>HIGH-PERFORMANCE, SEO-OPTIMIZED</strong> applications using <strong>NEXT.JS</strong>. I blend
              creative <strong>UI/UX DESIGN</strong> with a strong <strong>FULL-STACK FOUNDATION</strong> to create
              digital products that are not only visually stunning but also discoverable, fast, and built for{" "}
              <strong>BUSINESS GROWTH</strong>.
            </p>
            {/* CTA buttons */}
            <div className={styles.buttonContainer}>
              <Link href="/about" className={styles.ctaButton}>
                LEARN MORE
              </Link>
              <Link href="/projects" className={styles.ctaButton}>
                VIEW PROJECTS
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
