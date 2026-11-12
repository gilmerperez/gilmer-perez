import { SITE_URL } from "../data/schema";

// Update these only when the content of the page actually changes
const HOME_UPDATED = "2026-11-12";
const LEGAL_UPDATED = "2026-11-12";

export default function sitemap() {
  // The site is a single page plus the two legal pages
  return [
    {
      url: SITE_URL,
      lastModified: HOME_UPDATED,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: LEGAL_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms-of-service`,
      lastModified: LEGAL_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
