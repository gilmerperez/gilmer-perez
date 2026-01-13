import { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Project.module.css";

function Project({ isReversed = false, logo, title, description, id, deployedLink }) {
  // * Reset transform when mouse leaves
  const handleMouseLeave = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
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
    imageRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1)`;
  };

  return (
    <>
      <section className={`${styles.projectContainer} ${isReversed ? styles.reversed : ""}`}>
        {/* Image container */}
        <div className={styles.imageContainer}>
          <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={styles.imageWrapper}>
            {/* Project image */}
            <img src={logo} ref={imageRef} className={styles.projectImage} alt={title} />
          </div>
        </div>

        {/* Content container */}
        <div className={styles.contentContainer}>
          {/* Project title */}
          <h2 className={styles.projectTitle}>{title}</h2>
          {/* Project description */}
          <p className={styles.projectDescription}>{description}</p>
          {/* Button container */}
          <div className={styles.buttonContainer}>
            {/* View project button */}
            <Link to={`/projects/${id}`} className={styles.viewButton}>
              VIEW PROJECT
            </Link>
            {/* Visit website button */}
            <a href={deployedLink} target="_blank" rel="noopener noreferrer" className={styles.visitButton}>
              VISIT WEBSITE
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Project;
