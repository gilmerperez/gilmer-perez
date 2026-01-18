const BASE_URL = "https://gilmer-perez.vercel.app";

export const metadata = {
  title: "Gilmer Perez | Contact",
  description:
    "Get in touch with Gilmer Perez for web development projects, business inquiries, or collaboration opportunities. Available for freelance work and full-time positions.",
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
  openGraph: {
    title: "Gilmer Perez | Contact",
    description:
      "Get in touch with Gilmer Perez for web development projects, business inquiries, or collaboration opportunities.",
    url: `${BASE_URL}/contact`,
    type: "website",
  },
};

export default function ContactLayout({ children }) {
  return children;
}
