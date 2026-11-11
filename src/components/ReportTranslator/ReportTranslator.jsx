"use client";
import { useState } from "react";
import styles from "./ReportTranslator.module.css";
import SectionHeading from "../SectionHeading/SectionHeading";

// * Sample report data. Illustrative numbers, not a real client.
const MONTHS = ["JUN", "JUL", "AUG", "SEP", "OCT", "NOV"];
const SESSIONS = [2890, 3120, 3050, 3340, 3570, 4210];
const PEAK = Math.max(...SESSIONS);

const METRICS = [
  { k: "Sessions", v: "4,210 (+18% MoM)" },
  { k: "GSC clicks", v: "1,930" },
  { k: "Avg CTR", v: "4.6%" },
  { k: "Avg position", v: "8.4" },
  { k: "Ad spend", v: "$1,500" },
  { k: "Avg CPC", v: "$1.92" },
  { k: "Conversions", v: "63" },
  { k: "Cost / conv.", v: "$23.81" },
];

const OWNER_STATS = [
  { num: "63", text: "people called you or filled out your form." },
  { num: "$24", text: "is what each of those leads cost in ads." },
  { num: "+18%", text: "more visits to your website than last month." },
];

// Analyst view: six-bar chart plus the metric list
function AnalystView() {
  return (
    <div className={styles.analyst}>
      <div className={styles.chart}>
        <span className={styles.chartLabel}>GA4 SESSIONS, LAST 6 MONTHS</span>
        <div className={styles.bars}>
          {SESSIONS.map((value, i) => (
            <div
              key={MONTHS[i]}
              className={i === SESSIONS.length - 1 ? `${styles.bar} ${styles.barLatest}` : styles.bar}
              style={{ height: `${Math.round((value / PEAK) * 100)}%` }}
            ></div>
          ))}
        </div>
        <div className={styles.months}>
          {MONTHS.map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>
      <div className={styles.metrics}>
        {METRICS.map((metric) => (
          <div key={metric.k} className={styles.metric}>
            <span className={styles.metricKey}>{metric.k}</span>
            <span className={styles.metricValue}>{metric.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Owner view: three big numbers in plain English
function OwnerView() {
  return (
    <>
      <div className={styles.ownerGrid}>
        {OWNER_STATS.map((stat) => (
          <div key={stat.num} className={styles.ownerCard}>
            <span className={styles.ownerNum}>{stat.num}</span>
            <span className={styles.ownerText}>{stat.text}</span>
          </div>
        ))}
      </div>
      <div className={styles.nextMonth}>
        <span aria-hidden="true" className={styles.nextDot}></span>
        <span>Next month I am moving budget out of the keyword that is not bringing in leads and into the two that are.</span>
      </div>
    </>
  );
}

function ReportTranslator() {
  const [ownerView, setOwnerView] = useState(false);

  return (
    <section id="reporting" className={styles.section} aria-labelledby="reporting-title">
      <SectionHeading eyebrow="04 / REPORTING" title="Same data, two languages" titleId="reporting-title">
        I read the first one so you only ever have to read the second. Flip the switch.
      </SectionHeading>

      {/* Switch */}
      <div className={styles.switchRow}>
        <span className={ownerView ? styles.switchLabel : `${styles.switchLabel} ${styles.switchLabelActive}`}>What I see</span>
        <button
          type="button"
          role="switch"
          aria-checked={ownerView}
          aria-label="Show the plain English version of the report"
          onClick={() => setOwnerView((on) => !on)}
          className={styles.switch}
        >
          <span className={ownerView ? `${styles.knob} ${styles.knobOn}` : styles.knob}></span>
        </button>
        <span className={ownerView ? `${styles.switchLabel} ${styles.switchLabelActive}` : styles.switchLabel}>What you get</span>
      </div>

      {/* Report panel */}
      <div className={styles.panel}>
        <span className={styles.caption}>SAMPLE MONTHLY REPORT. ILLUSTRATIVE NUMBERS, NOT A REAL CLIENT.</span>
        {ownerView ? <OwnerView /> : <AnalystView />}
      </div>
    </section>
  );
}

export default ReportTranslator;
