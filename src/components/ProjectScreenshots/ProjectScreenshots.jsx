"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import styles from "./ProjectScreenshots.module.css";

function ProjectScreenshots({ title, screenshots }) {
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
        setIsModalOpen(false);
        setSelectedScreenshot(null);
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
      <div className={styles.screenshotsGrid}>
        {screenshots.map((screenshot, index) => (
          <div
            key={screenshot}
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
              alt={`${title} screenshot ${index + 1}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
            />
          </div>
        ))}
      </div>

      {/* Modal overlay */}
      {isModalOpen && selectedScreenshot && (
        <div className={styles.modalOverlay} onClick={handleModalClose}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.imageWrapper}>
              <button className={styles.closeButton} onClick={handleModalClose} aria-label="Close modal">
                <i className="fa-solid fa-xmark"></i>
              </button>
              <Image
                fill
                sizes="95vw"
                quality={90}
                src={selectedScreenshot.src}
                className={styles.modalImage}
                alt={`${title} screenshot ${selectedScreenshot.index + 1}`}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectScreenshots;
