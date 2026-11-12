"use client";
import { useState } from "react";
import tabs from "../../data/search.json";
import styles from "./SearchSimulator.module.css";
import SectionHeading from "../SectionHeading/SectionHeading";

// * The generic results page has one layout per tab. "Your Business" is always the
// item ringed in blue. Bracketed placeholders like [your service] are intentional.

const STARS = "★★★★★";

// Small "Y" favicon used for Your Business
function BusinessIcon({ small = false }) {
  return <span className={small ? styles.favIconSmall : styles.favIcon}>Y</span>;
}

function OrganicResults() {
  return (
    <>
      <div className={`${styles.result} ${styles.highlight}`}>
        <div className={styles.siteRow}>
          <BusinessIcon />
          <span className={styles.siteMeta}>
            <span className={styles.siteName}>Your Business</span>
            <span className={styles.siteUrl}>https://yourbusiness.com › services</span>
          </span>
        </div>
        <span className={styles.resultTitle}>Your Business | [Service] in [Your City]</span>
        <span className={styles.meta}>
          <span className={styles.stars}>{STARS}</span> [your rating] · [your reviews] · [price range]
        </span>
        <span className={styles.snippet}>
          A clear description written for people, with the service and the city in it. Ratings, hours, and prices show
          up right here when the page has schema markup.
        </span>
        <div className={styles.sitelinks}>
          <span className={styles.sitelink}>
            <span className={styles.sitelinkTitle}>Services</span>
            <span className={styles.sitelinkText}>Everything you offer, on one page.</span>
          </span>
          <span className={styles.sitelink}>
            <span className={styles.sitelinkTitle}>Pricing</span>
            <span className={styles.sitelinkText}>Clear prices and packages.</span>
          </span>
          <span className={styles.sitelink}>
            <span className={styles.sitelinkTitle}>Reviews</span>
            <span className={styles.sitelinkText}>What your customers say.</span>
          </span>
          <span className={styles.sitelink}>
            <span className={styles.sitelinkTitle}>Contact</span>
            <span className={styles.sitelinkText}>Call, email, or book online.</span>
          </span>
        </div>
      </div>

      <div className={styles.questions}>
        <span className={styles.questionsTitle}>People Also Ask</span>
        <span className={styles.question}>
          <span>How much does [your service] cost?</span>
          <span aria-hidden="true">⌄</span>
        </span>
        <span className={`${styles.question} ${styles.questionLast}`}>
          <span>Who is the best [your service] in [your city]?</span>
          <span aria-hidden="true">⌄</span>
        </span>
      </div>

      <div className={`${styles.dimmed} ${styles.faded}`}>
        <span className={styles.siteUrl}>https://competitor.com</span>
        <span className={styles.resultTitlePlain}>A Competitor, Below You</span>
        <span className={styles.snippetPlain}>Their description goes here.</span>
      </div>
    </>
  );
}

function MapResults() {
  return (
    <>
      <span className={styles.placesTitle}>Places</span>
      <svg aria-hidden="true" focusable="false" viewBox="0 0 640 190" preserveAspectRatio="xMidYMid slice" className={styles.map}>
        <rect x="0" y="0" width="640" height="190" fill="#eef1f4" />
        <path d="M0 150 C120 120 200 175 330 140 S560 110 640 135 L640 190 L0 190 Z" fill="#c6e2f7" />
        <rect x="60" y="20" width="110" height="64" rx="8" fill="#cfe8d0" />
        <rect x="430" y="28" width="150" height="50" rx="8" fill="#cfe8d0" />
        <path d="M0 100 L640 62" stroke="#ffffff" strokeWidth="12" />
        <path d="M210 0 L250 190" stroke="#ffffff" strokeWidth="10" />
        <path d="M400 0 L372 190" stroke="#ffffff" strokeWidth="10" />
        <path d="M0 40 L640 118" stroke="#ffffff" strokeWidth="6" />
        <path d="M0 100 L640 62" stroke="#fde293" strokeWidth="4" />
        <circle cx="318" cy="80" r="26" fill="var(--primary)" opacity="0.28" />
        <path d="M318 44 C303 44 293 55 293 68 C293 86 318 106 318 106 C318 106 343 86 343 68 C343 55 333 44 318 44 Z" fill="#0b57d0" />
        <circle cx="318" cy="68" r="8" fill="#ffffff" />
        <path d="M150 108 C142 108 136 114 136 122 C136 132 150 144 150 144 C150 144 164 132 164 122 C164 114 158 108 150 108 Z" fill="#9aa0a6" />
        <path d="M505 92 C497 92 491 98 491 106 C491 116 505 128 505 128 C505 128 519 116 519 106 C519 98 513 92 505 92 Z" fill="#9aa0a6" />
      </svg>

      <div className={styles.places}>
        <div className={`${styles.place} ${styles.highlight}`}>
          <span className={styles.placeInfo}>
            <span className={styles.placeName}>Your Business</span>
            <span className={styles.meta}>
              <span className={styles.stars}>{STARS}</span> [your rating] ([your reviews]) · [Service]
            </span>
            <span className={styles.meta}>
              [Your address] · <span className={styles.open}>Open</span> · [your hours]
            </span>
          </span>
          <span className={styles.placeActions}>
            <span className={styles.placeAction}>
              <span className={styles.placeActionIcon}>
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
                </svg>
              </span>
              Website
            </span>
            <span className={styles.placeAction}>
              <span className={styles.placeActionIcon}>
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" strokeWidth="2" strokeLinejoin="round">
                  <path d="M12 3l9 9-9 9-9-9z" />
                  <path d="M9 14v-3h5M12 9l2 2-2 2" />
                </svg>
              </span>
              Directions
            </span>
          </span>
        </div>
        <div className={`${styles.competitorPlace} ${styles.competitorDivider} ${styles.faded}`}>
          <span className={styles.placeNamePlain}>Competitor</span>
          <span className={styles.meta}>★★★★ · [Service] · 2.1 mi</span>
        </div>
        <div className={`${styles.competitorPlace} ${styles.faded}`}>
          <span className={styles.placeNamePlain}>Competitor</span>
          <span className={styles.meta}>★★★★ · [Service] · 3.4 mi</span>
        </div>
      </div>
    </>
  );
}

function AiResults() {
  return (
    <>
      <div className={styles.aiBox}>
        <span className={styles.aiHeading}>
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="#1a73e8">
            <path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2z" />
          </svg>
          AI Answer
        </span>
        <span className={styles.aiText}>
          For [service] in [your city], <span className={styles.aiMention}>Your Business</span> is a frequently
          recommended option. Here is why it stands out:
        </span>
        <span className={styles.aiList}>
          <span>• Offers [what you offer], with pricing listed up front.</span>
          <span>• Serves [your area] and is open [your hours].</span>
          <span>• Customers mention [what people like about you].</span>
        </span>
        <span className={styles.aiSources}>
          <span className={`${styles.aiSource} ${styles.aiSourceOwn}`}>
            <BusinessIcon small />
            yourbusiness.com
          </span>
          <span className={styles.aiSource}>directory-site.com</span>
          <span className={styles.aiSource}>review-site.com</span>
        </span>
      </div>
      <div className={`${styles.dimmed} ${styles.faded}`}>
        <span className={styles.siteUrl}>https://competitor.com</span>
        <span className={styles.resultTitlePlain}>The Regular Results Start Down Here</span>
        <span className={styles.snippetPlain}>Most people have their answer before they scroll this far.</span>
      </div>
    </>
  );
}

function AdResults() {
  return (
    <>
      <div className={`${styles.result} ${styles.highlight}`}>
        <span className={styles.sponsored}>Sponsored</span>
        <div className={styles.siteRow}>
          <BusinessIcon />
          <span className={styles.siteMeta}>
            <span className={styles.siteName}>Your Business</span>
            <span className={styles.siteUrl}>https://yourbusiness.com › book</span>
          </span>
        </div>
        <span className={styles.resultTitle}>[Service] in [Your City] | Book Today</span>
        <span className={styles.snippet}>
          Ad copy written around what the customer just searched, pointing to a landing page built to turn the click
          into a call.
        </span>
        <span className={styles.adLinks}>
          <span>Get a Quote</span>
          <span>Call Now</span>
          <span>Service Areas</span>
          <span>Reviews</span>
        </span>
      </div>
      <div className={`${styles.dimmed} ${styles.faded}`}>
        <span className={styles.sponsored}>Sponsored</span>
        <span className={styles.siteUrl}>https://competitor.com</span>
        <span className={styles.resultTitlePlain}>A Competitor Paying to Be Here Too</span>
      </div>
      <div className={`${styles.dimmed} ${styles.faded}`}>
        <span className={styles.siteUrl}>https://another-site.com</span>
        <span className={styles.resultTitlePlain}>The Free Results Start Down Here</span>
      </div>
    </>
  );
}

const RESULTS = {
  organic: OrganicResults,
  map: MapResults,
  ai: AiResults,
  ad: AdResults,
};

function SearchSimulator() {
  const [activeKey, setActiveKey] = useState("organic");
  const active = tabs.find((tab) => tab.key === activeKey);
  const Results = RESULTS[activeKey];

  return (
    <section id="search" className={styles.section} aria-labelledby="search-title">
      <SectionHeading eyebrow="03 / SEARCH" title="Four Ways a Customer Finds You" titleId="search-title">
        One search, four places your business can show up. I work on all of them. Tap each one to see what it looks
        like and what it takes.
      </SectionHeading>

      {/* Tabs */}
      <div role="group" aria-label="Search result type" className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            aria-pressed={tab.key === activeKey}
            onClick={() => setActiveKey(tab.key)}
            className={tab.key === activeKey ? `${styles.tab} ${styles.tabActive}` : styles.tab}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.columns}>
        {/* The results page */}
        <div className={styles.page}>
          <div className={styles.pageTop}>
            <div className={styles.searchRow}>
              <span className={styles.pageLogo}>search</span>
              <div className={styles.searchBox}>
                <span className={styles.query}>[your service] near me</span>
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" strokeWidth="2.4" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M16.5 16.5L21 21" />
                </svg>
              </div>
            </div>
            <div className={styles.pageTabs}>
              <span className={`${styles.pageTab} ${styles.pageTabActive}`}>All</span>
              <span className={styles.pageTab}>Maps</span>
              <span className={styles.pageTab}>Images</span>
              <span className={styles.pageTab}>Videos</span>
              <span className={styles.pageTab}>News</span>
              <span className={styles.pageTab}>More</span>
            </div>
          </div>
          <div className={styles.pageBody}>
            <Results />
          </div>
        </div>

        {/* What it takes */}
        <div className={styles.takes}>
          <span className={styles.takesLabel}>WHAT IT TAKES</span>
          <h3 className={styles.takesTitle}>{active.title}</h3>
          <p className={styles.takesBody}>{active.body}</p>
          <div className={styles.chips}>
            {active.tools.map((tool) => (
              <span key={tool} className={styles.chip}>
                {tool}
              </span>
            ))}
          </div>
          {active.stat && (
            <div className={styles.stat}>
              <span className={styles.statNum}>{active.stat.num}</span>
              <span className={styles.statLabel}>{active.stat.label}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SearchSimulator;
