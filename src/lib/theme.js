// * Theme switching shared by the footer moon and the hero sun / black hole.
// The dark theme is Graphite and Blue, the light theme is White and Cobalt. In
// browsers with the View Transitions API the new theme spreads out from the
// clicked control as a growing circle; elsewhere it switches instantly. The
// choice is saved in localStorage and read back before first paint by the
// script in layout.jsx.

const STORAGE_KEY = "theme";

export function readTheme() {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

export function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  // The tab icon added by the script in layout.jsx
  const icon = document.getElementById("theme-icon");
  if (icon) icon.href = `/favicon-${theme}.svg`;

  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Private browsing can block storage. The switch still works for this visit.
  }
}

// For useSyncExternalStore: re-render whenever data-theme on <html> changes
export function subscribeTheme(onChange) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

// Switch to the other theme, growing it out of the element that was clicked
export function switchTheme(event, duration = 900) {
  const next = readTheme() === "dark" ? "light" : "dark";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!document.startViewTransition || reduceMotion) {
    applyTheme(next);
    return;
  }

  // Far enough to cover the farthest corner of the window
  const rect = event.currentTarget.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  const transition = document.startViewTransition(() => applyTheme(next));
  transition.ready
    .then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    })
    .catch(() => {});
}
