const BASE_URL = "https://gilmer-perez.vercel.app";

export const metadata = {
  title: "Gilmer Perez | About",
  description:
    "Learn about Gilmer Perez, a Front-End Web Developer and UI/UX enthusiast with Full-Stack knowledge. Discover my journey, skills, and passion for building pixel-perfect interactive websites and applications.",
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
  openGraph: {
    title: "Gilmer Perez | About",
    description:
      "Learn about Gilmer Perez, a Front-End Web Developer and UI/UX enthusiast with Full-Stack knowledge.",
    url: `${BASE_URL}/about`,
    type: "profile",
  },
};

export default function AboutLayout({ children }) {
  return children;
}
