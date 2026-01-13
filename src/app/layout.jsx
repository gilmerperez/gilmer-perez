import "../styles/globals.css";
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
  title: "Gilmer Perez | Front-End Web Developer",
  description:
    "A passionate Front-End Web Developer and UI/UX enthusiast with Full-Stack knowledge, specialized in building stunning pixel-perfect interactive websites and applications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${kodeMono.variable} ${sourceCodePro.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
