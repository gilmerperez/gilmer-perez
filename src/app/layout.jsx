import "../styles/globals.css";
import { SITE_URL } from "../data/schema";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Analytics } from "@vercel/analytics/next";
import { Newsreader, Outfit } from "next/font/google";

// Both are variable fonts, so leaving out `weight` loads one file per style.
// Newsreader also has an optical size axis: large headings get the display cut.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

// * Runs before first paint so the page never flashes the wrong theme.
// Uses the visitor's saved choice, otherwise their system setting, otherwise dark.
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","dark")}})();`;

const TITLE = "Gilmer Perez | Digital Growth Specialist";
const DESCRIPTION =
  "Gilmer Perez is a Digital Growth Specialist covering web development, SEO, paid media, and analytics. One partner for the whole digital side of your business.";
const SHARE_IMAGE = {
  url: `${SITE_URL}/images/share-image.png`,
  width: 1200,
  height: 630,
  alt: "Gilmer Perez, Digital Growth Specialist",
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Gilmer Perez",
  },
  description: DESCRIPTION,
  keywords: [
    "Digital Growth Specialist",
    "SEO Specialist",
    "Technical SEO",
    "Local SEO",
    "Google Ads",
    "Meta Ads",
    "PPC",
    "GA4",
    "Web Developer",
    "Next.js Developer",
    "React Developer",
    "Front-End Developer",
    "UI/UX Design",
    "Web Development",
    "Orlando",
    "Florida",
    "Orlando Web Developer",
    "Florida Web Developer",
  ],
  authors: [{ name: "Gilmer Perez" }],
  creator: "Gilmer Perez",
  publisher: "Gilmer Perez",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}/`,
    siteName: "Gilmer Perez Portfolio",
    title: TITLE,
    description: DESCRIPTION,
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: SHARE_IMAGE.url, alt: SHARE_IMAGE.alt }],
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
    google: "3FTfHaZrjPjKogJbOTyhOila5U11Fj2l512M51iBOH0",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
    { media: "(prefers-color-scheme: light)", color: "#f4f1ea" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }) {
  return (
    // data-theme is set by THEME_SCRIPT before React hydrates, hence suppressHydrationWarning
    <html lang="en" data-theme="dark" className={`${newsreader.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
