const BASE_URL = "https://gilmer-perez.vercel.app";

export const metadata = {
  title: "About",
  description:
    "Learn about Gilmer Perez, a Digital Growth Specialist who builds the site, ranks it in search, tracks what it does, and runs the ads that send it qualified traffic.",
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
  openGraph: {
    title: "About | Gilmer Perez",
    description:
      "Learn about Gilmer Perez, a Digital Growth Specialist covering web development, SEO, paid media, and analytics.",
    url: `${BASE_URL}/about`,
    type: "profile",
    // * Pages that set their own openGraph don't inherit the generated social card
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Gilmer Perez | Digital Growth Specialist" }],
  },
};

export default function AboutLayout({ children }) {
  return children;
}
