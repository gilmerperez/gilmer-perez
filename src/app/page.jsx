import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Gilmer Perez | Home",
  description:
    "A Front-End Developer specialized in building high-performance, SEO-optimized applications using Next.js. I blend creative UI/UX design with a strong full-stack foundation to create digital products that are not only visually stunning but also discoverable, fast, and built for business growth.",
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
              A <strong>FRONT-END DEVELOPER</strong> specialized in building{" "}
              <strong>HIGH-PERFORMANCE, SEO-OPTIMIZED</strong> applications using <strong>NEXT.JS</strong>. I blend
              creative <strong>UI/UX DESIGN</strong> with a strong <strong>FULL-STACK FOUNDATION</strong> to create
              digital products that are not only visually stunning but also discoverable, fast, and built for{" "}
              <strong>BUSINESS GROWTH</strong>.
            </p>
            {/* CTA buttons */}
            <div className={styles.buttonContainer}>
              <Link href="/about" className={styles.ctaButton}>
                LEARN MORE
              </Link>
              <Link href="/projects" className={styles.ctaButton}>
                VIEW PROJECTS
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
