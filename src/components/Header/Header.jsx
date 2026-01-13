"use client";

import styles from "./Header.module.css";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

function Header() {
  const pathname = usePathname();

  // * Sticky header logic
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingUp(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // * Check if path is active
  const isActive = (path) => pathname === path;

  // * Theme switch
  const [theme, setTheme] = useState("dark");

  // Make theme be set in DOM
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialTheme = storedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  // Save theme to localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle handler
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Make media theme switch on phone's user settings
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // * Mobile sidebar toggle
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  // Handle hamburger click with spin animation
  const handleHamburgerClick = () => {
    setMenuOpen(true);
    setIsSpinning(true);

    // Reset spinning state after animation completes
    setTimeout(() => {
      setIsSpinning(false);
    }, 300);
  };

  // * Phone call handler
  const handlePhoneClick = () => {
    window.location.href = "tel:(407) 350-1805";
  };

  // * Resume link handler
  const [isLoading, setIsLoading] = useState(false);
  const handleResumeClick = () => {
    try {
      setIsLoading(true);
      // Open google drive link in new tab
      window.open(
        "https://docs.google.com/document/d/1QmNaxVlksOkM19y5q-MwhkdiBU8DjDdTBXb9G2vBHX0/edit?usp=drive_link",
        "_blank",
        "noopener noreferrer"
      );
      // Reset loading state after a short delay
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      console.error("Error opening resume:", error);
      alert("Sorry, there was an error opening the resume. Please try again.");
    }
  };

  return (
    <>
      <header className={`${isScrollingUp ? styles.visible : styles.hidden}`} role="banner" aria-label="Site header">
        <div className={styles.headerContainer}>
          {/* Desktop layout */}
          <div className={styles.desktopLayout}>
            {/* Logo */}
            <Link href="/" aria-label="Go to home page">
              <span className={styles.logo}>GILMERPEREZ</span>
            </Link>
            {/* Site navigation */}
            <div className={styles.navContainer}>
              <nav className={styles.navItems} aria-label="Main site navigation">
                <Link href="/" className={isActive("/") ? styles.activeLink : undefined} aria-label="Go to home page">
                  HOME
                </Link>
                <Link
                  href="/about"
                  className={isActive("/about") ? styles.activeLink : undefined}
                  aria-label="Go to about page"
                >
                  ABOUT
                </Link>
                <Link
                  href="/contact"
                  className={isActive("/contact") ? styles.activeLink : undefined}
                  aria-label="Go to contact page"
                >
                  CONTACT
                </Link>
                <Link
                  href="/projects"
                  className={isActive("/projects") ? styles.activeLink : undefined}
                  aria-label="Go to projects page"
                >
                  PROJECTS
                </Link>
              </nav>
              {/* Separator */}
              <span className={styles.separator} aria-hidden="true">
                |
              </span>
              {/* Theme button */}
              <button
                onClick={toggleTheme}
                className={styles.themeButton}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                <i className={`fa-regular ${theme === "dark" ? "fa-moon" : "fa-sun"}`} aria-hidden="true"></i>
              </button>
              {/* Resume button */}
              <button
                disabled={isLoading}
                onClick={handleResumeClick}
                className={styles.resumeButton}
                aria-label={isLoading ? "Opening resume" : "View my resume"}
              >
                {isLoading ? "OPENING" : "RESUME"}
              </button>
            </div>
          </div>

          {/* Mobile layout */}
          <div className={styles.mobileLayout}>
            {/* Phone button */}
            <button
              type="button"
              onClick={handlePhoneClick}
              className={styles.phoneButton}
              aria-label="Call me at (407) 350-1805"
            >
              <i className="fa-solid fa-phone-volume" aria-hidden="true"></i>
            </button>
            {/* Mobile logo */}
            <Link href="/" aria-label="Go to home page">
              <span className={styles.mobileLogo}>GILMERPEREZ</span>
            </Link>
            {/* Hamburger menu */}
            <button
              type="button"
              aria-expanded={menuOpen}
              className={styles.hamburger}
              onClick={handleHamburgerClick}
              aria-label="Open navigation menu"
            >
              <i className={`fa-solid fa-bars ${isSpinning ? styles.spin : ""}`} aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      {menuOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className={styles.sidebarOverlay}
            onClick={() => setMenuOpen(false)}
          >
            <div className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
              {/* Sidebar close button */}
              <button
                className={styles.sidebarClose}
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <i className="fa-solid fa-xmark" aria-hidden="true"></i>
              </button>
              {/* Sidebar site navigation */}
              <nav className={styles.sidebarNavItems} aria-label="Mobile site navigation">
                <Link
                  href="/"
                  className={isActive("/") ? styles.activeLink : undefined}
                  aria-label="Go to home page"
                  onClick={() => setMenuOpen(false)}
                >
                  HOME
                </Link>
                <Link
                  href="/about"
                  className={isActive("/about") ? styles.activeLink : undefined}
                  aria-label="Go to about page"
                  onClick={() => setMenuOpen(false)}
                >
                  ABOUT
                </Link>
                <Link
                  href="/contact"
                  className={isActive("/contact") ? styles.activeLink : undefined}
                  aria-label="Go to contact page"
                  onClick={() => setMenuOpen(false)}
                >
                  CONTACT
                </Link>
                <Link
                  href="/projects"
                  className={isActive("/projects") ? styles.activeLink : undefined}
                  aria-label="Go to projects page"
                  onClick={() => setMenuOpen(false)}
                >
                  PROJECTS
                </Link>
                <hr className={styles.sidebarSeparator} />
                {/* Sidebar resume button */}
                <button
                  disabled={isLoading}
                  aria-label={isLoading ? "Opening resume" : "View my resume"}
                  className={`${styles.sidebarResumeButton} ${isActive("/") ? "" : ""}`}
                  onClick={() => {
                    setMenuOpen(false);
                    handleResumeClick();
                  }}
                >
                  <i className="fa-regular fa-file-pdf"></i>
                  {isLoading ? "OPENING" : "RESUME"}
                </button>
              </nav>
              {/* Sidebar footer */}
              <div className={styles.sidebarFooter}>
                {/* Sidebar theme button */}
                <button
                  onClick={toggleTheme}
                  className={`${styles.themeButton} ${styles.sidebarThemeButton}`}
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                  <i className={`fa-regular ${theme === "dark" ? "fa-moon" : "fa-sun"}`} aria-hidden="true"></i>
                  <p>{theme === "dark" ? "DARK" : "LIGHT"}</p>
                </button>
                {/* Sidebar legal pages */}
                <Link
                  href="/privacy-policy"
                  className={isActive("/privacy-policy") ? styles.activeLink : undefined}
                  onClick={() => setMenuOpen(false)}
                  aria-label="Read my privacy policy"
                >
                  <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
                  PRIVACY POLICY
                </Link>
                <Link
                  href="/terms-of-service"
                  className={isActive("/terms-of-service") ? styles.activeLink : undefined}
                  onClick={() => setMenuOpen(false)}
                  aria-label="Read our terms of service"
                >
                  <i className="fa-solid fa-asterisk" aria-hidden="true"></i>
                  TERMS OF SERVICE
                </Link>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default Header;
