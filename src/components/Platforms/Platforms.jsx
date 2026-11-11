import styles from "./Platforms.module.css";
import SectionHeading from "../SectionHeading/SectionHeading";

const PLATFORMS = [
  {
    label: "MY FAVORITE",
    name: "Custom Code",
    text: "Next.js, React, and TypeScript. Built from scratch, fast, accessible, and ready to rank from day one.",
    featured: true,
  },
  {
    label: "CMS",
    name: "WordPress",
    text: "Themes, plugins, hosting, SMTP, and custom code when the plugin does not exist.",
  },
  {
    label: "BUILDER",
    name: "Squarespace",
    text: "Audits, SEO settings, code injection, and fixes for crawling and indexing issues.",
  },
  {
    label: "BUILDER",
    name: "Wix",
    text: "Technical SEO, Core Web Vitals work, and tracking set up inside the limits of the platform.",
  },
];

function Platforms() {
  return (
    <section className={styles.section} aria-labelledby="platforms-title">
      <SectionHeading eyebrow="02 / ANY PLATFORM" title="Whatever your site is built on" titleId="platforms-title">
        I have managed <strong>50+</strong> client websites, from fully custom code to the most popular website
        builders.
      </SectionHeading>

      <div className={styles.grid}>
        {PLATFORMS.map((platform) => (
          <div key={platform.name} className={platform.featured ? `${styles.card} ${styles.featured}` : styles.card}>
            <span className={styles.label}>{platform.label}</span>
            <h3 className={styles.name}>{platform.name}</h3>
            <p className={styles.text}>{platform.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Platforms;
