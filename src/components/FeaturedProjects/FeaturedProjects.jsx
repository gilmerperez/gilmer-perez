import Link from "next/link";
import Image from "next/image";
import styles from "./FeaturedProjects.module.css";
import projectsData from "../../data/projects.json";

// * Showcase the client websites first, leaving the personal project to the projects page
const FEATURED_COUNT = 3;

function FeaturedProjects() {
  const featuredProjects = projectsData.slice(0, FEATURED_COUNT);

  return (
    <>
      <ul className={styles.featuredGrid}>
        {featuredProjects.map((project) => (
          <li key={project.id}>
            <Link href={`/project-page/${project.id}`} className={styles.featuredCard}>
              {/* Project image */}
              <div className={styles.imageWrapper}>
                <Image
                  fill
                  src={project.logo}
                  className={styles.projectImage}
                  alt={`${project.title} project preview`}
                  sizes="(max-width: 899px) 440px, 360px"
                />
              </div>
              {/* Project title */}
              <h3 className={styles.projectTitle}>{project.title}</h3>
              {/* Project summary */}
              <p className={styles.projectSummary}>{project.summary}</p>
              {/* Project tags */}
              <ul className={styles.tagList}>
                {project.tags.map((tag) => (
                  <li key={tag} className={styles.tagItem}>
                    {tag}
                  </li>
                ))}
              </ul>
              {/* View project cue */}
              <span className={styles.viewCue}>
                VIEW PROJECT <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default FeaturedProjects;
