import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Gilmer Perez | Home",
  description:
    "A passionate Front-End Web Developer and UI/UX enthusiast with Full-Stack knowledge, specialized in building stunning pixel-perfect interactive websites and applications.",
};

export default function Home() {
  return (
    <>
      <main>
        <div className={styles.homeContainer}>
          {/* Hero section */}
          <section className={styles.heroSection}>
            {/* Greeting */}
            <span className={styles.greeting}>
              Hi, I&apos;m <strong>Gilmer</strong>
            </span>
            {/* Title */}
            <h1 className={styles.homeTitle}>
              FRONT-END
              <br />
              WEB DEVELOPER.
            </h1>
            {/* Description */}
            <p className={styles.homeDescription}>
              A passionate <strong>FRONT-END WEB DEVELOPER</strong> and <strong>UI/UX ENTHUSIAST</strong> with{" "}
              <strong>FULL-STACK KNOWLEDGE</strong>, specialized in building stunning pixel-perfect interactive websites
              and applications. Passionate about creating engaging & dynamic web experiences.
            </p>
            {/* CTA button */}
            <Link href="/about" className={styles.ctaButton}>
              LEARN MORE
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
