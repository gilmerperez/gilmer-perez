import "../styles/globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Analytics } from "@vercel/analytics/next";
import { Kode_Mono, Source_Code_Pro } from "next/font/google";

const kodeMono = Kode_Mono({
  variable: "--font-kode-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: {
    default: "Gilmer Perez | Front-End Web Developer",
    template: "%s | Gilmer Perez",
  },
  description:
    "A passionate Front-End Web Developer and UI/UX enthusiast with Full-Stack knowledge, specialized in building stunning pixel-perfect interactive websites and applications. Explore my portfolio showcasing React, Next.js, Node.js, and modern web development projects.",
  keywords: [
    "Front-End Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "UI/UX Designer",
    "Full-Stack Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Portfolio",
    "Web Development",
    "Responsive Design",
    "Modern Web Applications",
    "React Portfolio",
    "Next.js Portfolio",
    "Node.js Developer",
    "Express.js",
    "PostgreSQL",
    "MongoDB",
    "RESTful API",
    "GraphQL",
    "GitHub Portfolio",
    "Orlando Web Developer",
    "Florida Web Developer",
  ],
  authors: [{ name: "Gilmer Perez" }],
  creator: "Gilmer Perez",
  publisher: "Gilmer Perez",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gilmer-perez.vercel.app/",
    siteName: "Gilmer Perez Portfolio",
    title: "Gilmer Perez | Front-End Web Developer",
    description:
      "A passionate Front-End Web Developer and UI/UX enthusiast with Full-Stack knowledge, specialized in building stunning pixel-perfect interactive websites and applications.",
    images: [
      {
        url: "/images/gilmer-perez-1.jpg",
        width: 1200,
        height: 630,
        alt: "Gilmer Perez - Front-End Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gilmer Perez | Front-End Web Developer",
    description:
      "A passionate Front-End Web Developer and UI/UX enthusiast with Full-Stack knowledge, specialized in building stunning pixel-perfect interactive websites and applications.",
    images: ["/images/gilmer-perez-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add Google Search Console verification code if available
    // google: "your-verification-code",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className={`${kodeMono.variable} ${sourceCodePro.variable}`}>
          <Header />
          {children}
          <Footer />
          <Analytics />
        </body>
      </html>
    </>
  );
}
