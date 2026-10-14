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

const SITE_TITLE = "Gilmer Perez | Digital Growth Specialist";
const SITE_DESCRIPTION =
  "Digital Growth Specialist covering the full path from website to customer: web development, SEO, paid media, and analytics. Based in Central Florida.";

export const metadata = {
  // * Resolves relative social image URLs (e.g. the generated opengraph-image) to the live domain
  metadataBase: new URL("https://gilmer-perez.vercel.app"),
  title: {
    default: SITE_TITLE,
    template: "%s | Gilmer Perez",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Digital Growth Specialist",
    "Web Developer",
    "SEO Specialist",
    "Technical SEO",
    "Local SEO",
    "AEO",
    "GEO",
    "Paid Media",
    "Google Ads",
    "PPC",
    "Google Analytics 4",
    "Google Tag Manager",
    "Google Search Console",
    "Schema Markup",
    "Core Web Vitals",
    "Next.js Developer",
    "React Developer",
    "Small Business Websites",
    "Central Florida Web Developer",
  ],
  authors: [{ name: "Gilmer Perez" }],
  creator: "Gilmer Perez",
  publisher: "Gilmer Perez",
  alternates: {
    canonical: "https://gilmer-perez.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gilmer-perez.vercel.app/",
    siteName: "Gilmer Perez Portfolio",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
