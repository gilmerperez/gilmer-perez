import styles from "./Experience.module.css";
import PhotoFrame from "./PhotoFrame";
import SectionHeading from "../SectionHeading/SectionHeading";

// * Formal, third-person copy that names no employers
const ENTRIES = [
  {
    when: "NOV 2026 TO PRESENT",
    role: "Digital Marketing Specialist",
    text: "Responsible for the organization's digital marketing program. Manages paid media across Search, Display, YouTube, and Meta, directs search engine optimization and editorial content, reports performance against defined KPIs using GA4 and Google Search Console, and oversees the website in coordination with outside agencies.",
  },
  {
    when: "FEB 2026 TO OCT 2026",
    role: "Assistant Team Leader, SEO & PPC",
    text: "Directed organic growth and paid acquisition for a diverse portfolio of client websites at a digital marketing agency. Audited and resolved technical SEO issues across WordPress, Squarespace, and Wix, planned and optimized campaigns on Google Ads, Meta Ads, Walmart Ads, and Spotify Ads, and led client communication. Promoted to Assistant Team Leader, with responsibility for mentoring specialists and serving as a point of escalation.",
  },
  {
    when: "JUN 2023 TO PRESENT",
    role: "Web Developer & Digital Strategist",
    text: "Founded an independent consultancy providing small businesses with a single partner for website development, search visibility, analytics, and technical infrastructure. Designs, builds, and deploys custom websites using Next.js, React, and TypeScript, and manages domains, hosting, and ongoing maintenance.",
  },
  {
    when: "EDUCATION",
    role: "Full-Stack Web Development Certificate",
    text: "University of Central Florida. Project-based curriculum covering front-end and back-end development, version control, and deployment.",
  },
];

function Experience() {
  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-title">
      <SectionHeading eyebrow="06 / EXPERIENCE" title="Professional Experience" titleId="experience-title" />

      <div className={styles.columns}>
        {/* Timeline (no box-shadow on this container, on purpose) */}
        <div className={styles.timeline}>
          {ENTRIES.map((entry, i) => (
            <div key={entry.role} className={styles.entry}>
              {/* Only the most recent dot pulses */}
              <span aria-hidden="true" className={i === 0 ? `${styles.dot} ${styles.dotPulse}` : styles.dot}></span>
              <span className={styles.when}>{entry.when}</span>
              <h3 className={styles.role}>{entry.role}</h3>
              <p className={styles.text}>{entry.text}</p>
            </div>
          ))}
        </div>

        {/* Photo switcher */}
        <div className={styles.photoColumn}>
          <PhotoFrame />
        </div>
      </div>
    </section>
  );
}

export default Experience;
