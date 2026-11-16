"use client";
import { useRef, useState } from "react";
import ProjectCarousel from "./ProjectCarousel";
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
      <SectionHeading eyebrow="07 / PROJECTS" title="Custom Code Is Still My Favorite Part" titleId="projects-title">
        Front-end development and UI/UX design is where I started and what I enjoy most. Every site below is custom
        built, responsive, and structured for search. Browse with the arrows or swipe, and open any project to look
        inside.
      </SectionHeading>

      <ProjectCarousel projects={projects} onOpen={openProject} cardRefs={cardRefs} modalOpen={openIndex !== null} />

      <ProjectModal projects={projects} openIndex={openIndex} onClose={closeProject} onNavigate={setOpenIndex} />
    </section>
  );
}

export default Projects;
