"use client";
import Link from "next/link";
import styles from "./Header.module.css";
import { useState, useEffect, useRef } from "react";

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

// * Which link is underlined while reading each part of the page. Search and
// Reporting belong to Process, Proof belongs to Projects, and the Contact
// section has no link of its own (the Contact button is the destination).
const SECTION_TO_LINK = [
  { id: "top", link: 0 },
  { id: "how", link: 1 },
  { id: "experience", link: 2 },
  { id: "projects", link: 3 },
  { id: "contact", link: -1 },
];
const READING_LINE = 0.35; // a section counts as current once its top passes 35% down the window

// Index of the link for the section being read, or -1 for none
function findActiveLink() {
  const line = window.innerHeight * READING_LINE;
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
  let active = -1;
  for (const { id, link } of SECTION_TO_LINK) {
    const section = document.getElementById(id);
    if (!section) continue;
    if (section.getBoundingClientRect().top <= line || (atBottom && id === "contact")) active = link;
  }
  return active;
}

// * On phones the header slides away while scrolling down and comes back on any scroll up
const HIDE_AFTER = 160; // px from the top before the header may hide
const SCROLL_SLOP = 6; // ignore tiny scroll jitters

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeLink, setActiveLink] = useState(-1);
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const linkRefs = useRef([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    let lastY = window.scrollY;

    // Underline the link for the section being read
    let frame = 0;
    const updateActive = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setActiveLink(findActiveLink()));
    };

    const handleScroll = () => {
      updateActive();
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) < SCROLL_SLOP) return;
      lastY = y;
      setHidden(mediaQuery.matches && delta > 0 && y > HIDE_AFTER);
    };

    updateActive();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  // * Slide the blue line under the active link. Measured from the links themselves,
  // and again whenever the nav changes size (fonts loading, window resizing).
  useEffect(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!nav || !indicator) return;

    const place = () => {
      const link = linkRefs.current[activeLink];
      if (!link) {
        indicator.style.opacity = "0";
        return;
      }
      indicator.style.opacity = "1";
      indicator.style.width = `${link.offsetWidth}px`;
      indicator.style.transform = `translate(${link.offsetLeft}px, ${link.offsetTop + link.offsetHeight - 1}px)`;
    };

    place();
    const observer = new ResizeObserver(place);
    observer.observe(nav);
    return () => observer.disconnect();
  }, [activeLink]);

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
    // Never hide while the menu is open
    <header className={hidden && !menuOpen ? `${styles.header} ${styles.hidden}` : styles.header}>
      <div className={styles.bar}>
        {/* Logo */}
        <Link href="/#top" className={styles.logo}>
          Gilmer Perez
        </Link>

        {/* Desktop navigation */}
        <nav ref={navRef} className={styles.desktopNav} aria-label="Main site navigation">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              ref={(el) => {
                linkRefs.current[i] = el;
              }}
              aria-current={i === activeLink ? "location" : undefined}
              className={i === activeLink ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}
            >
              {link.label}
            </Link>
          ))}
          <span ref={indicatorRef} aria-hidden="true" className={styles.indicator}></span>
          <Link href="/#contact" className="btn btn-primary btn-small">
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
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              aria-current={i === activeLink ? "location" : undefined}
              className={i === activeLink ? `${styles.mobileLink} ${styles.mobileLinkActive}` : styles.mobileLink}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/#contact" onClick={closeMenu} className={`btn btn-primary ${styles.mobileContact}`}>
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
