import styles from "./Header.module.css";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
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

  // * Custom styles for active page
  const navLinkClass = ({ isActive }) => (isActive ? styles.activeLink : undefined);

  // * Theme switch
  const [theme, setTheme] = useState("light");

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
    window.location.href = "tel:(407) 295-1212";
  };

  return (
    <>
      <header className={`${isScrollingUp ? styles.visible : styles.hidden}`} role="banner" aria-label="Site header">
        <div className={styles.headerContainer}>
          {/* Desktop Layout */}
          <div className={styles.desktopLayout}>
            {/* Logo */}
            <NavLink to="/" className={styles.logoContainer} aria-label="Go to home page">
              <img src="/logo.jpg" alt="Bubbalous Bodacious BBQ Logo" />
            </NavLink>
            {/* Site navigation */}
            <div className={styles.navContainer}>
              <nav className={styles.navItems} aria-label="Main site navigation">
                <NavLink to="/" className={navLinkClass} aria-label="Go to home page">
                  HOME
                </NavLink>
                <NavLink to="/menu" className={navLinkClass} aria-label="View our menu">
                  MENU
                </NavLink>
                <NavLink to="/party-packs" className={navLinkClass} aria-label="Browse party packs">
                  PARTY PACKS
                </NavLink>
                <NavLink to="/order-online" className={navLinkClass} aria-label="Order online">
                  ORDER ONLINE
                </NavLink>
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
                <i className={`fa-solid ${theme === "dark" ? "fa-moon" : "fa-sun"}`} aria-hidden="true"></i>
                <p>{theme === "dark" ? "DARK" : "LIGHT"}</p>
              </button>
            </div>
          </div>

          {/* Mobile layout */}
          <div className={styles.mobileLayout}>
            {/* Phone button */}
            <button
              className={styles.phoneButton}
              onClick={handlePhoneClick}
              aria-label="Call us at (407) 295-1212"
              type="button"
            >
              <i className="fa-solid fa-phone fa-xl" aria-hidden="true"></i>
            </button>
            {/* Logo */}
            <NavLink to="/" className={styles.mobileLogoContainer} aria-label="Go to home page">
              <img src="/logo.jpg" alt="Bubbalous Bodacious BBQ Logo" />
            </NavLink>
            {/* Hamburger menu button */}
            <button
              aria-expanded={menuOpen}
              className={styles.hamburger}
              onClick={handleHamburgerClick}
              aria-label="Open navigation menu"
            >
              <i className={`fa-solid fa-bars fa-xl ${isSpinning ? styles.spin : ""}`} aria-hidden="true"></i>
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
                <NavLink
                  to="/"
                  className={navLinkClass}
                  aria-label="Go to home page"
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="fa-solid fa-house" aria-hidden="true"></i>
                  HOME
                </NavLink>
                <NavLink
                  to="/menu"
                  className={navLinkClass}
                  aria-label="View our menu"
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="fa-solid fa-burger" aria-hidden="true"></i>
                  MENU
                </NavLink>
                <NavLink
                  to="/party-packs"
                  className={navLinkClass}
                  aria-label="Browse party packs"
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="fa-solid fa-box" aria-hidden="true"></i>
                  PARTY PACKS
                </NavLink>
                <NavLink
                  to="/order-online"
                  className={navLinkClass}
                  aria-label="Order online"
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="fa-solid fa-mobile-screen-button" aria-hidden="true"></i>
                  ORDER ONLINE
                </NavLink>
              </nav>
              {/* Sidebar footer */}
              <footer className={styles.sidebarFooter}>
                {/* Theme button */}
                <button
                  onClick={toggleTheme}
                  className={`${styles.themeButton} ${styles.sidebarThemeButton}`}
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                  <i className={`fa-solid ${theme === "dark" ? "fa-moon" : "fa-sun"}`} aria-hidden="true"></i>
                  <p>{theme === "dark" ? "DARK" : "LIGHT"}</p>
                </button>
                {/* Legal pages */}
                <NavLink
                  to="/contact"
                  aria-label="Contact us"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
                  CONTACT
                </NavLink>
                <NavLink
                  to="/privacy-policy"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                  aria-label="Read our privacy policy"
                >
                  <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
                  PRIVACY POLICY
                </NavLink>
                <NavLink
                  to="/terms-of-service"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                  aria-label="Read our terms of service"
                >
                  <i className="fa-solid fa-asterisk" aria-hidden="true"></i>
                  TERMS OF SERVICE
                </NavLink>
              </footer>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default Header;
