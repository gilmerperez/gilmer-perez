import Link from "next/link";
import styles from "./page.module.css";
import FullPath from "../components/FullPath/FullPath";
import CoreSkills from "../components/CoreSkills/CoreSkills";
import StructuredData from "../components/StructuredData/StructuredData";
import FeaturedProjects from "../components/FeaturedProjects/FeaturedProjects";

const BASE_URL = "https://gilmer-perez.vercel.app";

export const metadata = {
  // * Literal, not templated: the root title template only applies to child segments, not the root page itself
  title: "Home | Gilmer Perez",
  description:
    "Digital Growth Specialist covering the full path from website to customer: web development, SEO, paid media, and analytics. Based in Central Florida.",
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
              DIGITAL GROWTH
              <br />
              SPECIALIST.
            </h1>
            {/* Description */}
            <p className={styles.homeDescription}>
              I cover the <strong>FULL PATH FROM WEBSITE TO CUSTOMER</strong>. I <strong>BUILD AND HOST</strong> the
              site, make it <strong>RANK IN SEARCH</strong>, <strong>TRACK</strong> what it does, and run{" "}
              <strong>PAID ADS</strong> that send it qualified traffic. Because I also write the code, I fix technical
              problems directly and turn the data into clear recommendations business owners can act on.
            </p>
            {/* CTA buttons */}
            <div className={styles.buttonContainer}>
              <Link href="/projects" className={styles.ctaButton}>
                VIEW MY WORK
              </Link>
              <Link href="/about" className={styles.ctaButton}>
                ABOUT ME
              </Link>
            </div>
          </section>

          {/* Full path section */}
          <section className={styles.contentSection} aria-labelledby="full-path-heading">
            <h2 id="full-path-heading" className={styles.sectionTitle}>
              THE FULL PATH
            </h2>
            <p className={styles.sectionIntro}>
              One person carrying a goal from the website to the customer, so nothing gets lost between the people who
              build it, rank it, measure it, and promote it.
            </p>
            <FullPath />
          </section>

          {/* Featured work section */}
          <section className={styles.contentSection} aria-labelledby="featured-work-heading">
            <h2 id="featured-work-heading" className={styles.sectionTitle}>
              SELECTED WORK
            </h2>
            <p className={styles.sectionIntro}>
              Client websites built to be found, load fast on a phone, and turn visitors into customers, plus one
              personal project.
            </p>
            <FeaturedProjects />
            <Link href="/projects" className={styles.textLink}>
              SEE ALL PROJECTS <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </Link>
          </section>

          {/* Core skills section */}
          <section className={styles.contentSection} aria-labelledby="core-skills-heading">
            <h2 id="core-skills-heading" className={styles.sectionTitle}>
              CORE SKILLS
            </h2>
            <p className={styles.sectionIntro}>
              In my current role as a Digital Growth Specialist, I work with all of these.
            </p>
            <CoreSkills />
          </section>

          {/* Closing CTA section */}
          <section className={`${styles.contentSection} ${styles.ctaSection}`} aria-labelledby="cta-heading">
            <h2 id="cta-heading" className={styles.sectionTitle}>
              HAVE A GOAL IN MIND?
            </h2>
            <p className={styles.sectionIntro}>
              Tell me what you are trying to achieve and I will help carry it through the site, search, ads, and
              reporting.
            </p>
            <Link href="/contact" className={`${styles.ctaButton} ${styles.primaryCta}`}>
              LET&apos;S TALK
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
