import { useEffect } from "react";
import styles from "./IndividualProject.module.css";

function IndividualProject() {
  // * Set page title
  useEffect(() => {
    document.title = "Gilmer Perez | Project Name";
  }, []);

  return (
    <>
      <main>
        <div className={styles.individualProjectContainer}>individual project</div>
      </main>
    </>
  );
}

export default IndividualProject;
