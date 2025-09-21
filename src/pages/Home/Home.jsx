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
            <h2 className={styles.greeting}>
              Hi, I'm <span className={styles.greetingName}>Gilmer</span>{" "}
            </h2>
            {/* Main title */}
            <h1 className={styles.mainTitle}>
              FRONT-END
              <br />
              WEB DEVELOPER.
            </h1>
            {/* Description */}
            <p className={styles.description}>
              A passionate <strong>Front-End Web Developer</strong> and <strong>UI/UX Enthusiast</strong> with{" "}
              <strong>Full-Stack Knowledge</strong>, specialized in building stunning pixel-perfect interactive websites
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
