import styles from "./page.module.css";
import { notFound } from "next/navigation";
import projectsData from "../../../data/projects.json";
import StructuredData from "../../../components/StructuredData/StructuredData";
import ProjectScreenshots from "../../../components/ProjectScreenshots/ProjectScreenshots";

const BASE_URL = "https://gilmer-perez.vercel.app";

// * Pre-render every project at build time; unknown ids fall through to the 404 page
export const dynamicParams = false;

export function generateStaticParams() {
  return projectsData.map((project) => ({ id: String(project.id) }));
}

export default async function ProjectPage({ params }) {
  // * Get project ID from URL parameter
  const { id } = await params;

  // * Find project data based on URL parameter
  const project = projectsData.find((p) => p.id === parseInt(id));

  // * Trigger Next.js 404 if project doesn't exist
  if (!project) {
    notFound();
  }

  // JSON-LD Structured Data for Project Page
  const creativeWorkStructuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${BASE_URL}/project-page/${id}`,
    creator: {
      "@type": "Person",
      name: "Gilmer Perez",
      jobTitle: "Digital Growth Specialist",
    },
    ...(project.deployedLink && {
      mainEntity: {
        "@type": "WebApplication",
        name: project.title,
        url: project.deployedLink,
      },
    }),
    ...(project.screenshots && project.screenshots.length > 0 && {
      image: project.screenshots.map((screenshot) => `${BASE_URL}${screenshot}`),
    }),
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${BASE_URL}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${BASE_URL}/project-page/${id}`,
      },
    ],
  };

  return (
    <>
      <StructuredData data={creativeWorkStructuredData} />
      <StructuredData data={breadcrumbStructuredData} />
      <main>
        <div className={styles.projectPageContainer}>
          {/* Project header */}
          <div className={styles.projectHeader}>
            {/* Project title */}
            <h1 className={styles.projectTitle}>{project.title}</h1>
            {/* Project link */}
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
                    <i className="fa-solid fa-key"></i>
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
              <ProjectScreenshots title={project.title} screenshots={project.screenshots} />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
