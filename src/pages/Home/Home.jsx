import { useEffect } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

function Home() {
  // * Set page title
  useEffect(() => {
    document.title = "Gilmer Perez | Home";
  }, []);

  return (
    <>
      <main>
        <div className={styles.homeContainer}>
          {/* Hero section */}
          <section className={styles.heroSection}>
            {/* Greeting */}
            <span className={styles.greeting}>
              Hi, I'm <strong>Gilmer</strong>
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
            <Link to="/about" className={styles.ctaButton}>
              LEARN MORE
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}

export default Home;
