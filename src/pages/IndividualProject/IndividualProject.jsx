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
            <h1 className={styles.projectNotFoundTitle}>PROJECT NOT FOUND</h1>
            <p className={styles.projectNotFoundDescription}>The project you're looking for doesn't exist.</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main>
        <div className={styles.individualProjectContainer}>
          {/* Project header */}
          <div className={styles.projectHeader}>
            <h1 className={styles.projectTitle}>{project.title}</h1>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={project.deployedLink}
              className={styles.projectLink}
              aria-label={`Visit ${project.title} website`}
            >
              <i className="fa-solid fa-link"></i>
            </a>
          </div>

          {/* Project description */}
          <div className={styles.projectDescription}>
            <p>{project.description}</p>
          </div>

          {/* Key features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className={styles.keyFeatures}>
              <h2 className={styles.sectionTitle}>KEY FEATURES</h2>
              <ol className={styles.featuresList}>
                {project.keyFeatures.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
                    {feature}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Technology stack */}
          {project.technologyStack && project.technologyStack.length > 0 && (
            <div className={styles.technologyStack}>
              <h2 className={styles.sectionTitle}>TECHNOLOGY STACK</h2>
              <ul className={styles.techList}>
                {project.technologyStack.map((tech, index) => (
                  <li key={index} className={styles.techItem}>
                    <i className="fa-solid fa-asterisk"></i>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Project screenshots */}
          {project.screenshots && project.screenshots.length > 0 && (
            <div className={styles.projectScreenshots}>
              <h2 className={styles.sectionTitle}>PROJECT SCREENSHOTS</h2>
              <div className={styles.screenshotsGrid}>
                {project.screenshots.map((screenshot, index) => (
                  <div key={index} className={styles.screenshotContainer}>
                    <img
                      src={screenshot}
                      className={styles.screenshot}
                      alt={`${project.title} screenshot ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default IndividualProject;
