import styles from "./Proof.module.css";
import lighthouse from "../../data/lighthouse.json";
import { personSchema } from "../../data/schema";
import SectionHeading from "../SectionHeading/SectionHeading";

const GAUGES = [
  { key: "performance", label: "Performance" },
  { key: "accessibility", label: "Accessibility" },
  { key: "bestPractices", label: "Best Practices" },
  { key: "seo", label: "SEO" },
];

// * Lighthouse color bands, so the ring stays honest if a score ever drops
function scoreBand(score) {
  if (typeof score !== "number") return styles.gaugeUnknown;
  if (score >= 90) return styles.gaugePass;
  if (score >= 50) return styles.gaugeAverage;
  return styles.gaugeFail;
}

function Proof() {
  // The code panel prints the exact object injected as JSON-LD on this page
  const schemaCode = JSON.stringify(personSchema, null, 2);

  return (
    <section id="proof" className={styles.section} aria-labelledby="proof-title">
      <SectionHeading eyebrow="07 / PROOF" title="This site does what I sell" titleId="proof-title">
        The page you are reading is built the way I build for clients. These are its real Lighthouse scores and the
        structured data it sends to search engines.
      </SectionHeading>

      {/* Lighthouse scores (built with HTML and CSS, not SVG text) */}
      <div className={styles.scores}>
        <div className={styles.gauges}>
          {GAUGES.map((gauge) => {
            const score = lighthouse.scores[gauge.key];
            const known = typeof score === "number";
            return (
              <div key={gauge.key} className={styles.gauge}>
                <div
                  role="img"
                  aria-label={known ? `${gauge.label} score: ${score} out of 100` : `${gauge.label} score not measured yet`}
                  className={`${styles.ring} ${scoreBand(score)}`}
                >
                  {known ? score : "--"}
                </div>
                <span className={styles.gaugeLabel}>{gauge.label}</span>
              </div>
            );
          })}
        </div>
        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span aria-hidden="true" className={`${styles.legendSwatch} ${styles.swatchFail}`}></span>0–49
          </span>
          <span className={styles.legendItem}>
            <span aria-hidden="true" className={`${styles.legendSwatch} ${styles.swatchAverage}`}></span>50–89
          </span>
          <span className={styles.legendItem}>
            <span aria-hidden="true" className={`${styles.legendSwatch} ${styles.swatchPass}`}></span>90–100
          </span>
        </div>
      </div>

      {/* Schema explainer */}
      <div className={styles.schema}>
        <div className={styles.explainer}>
          <h3 className={styles.explainerTitle}>What search engines read</h3>
          <p className={styles.explainerText}>
            This is <strong>structured data</strong>, also called schema markup. Visitors never see it. Search engines
            and AI assistants read it to understand who a page is about and what they do. It is how a business gets its
            star ratings, hours, and prices to show up right in the search results.
          </p>
          <div className={styles.keys}>
            <span>
              <span className={styles.key}>&quot;@type&quot;: &quot;Person&quot;</span> tells them this page is about a
              person.
            </span>
            <span>
              <span className={styles.key}>&quot;jobTitle&quot;</span> tells them what I do.
            </span>
            <span>
              <span className={styles.key}>&quot;knowsAbout&quot;</span> tells them which topics to connect me with.
            </span>
          </div>
          <p className={styles.note}>
            The code shown here is the actual schema running on this page. I set this up for every site I work on.
          </p>
        </div>

        <div className={styles.codePanel}>
          <div className={styles.codeHeader}>application/ld+json</div>
          <pre className={styles.code} tabIndex={0} aria-label="Person schema for this page">
            {schemaCode}
          </pre>
        </div>
      </div>
    </section>
  );
}

export default Proof;
