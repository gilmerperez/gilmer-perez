import Image from "next/image";
import styles from "./Projects.module.css";

// Cards sit in an auto-fit grid with a 260px minimum, so they are never wider than about 560px
const LOGO_SIZES = "(max-width: 600px) calc(100vw - 48px), 300px";

// * The whole card is one button. Clicking anywhere on it opens the project modal.
function ProjectCard({ project, onOpen, buttonRef }) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onOpen}
      className={styles.card}
    >
      {/* Logo tile. The logos have solid backgrounds, so the tile matches them. */}
      <span className={styles.logoTile} style={{ background: project.logoBg }}>
        <Image src={project.logo} alt={`${project.title} logo`} fill sizes={LOGO_SIZES} className={styles.logo} />
      </span>
      <span className={styles.cardBody}>
        <span className={styles.cardKind}>{project.kind}</span>
        <span className={styles.cardTitle}>{project.title}</span>
        <span className={styles.cardSummary}>{project.summary}</span>
        <span className={styles.cardMore}>Look inside +</span>
      </span>
    </button>
  );
}

export default ProjectCard;
