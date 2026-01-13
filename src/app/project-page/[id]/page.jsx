"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import projectsData from "../../../data/projects.json";

export default function ProjectPage() {
  // * Get project ID from URL parameter
  const { id } = useParams();

  // * Find project data based on URL parameter (synchronous check)
  const project = projectsData.find((p) => p.id === parseInt(id));

  // * Trigger Next.js 404 if project doesn't exist
  if (!project) {
    notFound();
  }

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
    ].style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
  };

  // * Reset transform when mouse leaves screenshot
  const handleScreenshotMouseLeave = (index) => {
    if (screenshotRefs.current[index]) {
      screenshotRefs.current[index].style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
  };

  // * State for modal overlay
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);

  // * Handle project screenshot click to open modal
  const handleScreenshotClick = (screenshot, index) => {
    setIsModalOpen(true);
    setSelectedScreenshot({ src: screenshot, index });
  };

  // * Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedScreenshot(null);
  };

  // * Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isModalOpen) {
        handleModalClose();
      }
    };
    // Prevent background scrolling when modal is open
    if (isModalOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Remove event listener and reset body overflow
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <>
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
              <div className={styles.screenshotsGrid}>
                {project.screenshots.map((screenshot, index) => (
                  <div
                    key={index}
                    ref={(el) => (screenshotRefs.current[index] = el)}
                    onMouseLeave={() => handleScreenshotMouseLeave(index)}
                    onMouseMove={(e) => handleScreenshotMouseMove(e, index)}
                    onClick={() => handleScreenshotClick(screenshot, index)}
                    className={styles.screenshotContainer}
                  >
                    <Image
                      src={screenshot}
                      fill
                      className={styles.screenshot}
                      alt={`${project.title} screenshot ${index + 1}`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal overlay */}
      {isModalOpen && selectedScreenshot && (
        <div className={styles.modalOverlay} onClick={handleModalClose}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={handleModalClose} aria-label="Close modal">
              <i className="fa-solid fa-xmark"></i>
            </button>
            <Image
              src={selectedScreenshot.src}
              fill
              className={styles.modalImage}
              alt={`${project.title} screenshot ${selectedScreenshot.index + 1}`}
              sizes="95vw"
              quality={90}
            />
          </div>
        </div>
      )}
    </>
  );
}
