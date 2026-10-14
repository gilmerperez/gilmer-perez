import Link from "next/link";
import styles from "./page.module.css";
import StructuredData from "../components/StructuredData/StructuredData";

const BASE_URL = "https://gilmer-perez.vercel.app";

export const metadata = {
  // * Absolute so the root title template doesn't append the site name twice
  title: { absolute: "Gilmer Perez | Digital Growth Specialist" },
  description:
    "Digital Growth Specialist covering the full path from website to customer: web development, SEO, paid media, and analytics. Based in Kissimmee, FL.",
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
    jobTitle: "Digital Growth Specialist",
    description:
      "Digital Growth Specialist who builds websites, ranks them in search, tracks what they do, and runs paid ads that send qualified traffic.",
    url: BASE_URL,
    image: `${BASE_URL}/images/gilmer-perez-1.jpg`,
    sameAs: ["https://github.com/gilmerperez", "https://www.linkedin.com/in/gilmer-perez-a35ba0354/"],
    knowsAbout: [
      "Digital Marketing",
      "Technical SEO",
      "Local SEO",
      "Answer Engine Optimization",
      "Generative Engine Optimization",
      "Schema Markup",
      "Core Web Vitals",
      "Paid Media",
      "Google Ads",
      "Google Analytics 4",
      "Google Tag Manager",
      "Google Search Console",
      "Web Development",
      "Next.js",
      "React",
      "TypeScript",
    ],
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "University of Central Florida",
      },
      {
        "@type": "EducationalOrganization",
        name: "Valencia College",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kissimmee",
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
      "Portfolio website of Gilmer Perez, a Digital Growth Specialist covering web development, SEO, paid media, and analytics.",
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
