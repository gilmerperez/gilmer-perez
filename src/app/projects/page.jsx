import styles from "./page.module.css";
import projectsData from "../../data/projects.json";
import Project from "../../components/Project/Project";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export const metadata = {
  title: "Gilmer Perez | Projects",
  description:
    "Explore my portfolio of web development projects, showcasing modern technologies, responsive design, and innovative solutions for various industries.",
};

export default function Projects() {
  return (
    <>
      <Header />
      <main>
        <div className={styles.projectsContainer}>
          <section className={styles.headerSection}>
            {/* Title */}
            <h1 className={styles.projectsTitle}>PROJECTS</h1>
            {/* Description */}
            <p className={styles.projectsDescription}>
              Explore my portfolio of web development projects, showcasing modern technologies, responsive design, and
              innovative solutions for various industries.
            </p>
          </section>

          {/* Projects list */}
          <section className={styles.projectsList}>
            {projectsData.map((project, index) => (
              <Project
                id={project.id}
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
      <Footer />
    </>
  );
}
