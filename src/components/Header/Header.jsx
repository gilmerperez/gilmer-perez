"use client";
import Link from "next/link";
import styles from "./Header.module.css";
import { useState, useEffect } from "react";

// * Breakpoint where the desktop links collapse into the hamburger menu (matches Header.module.css)
const MOBILE_QUERY = "(max-width: 860px)";

// * Links point at "/#section" so they scroll in place on the home page and
// still work from the legal pages
const NAV_LINKS = [
  { href: "/#top", label: "HOME" },
  { href: "/#how", label: "PROCESS" },
  { href: "/#experience", label: "EXPERIENCE" },
  { href: "/#projects", label: "PROJECTS" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  // * While the menu is open, close it on Escape or when the viewport grows past the breakpoint
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const handleBreakpoint = (e) => {
      if (!e.matches) setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    mediaQuery.addEventListener("change", handleBreakpoint);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      mediaQuery.removeEventListener("change", handleBreakpoint);
    };
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        {/* Logo */}
        <Link href="/#top" className={styles.logo}>
          GILMERPEREZ
        </Link>

        {/* Desktop navigation */}
        <nav className={styles.desktopNav} aria-label="Main site navigation">
          {NAV_LINKS.map((link, i) => (
            <Link key={link.href} href={link.href} className={i === 0 ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}>
              {link.label}
            </Link>
          ))}
          <Link href="/#contact" className={styles.contactButton}>
            CONTACT
          </Link>
        </nav>

        {/* Hamburger button */}
        <button
          type="button"
          className={styles.burger}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? (
            <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          ) : (
            <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown, rendered inside the header box */}
      {menuOpen && (
        <nav id="mobile-navigation" className={styles.mobileNav} aria-label="Mobile site navigation">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={closeMenu} className={styles.mobileLink}>
              {link.label}
            </Link>
          ))}
          <Link href="/#contact" onClick={closeMenu} className={styles.mobileContact}>
            CONTACT
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
