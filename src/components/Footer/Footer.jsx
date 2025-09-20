import styles from "./Footer.module.css";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer>
        <div className={styles.footerContainer}>
          <div className={styles.topContainer}>
            {/* Legal disclaimer */}
            <p className={styles.legalDisclaimer}>
              This portfolio showcases my work and capabilities as a website developer. All work displayed is my own
              creation. This site is for professional demonstration purposes.
            </p>
            {/* Copyright */}
            <p className={styles.copyright}>&copy; {new Date().getFullYear()} Gilmer Perez. All rights reserved.</p>
          </div>

          {/* Separator */}
          <hr className={styles.separator} aria-hidden="true" />

          <div className={styles.bottomContainer}>
            {/* Site navigation */}
            <section className={styles.siteNavigation} aria-labelledby="pages-heading">
              <h5 id="pages-heading" className={styles.navHeader}>
                PAGES
              </h5>
              <nav className={styles.navItems} aria-label="Main site navigation">
                <NavLink to="/" aria-label="Go to home page">
                  Home
                </NavLink>
                <NavLink to="/about" aria-label="View my about page">
                  About
                </NavLink>
                <NavLink to="/contact" aria-label="Contact me">
                  Contact
                </NavLink>
                <NavLink to="/projects" aria-label="Browse my projects">
                  Projects
                </NavLink>
              </nav>
            </section>
            {/* Social links */}
            <section className={styles.socialLinks} aria-labelledby="connect-heading">
              <h5 id="connect-heading" className={styles.navHeader}>
                CONNECT
              </h5>
              <nav className={styles.navItems} aria-label="Professional networking sites">
                {/* GitHub */}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Check out my GitHub"
                  href="https://github.com/gilmerperez"
                >
                  GitHub
                </a>
                {/* LinkedIn */}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Check out my LinkedIn"
                  href="https://www.linkedin.com/in/gilmer-perez-a35ba0354/"
                >
                  LinkedIn
                </a>
              </nav>
            </section>
            {/* Legal pages */}
            <section className={styles.legalPages} aria-labelledby="legal-heading">
              <h5 id="legal-heading" className={styles.navHeader}>
                LEGAL
              </h5>
              <nav className={styles.navItems} aria-label="Legal pages">
                <NavLink to="/privacy-policy" aria-label="Read my privacy policy">
                  Privacy Policy
                </NavLink>
                <NavLink to="/terms-of-service" aria-label="Read my terms of service">
                  Terms of Service
                </NavLink>
              </nav>
            </section>
            {/* Contact info */}
            <section className={styles.contactInfo} aria-labelledby="contact-heading">
              <h5 id="contact-heading" className={styles.navHeader}>
                CONTACT
              </h5>
              <nav className={styles.navItems} aria-label="Contact information">
                {/* Phone number */}
                <a href="tel:+14073501805" aria-label="Call me at (407) 350-1805" className={styles.contactLink}>
                  407-350-1805
                </a>
                {/* Email */}
                <a
                  className={styles.contactLink}
                  href="mailto:gilmer2002@outlook.com"
                  aria-label="Email me at gilmer2002@outlook.com"
                >
                  gilmer2002@outlook.com
                </a>
              </nav>
            </section>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
