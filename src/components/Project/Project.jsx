import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import styles from "./Project.module.css";

function Project({ logo, title, description, deployedLink, isReversed = false }) {
  // * State for hover effect
  const [isHovered, setIsHovered] = useState(false);

  // * Handle mouse enter
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // * Reset transform when mouse leaves
  const handleMouseLeave = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
    setIsHovered(false);
  };

  // * Ref for image element
  const imageRef = useRef(null);

  // * Handle mouse move for 3D tilt effect
  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    // Get image dimensions
    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Calculate mouse position
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    // Calculate rotation angles
    const rotateX = (mouseY / rect.height) * -20; // Tilt up/down
    const rotateY = (mouseX / rect.width) * 20; // Tilt left/right
    // Set transform
    imageRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  return (
    <>
      {/* Project container */}
      <div className={`${styles.projectContainer} ${isReversed ? styles.reversed : ""}`}>
        {/* Image content */}
        <div className={styles.imageContainer}>
          <div
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={styles.imageWrapper}
          >
            {/* Project image */}
            <img src={logo} ref={imageRef} className={styles.projectImage} alt={title} />
            <div className={`${styles.gradientOverlay} ${isHovered ? styles.gradientHidden : ""}`}></div>
          </div>
        </div>

        {/* Project content */}
        <div className={styles.contentContainer}>
          {/* Project title */}
          <h2 className={styles.projectTitle}>{title}</h2>
          {/* Project description */}
          <p className={styles.projectDescription}>{description}</p>
          {/* Button container */}
          <div className={styles.buttonContainer}>
            {/* View project button */}
            <Link to="/" className={styles.viewButton}>
              VIEW PROJECT
            </Link>
            {/* Visit website button */}
            <a href={deployedLink} target="_blank" rel="noopener noreferrer" className={styles.visitButton}>
              VISIT WEBSITE
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Project;
