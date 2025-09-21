import { useEffect } from "react";
import styles from "./Projects.module.css";
import projectsData from "../../data/projects.json";
import Project from "../../components/Project/Project";

function Projects() {
  // * Set page title
  useEffect(() => {
    document.title = "Gilmer Perez | Projects";
  }, []);

  return (
    <>
      <main>
        <div className={styles.projectsContainer}>
          <section className={styles.headerSection}>
            {/* Title */}
            <h1 className={styles.pageTitle}>PROJECTS</h1>
            {/* Description */}
            <p className={styles.pageDescription}>
              Explore my portfolio of web development projects, showcasing modern technologies, responsive design, and
              innovative solutions for various industries.
            </p>
          </section>

          {/* Projects list */}
          <section className={styles.projectsList}>
            {projectsData.map((project, index) => (
              <Project
                key={project.id}
                logo={project.logo}
                title={project.title}
                isReversed={index % 2 === 1}
                description={project.description}
                deployedLink={project.deployedLink}
              />
            ))}
          </section>
        </div>
      </main>
    </>
  );
}

export default Projects;
