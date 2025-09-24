import { useEffect, useState, useRef } from "react";
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

  // * Refs for screenshot containers to apply 3D tilt effect
  const screenshotRefs = useRef([]);

  // * Handle mouse move for 3D tilt effect on screenshots
  const handleScreenshotMouseMove = (e, index) => {
    if (!screenshotRefs.current[index]) return;
    // Get container dimensions
    const rect = screenshotRefs.current[index].getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Calculate mouse position
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    // Calculate rotation angles
    const rotateX = (mouseY / rect.height) * -20; // Tilt up/down
    const rotateY = (mouseX / rect.width) * 20; // Tilt left/right
    // Set transform
    screenshotRefs.current[
      index
    ].style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.10)`;
  };

  // * Reset transform when mouse leaves screenshot
  const handleScreenshotMouseLeave = (index) => {
    if (screenshotRefs.current[index]) {
      screenshotRefs.current[index].style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
  };

  // * Show loading or not found state if project is not found
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
                  <div
                    key={index}
                    className={styles.screenshotContainer}
                    ref={(el) => (screenshotRefs.current[index] = el)}
                    onMouseLeave={() => handleScreenshotMouseLeave(index)}
                    onMouseMove={(e) => handleScreenshotMouseMove(e, index)}
                  >
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
