import Link from "next/link";
import FooterScene from "./FooterScene";
import styles from "./Footer.module.css";
import { EMAIL, PHONE_HREF, PHONE_DISPLAY, LOCATION, GITHUB_URL, LINKEDIN_URL } from "../../data/contact";

// * Section links point at "/#section" so they also work from the legal pages
const SECTION_LINKS = [
  { href: "/#how", label: "Process" },
  { href: "/#search", label: "Search" },
  { href: "/#reporting", label: "Reporting" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#proof", label: "Proof" },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        {/* Brand block */}
        <div className={styles.brand}>
          <Link href="/#top" className={styles.logo}>
            Gilmer Perez
          </Link>
          <p className={styles.tagline}>
            Websites, search, ads, and analytics. One partner for the whole digital side of your business.
          </p>
          <div className={styles.contactList}>
            <a href={`mailto:${EMAIL}`} className={styles.contactItem}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              {EMAIL}
            </a>
            <a href={PHONE_HREF} className={styles.contactItem}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
              </svg>
              {PHONE_DISPLAY}
            </a>
            <span className={styles.contactItem}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
              {LOCATION}
            </span>
          </div>
        </div>

        {/* Sections */}
        <nav className={styles.linkColumn} aria-labelledby="footer-sections">
          <span id="footer-sections" className={styles.columnHeading}>
            SECTIONS
          </span>
          {SECTION_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Connect */}
        <nav className={styles.linkColumn} aria-labelledby="footer-connect">
          <span id="footer-connect" className={styles.columnHeading}>
            CONNECT
          </span>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </nav>

        {/* Start something */}
        <div className={styles.startColumn}>
          <span className={styles.columnHeading}>START SOMETHING</span>
          <p className={styles.startText}>
            Have a goal for your business? Tell me what it is and I will map out how to get there.
          </p>
          <Link href="/#contact" className={styles.startButton}>
            Get in touch
          </Link>
        </div>
      </div>

      {/* Copyright and legal links */}
      <div className={styles.legalRow}>
        <span>&copy; {new Date().getFullYear()} Gilmer Perez. All rights reserved.</span>
        <span className={styles.legalLinks}>
          <Link href="/privacy-policy" className={styles.legalLink}>
            Privacy Policy
          </Link>
          <span aria-hidden="true">|</span>
          <Link href="/terms-of-service" className={styles.legalLink}>
            Terms of Service
          </Link>
        </span>
      </div>

      <FooterScene />
    </footer>
  );
}

export default Footer;
