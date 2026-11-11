"use client";
import Link from "next/link";
import styles from "./Header.module.css";
import { useState, useEffect } from "react";

// * Breakpoint where the desktop links collapse into the hamburger menu (matches Header.module.css)
const MOBILE_QUERY = "(max-width: 860px)";

// * Links point at "/#section" so they scroll in place on the home page and
// still work from the legal pages
const NAV_LINKS = [
  { href: "/#top", label: "Home" },
  { href: "/#how", label: "Process" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
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
          Gilmer Perez
        </Link>

        {/* Desktop navigation */}
        <nav className={styles.desktopNav} aria-label="Main site navigation">
          {NAV_LINKS.map((link, i) => (
            <Link key={link.href} href={link.href} className={i === 0 ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}>
              {link.label}
            </Link>
          ))}
          <Link href="/#contact" className={styles.contactButton}>
            Contact
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
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M4 8h16M4 16h16" />
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
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
