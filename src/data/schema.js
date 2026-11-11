import { GITHUB_URL, LINKEDIN_URL } from "./contact";

export const SITE_URL = "https://gilmer-perez.vercel.app";

// * Person schema
// This exact object is injected as JSON-LD on the home page and printed in the
// Proof section's code panel, so the two can never drift apart.
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gilmer Perez",
  jobTitle: "Digital Growth Specialist",
  description:
    "Digital Growth Specialist who builds and hosts websites, makes them rank in search, tracks what they do, runs paid ads, and reports on the results. One partner for the whole digital side of a business.",
  url: SITE_URL,
  image: `${SITE_URL}/images/gilmer-perez-1.jpg`,
  knowsAbout: ["SEO", "Google Ads", "Meta Ads", "GA4", "Next.js", "Technical SEO", "Web Development"],
  sameAs: [GITHUB_URL, LINKEDIN_URL],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "University of Central Florida",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Orlando",
    addressRegion: "FL",
    addressCountry: "US",
  },
};

// * WebSite schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Gilmer Perez Portfolio",
  url: SITE_URL,
  description:
    "Portfolio of Gilmer Perez, a Digital Growth Specialist covering web development, SEO, paid media, and analytics.",
  author: {
    "@type": "Person",
    name: "Gilmer Perez",
  },
};
