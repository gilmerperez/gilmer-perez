import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Project.module.css";

function Project({ logo, title, description, hoverImage, isReversed = false }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`${styles.projectContainer} ${isReversed ? styles.reversed : ""}`}>
      <div className={styles.imageContainer}>
        <div
          className={styles.imageWrapper}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img src={isHovered ? hoverImage : logo} alt={title} className={styles.projectImage} />
          <div className={styles.gradientOverlay}></div>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <h2 className={styles.projectTitle}>{title}</h2>
        <p className={styles.projectDescription}>{description}</p>
        <Link to="/" className={styles.viewButton}>
          View all
        </Link>
      </div>
    </div>
  );
}

export default Project;
