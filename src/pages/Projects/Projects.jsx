import { useEffect } from "react";
import styles from "./Projects.module.css";

function Projects() {
  // * Set page title
  useEffect(() => {
    document.title = "Gilmer Perez | Projects";
  }, []);

  return (
    <>
      <main>
        <div className={styles.projectsContainer}>projects</div>
      </main>
    </>
  );
}

export default Projects;
