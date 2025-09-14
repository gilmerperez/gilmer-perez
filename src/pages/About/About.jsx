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
        <div className={styles.aboutContainer}>about</div>
      </main>
    </>
  );
}

export default About;
