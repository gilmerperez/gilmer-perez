import styles from "./CoreSkills.module.css";
import coreSkillsData from "../../data/coreSkills.json";

function CoreSkills() {
  return (
    <>
      <ul className={styles.skillsGrid}>
        {coreSkillsData.map((group) => (
          <li key={group.id} className={styles.skillCard}>
            {/* Group icon and title */}
            <div className={styles.cardHeader}>
              <i className={`${group.icon} ${styles.cardIcon}`} aria-hidden="true"></i>
              <h3 className={styles.cardTitle}>{group.title}</h3>
            </div>
            {/* Skills in this group */}
            <ul className={styles.skillList}>
              {group.skills.map((skill) => (
                <li key={skill.name} className={styles.skillItem}>
                  <i className={`fa-solid fa-asterisk ${styles.skillMarker}`} aria-hidden="true"></i>
                  <span>
                    <span className={styles.skillName}>{skill.name}</span>
                    {skill.detail && <span className={styles.skillDetail}> ({skill.detail})</span>}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}

export default CoreSkills;
