import styles from "./page.module.css";
import projectsData from "../../data/projects.json";
import Project from "../../components/Project/Project";
import StructuredData from "../../components/StructuredData/StructuredData";

const BASE_URL = "https://gilmer-perez.vercel.app";

export const metadata = {
  title: "Projects",
  description:
    "Websites built to rank and convert: local business sites with technical SEO, schema markup, analytics, and fast mobile performance, plus a personal project.",
  alternates: {
    canonical: `${BASE_URL}/projects`,
  },
};

export default function Projects() {
  // JSON-LD Structured Data for Projects Page
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
    ],
  };

  const collectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Gilmer Perez - Projects",
    description:
      "A collection of websites built to rank and convert, with technical SEO, schema markup, analytics, and fast mobile performance.",
    url: `${BASE_URL}/projects`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projectsData.length,
      itemListElement: projectsData.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: `${BASE_URL}/project-page/${project.id}`,
        },
      })),
    },
  };

  return (
    <>
      <StructuredData data={breadcrumbStructuredData} />
      <StructuredData data={collectionStructuredData} />
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
    </>
  );
}
