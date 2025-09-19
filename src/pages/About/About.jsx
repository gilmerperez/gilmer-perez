import { useEffect } from "react";
import styles from "./About.module.css";

function About() {
  // * Set page title
  useEffect(() => {
    document.title = "Gilmer Perez | About";
  }, []);

  return (
    <>
      <main>
        <div className={styles.aboutContainer}>
          <div className={styles.contentWrapper}>
            {/* Text content */}
            <div className={styles.textContent}>
              {/* Title */}
              <h1 className={styles.title}>ABOUT</h1>
              {/* Description */}
              <div className={styles.description}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident.
                </p>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                  totam rem aperiam.
                </p>
              </div>
              {/* Divider */}
              <div className={styles.divider}></div>
              {/* Technologies */}
              <div className={styles.technologiesSection}>
                <h2 className={styles.technologiesTitle}>Technologies</h2>
                <div className={styles.technologiesList}>
                  <div className={styles.techColumn}>
                    <div className={styles.techItem}>
                      <span>JavaScript</span>
                    </div>
                    <div className={styles.techItem}>
                      <span>CSS</span>
                    </div>
                    <div className={styles.techItem}>
                      <span>HTML</span>
                    </div>
                  </div>
                  <div className={styles.techColumn}>
                    <div className={styles.techItem}>
                      <span>ReactJS</span>
                    </div>
                    <div className={styles.techItem}>
                      <span>NextJS</span>
                    </div>
                    <div className={styles.techItem}>
                      <span>TailwindCSS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className={styles.imageContainer}>
              <img src="/images/me2.jpg" alt="Gilmer Perez" className={styles.profileImage} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default About;
