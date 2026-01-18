import projectsData from "../../../data/projects.json";

const BASE_URL = "https://gilmer-perez.vercel.app";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === parseInt(id));

  if (!project) {
    return {
      title: "Project Not Found | Gilmer Perez",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.title} | Gilmer Perez`,
    description: project.description,
    alternates: {
      canonical: `${BASE_URL}/project-page/${id}`,
    },
    openGraph: {
      title: `${project.title} | Gilmer Perez`,
      description: project.description,
      url: `${BASE_URL}/project-page/${id}`,
      type: "website",
      images: project.screenshots && project.screenshots.length > 0
        ? [
            {
              url: `${BASE_URL}${project.screenshots[0]}`,
              width: 1200,
              height: 630,
              alt: `${project.title} screenshot`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Gilmer Perez`,
      description: project.description,
      images: project.screenshots && project.screenshots.length > 0 ? [`${BASE_URL}${project.screenshots[0]}`] : [],
    },
  };
}

export default function ProjectLayout({ children }) {
  return children;
}
