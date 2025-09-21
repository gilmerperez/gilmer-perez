import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Project.module.css";

function Project({ logo, title, description, hoverImage, isReversed = false }) {
  // * State for hover effect
  const [isHovered, setIsHovered] = useState(false);
  // * State for mobile detection
  const [isMobile, setIsMobile] = useState(false);

  // * Check if screen is mobile size (480px or smaller)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // * Determine which image to show based on screen size and hover state
  const getImageSrc = () => {
    if (isMobile) {
      // On mobile: show logo by default, hoverImage on hover
      return isHovered ? hoverImage : logo;
    } else {
      // On large screens: show hoverImage by default, logo on hover
      return isHovered ? logo : hoverImage;
    }
  };

  return (
    <>
      {/* Project container */}
      <section className={`${styles.projectContainer} ${isReversed ? styles.reversed : ""}`}>
        {/* Image content */}
        <div className={styles.imageContainer}>
          <div
            className={styles.imageWrapper}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Project image - responsive based on screen size */}
            <img src={getImageSrc()} alt={title} className={styles.projectImage} />
            <div className={styles.gradientOverlay}></div>
          </div>
        </div>

        {/* Project content */}
        <div className={styles.contentContainer}>
          {/* Project title */}
          <h2 className={styles.projectTitle}>{title}</h2>
          {/* Project description */}
          <p className={styles.projectDescription}>{description}</p>
          {/* View project button */}
          <Link to="/" className={styles.viewButton}>
            View all
          </Link>
        </div>
      </section>
    </>
  );
}

export default Project;
