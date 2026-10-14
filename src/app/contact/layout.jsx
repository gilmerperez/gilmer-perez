const BASE_URL = "https://gilmer-perez.vercel.app";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Gilmer Perez about a website, SEO, paid media, or analytics project. Tell me the goal and I will help carry it through the site, search, ads, and reporting.",
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
  openGraph: {
    title: "Contact | Gilmer Perez",
    description:
      "Get in touch with Gilmer Perez about a website, SEO, paid media, or analytics project.",
    url: `${BASE_URL}/contact`,
    type: "website",
    // * Pages that set their own openGraph don't inherit the generated social card
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Gilmer Perez | Digital Growth Specialist" }],
  },
};

export default function ContactLayout({ children }) {
  return children;
}
