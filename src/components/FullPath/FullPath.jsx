import styles from "./FullPath.module.css";
import fullPathData from "../../data/fullPath.json";

function FullPath() {
  return (
    <>
      <ol className={styles.pathGrid}>
        {fullPathData.map((step, index) => (
          <li key={step.id} className={styles.pathCard}>
            {/* Step number and icon */}
            <div className={styles.cardTop}>
              <span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
              <i className={`${step.icon} ${styles.cardIcon}`} aria-hidden="true"></i>
            </div>
            {/* Step title */}
            <h3 className={styles.cardTitle}>{step.title}</h3>
            {/* Step description */}
            <p className={styles.cardDescription}>{step.description}</p>
            {/* Tools used in this step */}
            <ul className={styles.toolList}>
              {step.tools.map((tool) => (
                <li key={tool} className={styles.toolItem}>
                  {tool}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </>
  );
}

export default FullPath;
