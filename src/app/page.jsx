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
              A <strong>Front-End Developer</strong> specialized in building{" "}
              <strong>high-performance, SEO-optimized</strong> applications using <strong>Next.js</strong>. I blend
              creative <strong>UI/UX design</strong> with a strong <strong>full-stack foundation</strong> to create
              digital products that are not only visually stunning but also discoverable, fast, and built for{" "}
              <strong>business growth</strong>.
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
