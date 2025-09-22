import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./IndividualProject.module.css";
import projectsData from "../../data/projects.json";

function IndividualProject() {
  // * Get project ID from URL parameter
  const { id } = useParams();
  const [project, setProject] = useState(null);

  // * Find project data based on URL parameter
  useEffect(() => {
    const foundProject = projectsData.find((p) => p.id === parseInt(id));
    setProject(foundProject);

    // * Set page title
    if (foundProject) {
      document.title = `Gilmer Perez | ${foundProject.title}`;
    } else {
      document.title = "Gilmer Perez | Project Not Found";
    }
  }, [id]);

  // * Show loading or not found state
  if (!project) {
    return (
      <>
        <main>
          <div className={styles.individualProjectContainer}>
            <h1>PROJECT NOT FOUND</h1>
            <p>The project you're looking for doesn't exist.</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main>
        <div className={styles.individualProjectContainer}>
          <h1>{project.title}</h1>
        </div>
      </main>
    </>
  );
}

export default IndividualProject;
