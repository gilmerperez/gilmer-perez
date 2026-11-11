"use client";
import { useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import styles from "./Projects.module.css";
import projects from "../../data/projects.json";
import SectionHeading from "../SectionHeading/SectionHeading";

function Projects() {
  const [openIndex, setOpenIndex] = useState(null);
  const cardRefs = useRef([]);
  // Index of the card that opened the modal, so focus can go back to it
  const openerRef = useRef(null);

  const openProject = (i) => {
    openerRef.current = i;
    setOpenIndex(i);
  };

  const closeProject = () => {
    setOpenIndex(null);
    cardRefs.current[openerRef.current]?.focus();
  };

  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-title">
      <SectionHeading eyebrow="06 / PROJECTS" title="CUSTOM CODE IS STILL MY FAVORITE PART" titleId="projects-title">
        Front-end development and UI/UX design is where I started and what I enjoy most. Every site below is custom
        built, responsive, and structured for search. Click one to look inside.
      </SectionHeading>

      <div className={styles.grid}>
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={() => openProject(i)}
            buttonRef={(el) => {
              cardRefs.current[i] = el;
            }}
          />
        ))}
      </div>

      <ProjectModal projects={projects} openIndex={openIndex} onClose={closeProject} onNavigate={setOpenIndex} />
    </section>
  );
}

export default Projects;
