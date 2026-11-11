import styles from "./SectionHeading.module.css";

// * Shared heading block for the numbered sections: eyebrow label, h2, optional intro paragraph
// `titleId` lets the parent <section> point aria-labelledby at the h2
function SectionHeading({ eyebrow, title, titleId, children }) {
  return (
    <div className={styles.heading}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      {children && <p className={styles.intro}>{children}</p>}
    </div>
  );
}

export default SectionHeading;
