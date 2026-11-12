"use client";
import { useState } from "react";
import styles from "./Process.module.css";
import stages from "../../data/process.json";
import SectionHeading from "../SectionHeading/SectionHeading";

// * Six stage buttons. One is active at a time and the panel below shows its details.
function Process() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = stages[activeIndex];

  return (
    <section id="how" className={styles.section} aria-labelledby="process-title">
      <SectionHeading eyebrow="01 / THE PROCESS" title="One goal, carried all the way through" titleId="process-title">
        Most businesses hire a developer, an SEO, an ads manager, and someone to explain the reports. I do all of it, so
        nothing gets lost between them. Pick a stage.
      </SectionHeading>

      {/* Stage buttons */}
      <div className={styles.stages}>
        {stages.map((stage, i) => (
          <button
            key={stage.label}
            type="button"
            aria-pressed={i === activeIndex}
            onClick={() => setActiveIndex(i)}
            className={i === activeIndex ? `${styles.stage} ${styles.stageActive}` : styles.stage}
          >
            <span className={styles.stageNum}>{stage.num}</span>
            <span className={styles.stageLabel}>{stage.label}</span>
          </button>
        ))}
      </div>

      {/* Active stage panel */}
      <div className={styles.panel}>
        <div className={styles.panelMain}>
          <h3 className={styles.panelTitle}>{active.title}</h3>
          <p className={styles.panelBody}>{active.body}</p>
          <h4 className={styles.outcomeTitle}>What You Get</h4>
          <p className={styles.panelBody}>{active.outcome}</p>
          {active.stat && (
            <div className={styles.stat}>
              <span className={styles.statNum}>{active.stat.num}</span>
              <span className={styles.statLabel}>{active.stat.label}</span>
            </div>
          )}
        </div>

        <div className={styles.panelTools}>
          <span className={styles.toolsLabel}>TOOLS AND SKILLS</span>
          <div className={styles.chips}>
            {active.tools.map((tool) => (
              <span key={tool} className={styles.chip}>
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Process;
