import "../styles/globals.css";
import { SITE_URL } from "../data/schema";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Analytics } from "@vercel/analytics/next";
import { Kode_Mono, Source_Code_Pro } from "next/font/google";

// Both are variable fonts, so leaving out `weight` loads one file per style
const kodeMono = Kode_Mono({
  variable: "--font-kode-mono",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const TITLE = "Gilmer Perez | Digital Growth Specialist";
const DESCRIPTION =
  "Gilmer Perez is a Digital Growth Specialist covering web development, SEO, paid media, and analytics. One partner for the whole digital side of your business.";
const SHARE_IMAGE = {
  url: `${SITE_URL}/images/gilmer-perez-1.jpg`,
  width: 1367,
  height: 911,
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
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export const viewport = {
  themeColor: "#0d0d0d",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${kodeMono.variable} ${sourceCodePro.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
