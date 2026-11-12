import Image from "next/image";
import styles from "./Projects.module.css";

// Cards sit in an auto-fit grid with a 260px minimum, so they are never wider than about 560px
const LOGO_SIZES = "(max-width: 600px) calc(100vw - 48px), 300px";

// * Two buttons: Learn More opens the project modal, Visit opens the live site.
// A click anywhere else on the card also opens the modal (keyboard users use the
// Learn More button, so the card itself is not a tab stop).
function ProjectCard({ project, onOpen, buttonRef }) {
  const handleCardClick = (event) => {
    // The buttons handle their own clicks
    if (event.target.closest("a, button")) return;
    onOpen();
  };

  return (
    <article className={styles.card} onClick={handleCardClick}>
      {/* Logo tile. The logos have solid backgrounds, so the tile matches them. */}
      <span className={styles.logoTile} style={{ background: project.logoBg }}>
        <Image src={project.logo} alt={`${project.title} logo`} fill sizes={LOGO_SIZES} className={styles.logo} />
      </span>
      <div className={styles.cardBody}>
        <span className={styles.cardKind}>{project.kind}</span>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardSummary}>{project.summary}</p>
        <div className={styles.cardButtons}>
          <button
            ref={buttonRef}
            type="button"
            onClick={onOpen}
            aria-label={`Learn more about ${project.title}`}
            className="btn btn-primary btn-small"
          >
            Learn More
          </button>
          <a
            href={project.deployedLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit the ${project.title} website (opens in a new tab)`}
            className="btn btn-secondary btn-small"
          >
            Visit
          </a>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
