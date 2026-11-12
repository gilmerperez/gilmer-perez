"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./ReportTranslator.module.css";
import SectionHeading from "../SectionHeading/SectionHeading";

// * Sample report data. Illustrative numbers, not a real client.
const MONTHS = ["JUN", "JUL", "AUG", "SEP", "OCT", "NOV"];
const SESSIONS = [2890, 3120, 3050, 3340, 3570, 4210];
const PEAK = Math.max(...SESSIONS);

const METRICS = [
  { k: "Sessions", v: "4,210 (+18% MoM)" },
  { k: "GSC Clicks", v: "1,930" },
  { k: "Average CTR", v: "4.6%" },
  { k: "Average Position", v: "8.4" },
  { k: "Ad Spend", v: "$1,500" },
  { k: "Average CPC", v: "$1.92" },
  { k: "Conversions", v: "63" },
  { k: "Cost per Conversion", v: "$23.81" },
];

const OWNER_STATS = [
  { prefix: "", num: 63, suffix: "", text: "people called you or filled out your form." },
  { prefix: "$", num: 24, suffix: "", text: "is what each of those leads cost in ads." },
  { prefix: "+", num: 18, suffix: "%", text: "more visits to your website than last month." },
];

const VIEWS = [
  { id: "analyst", label: "What I See" },
  { id: "owner", label: "What You Get" },
];

const SWAP_MS = 900; // matches the scan animation in the CSS

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Counts up from zero when animate is true, otherwise shows the number as is
function CountUp({ prefix, num, suffix, animate }) {
  const [value, setValue] = useState(animate ? 0 : num);

  useEffect(() => {
    if (!animate || prefersReducedMotion()) {
      const frame = requestAnimationFrame(() => setValue(num));
      return () => cancelAnimationFrame(frame);
    }
    let frame = 0;
    let start = 0;
    const tick = (now) => {
      if (!start) start = now;
      const t = Math.min((now - start) / 1100, 1);
      setValue(Math.round(num * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animate, num]);

  return (
    <span className={styles.ownerNum}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

// Analyst view: six-bar chart plus the metric list
function AnalystView({ animate }) {
  return (
    <div className={animate ? `${styles.analyst} ${styles.enter}` : styles.analyst}>
      <div className={styles.chart}>
        <span className={styles.chartLabel}>GA4 SESSIONS, LAST 6 MONTHS</span>
        <div className={styles.bars}>
          {SESSIONS.map((value, i) => (
            <div
              key={MONTHS[i]}
              className={i === SESSIONS.length - 1 ? `${styles.bar} ${styles.barLatest}` : styles.bar}
              style={{ height: `${Math.round((value / PEAK) * 100)}%`, "--i": i }}
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
        {METRICS.map((metric, i) => (
          <div key={metric.k} className={styles.metric} style={{ "--i": i }}>
            <span className={styles.metricKey}>{metric.k}</span>
            <span className={styles.metricValue}>{metric.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Owner view: three big numbers and the plain English summary
function OwnerView({ animate }) {
  return (
    <div className={animate ? `${styles.owner} ${styles.enter}` : styles.owner}>
      <div className={styles.ownerGrid}>
        {OWNER_STATS.map((stat, i) => (
          <div key={stat.text} className={styles.ownerCard} style={{ "--i": i }}>
            <CountUp prefix={stat.prefix} num={stat.num} suffix={stat.suffix} animate={animate} />
            <span className={styles.ownerText}>{stat.text}</span>
          </div>
        ))}
      </div>
      <h3 className={styles.nextTitle}>What I Would Say</h3>
      <div className={styles.nextMonth}>
        <p>
          Your website had <strong>4,210 Sessions</strong> this month, 18% more than last month, and Google search sent
          1,930 of those visits. Your pages show up at an <strong>Average Position of 8.4</strong>, near the bottom of
          the first page, with an <strong>Average Click-Through Rate of 4.6%</strong>. Most clicks go to the top five
          results, so this month I am rewriting the titles and descriptions on your most visited pages and building out
          the content behind them to move them up and earn more of those clicks.
        </p>
        <p>
          On the ads side, <strong>$1,500 in Ad Spend</strong> at an <strong>Average Cost per Click of $1.92</strong>{" "}
          turned into <strong>63 Conversions</strong>, people who called you or filled out your form, at a{" "}
          <strong>Cost per Conversion of $23.81</strong>. Two keywords brought in almost all of those leads. A third
          one used about a fifth of the budget and did not bring in a single call. Next month I am moving that money into
          the two that work, adding the exact phrases people searched right before they called you, and pausing ads
          during the hours when clicks never turn into leads, so the same budget brings in more leads at a lower cost.
        </p>
      </div>
    </div>
  );
}

function renderView(view, animate) {
  return view === "owner" ? <OwnerView animate={animate} /> : <AnalystView animate={animate} />;
}

function ReportTranslator() {
  const [view, setView] = useState("analyst");
  // The view being wiped away while the scan line crosses the panel
  const [leaving, setLeaving] = useState(null);
  const [swaps, setSwaps] = useState(0);
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const showView = (next) => {
    if (next === view) return;
    clearTimeout(timer.current);
    setSwaps((n) => n + 1);
    setView(next);
    if (prefersReducedMotion()) {
      setLeaving(null);
      return;
    }
    setLeaving(view);
    timer.current = setTimeout(() => setLeaving(null), SWAP_MS);
  };

  // To the owner view the scan runs left to right, back to the analyst view right to left
  const direction = view === "owner" ? styles.forward : styles.backward;

  return (
    <section id="reporting" className={styles.section} aria-labelledby="reporting-title">
      <SectionHeading eyebrow="04 / REPORTING" title="Same Data, Two Languages" titleId="reporting-title">
        I read the first one so you only ever have to read the second. Flip the switch.
      </SectionHeading>

      {/* Two-way switch. A dotted blue thumb slides behind the active side. */}
      <div role="group" aria-label="Report view" className={view === "owner" ? `${styles.toggle} ${styles.toggleOwner}` : styles.toggle}>
        <span aria-hidden="true" className={styles.thumb}></span>
        {VIEWS.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={view === option.id}
            onClick={() => showView(option.id)}
            className={view === option.id ? `${styles.option} ${styles.optionActive}` : styles.option}
          >
            {option.id === "analyst" ? (
              <svg aria-hidden="true" className={styles.optionIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M2.5 13.5h11M4.5 11V8M8 11V4.5M11.5 11V6.5" />
              </svg>
            ) : (
              <svg aria-hidden="true" className={styles.optionIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
                <path d="M2.5 3.5h11v7h-6l-3 2.5v-2.5h-2z" />
              </svg>
            )}
            {option.label}
          </button>
        ))}
      </div>

      {/* Report panel. On a switch, the old view stays on top while a scan line
          crosses the panel and wipes it into the new one. */}
      <div className={`${styles.panel} ${direction}`}>
        {leaving && (
          <div key={`out-${swaps}`} aria-hidden="true" className={`${styles.layer} ${styles.layerOut}`}>
            {renderView(leaving, false)}
          </div>
        )}
        <div key={`in-${swaps}`} className={leaving ? `${styles.layer} ${styles.layerIn}` : styles.layer}>
          {renderView(view, swaps > 0)}
        </div>
        {leaving && (
          <span key={`scan-${swaps}`} aria-hidden="true" className={styles.scan}>
            <span className={styles.scanLine}></span>
          </span>
        )}
      </div>
    </section>
  );
}

export default ReportTranslator;
