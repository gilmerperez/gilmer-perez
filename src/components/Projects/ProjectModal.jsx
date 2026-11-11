"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./Projects.module.css";
import { pad, splitEntry, describeScreenshot } from "./projectHelpers";

// The screenshot viewer is about 60% of the 1120px modal on desktop and full width on small screens
const SHOT_SIZES = "(max-width: 860px) 100vw, 680px";

const DETAIL_TABS = [
  { id: "features", label: "Key Features" },
  { id: "stack", label: "Built With" },
];

// * Contents of one project. Keyed by project in the parent, so the screenshot and
// tab selection reset whenever PREV or NEXT changes the project.
function ModalContent({ project, position, total, titleId, onClose, onPrev, onNext }) {
  const [shotIndex, setShotIndex] = useState(0);
  const [detailTab, setDetailTab] = useState("features");

  const shots = project.screenshots.map((src) => describeScreenshot(src, project.title));
  const shot = shots[shotIndex];
  const features = project.keyFeatures.map(splitEntry);
  const stack = project.technologyStack.map(splitEntry);

  return (
    <>
      {/* Sticky header */}
      <div className={styles.modalHeader}>
        <div className={styles.modalHeading}>
          <span className={styles.modalKind}>
            {project.kind} / {pad(position + 1)} OF {pad(total)}
          </span>
          <h3 id={titleId} className={styles.modalTitle}>
            {project.title}
          </h3>
        </div>
        <button type="button" onClick={onClose} className={styles.closeButton} aria-label="Close project details">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div className={styles.modalBody}>
        {/* Left: screenshot viewer and description */}
        <div className={styles.modalMain}>
          <div className={styles.viewer}>
            <Image key={shot.src} src={shot.src} alt={shot.alt} fill sizes={SHOT_SIZES} className={styles.screenshot} />
          </div>
          <div role="group" aria-label="Screenshots" className={styles.toggleRow}>
            {shots.map((s, i) => (
              <button
                key={s.src}
                type="button"
                aria-pressed={i === shotIndex}
                onClick={() => setShotIndex(i)}
                className={i === shotIndex ? `${styles.shotButton} ${styles.toggleActive}` : styles.shotButton}
              >
                {s.label}
              </button>
            ))}
          </div>
          <p className={styles.description}>{project.description}</p>
        </div>

        {/* Right: key features and tech stack */}
        <div className={styles.modalSide}>
          <div role="group" aria-label="Project details" className={styles.detailTabs}>
            {DETAIL_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                aria-pressed={tab.id === detailTab}
                onClick={() => setDetailTab(tab.id)}
                className={tab.id === detailTab ? `${styles.detailTab} ${styles.toggleActive}` : styles.detailTab}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {detailTab === "features" ? (
            <ol className={styles.features}>
              {features.map((feature, i) => (
                <li key={feature.name} className={styles.feature}>
                  <span aria-hidden="true" className={styles.featureNum}>
                    {pad(i + 1)}
                  </span>
                  <span className={styles.featureText}>
                    <span className={styles.featureName}>{feature.name}</span>
                    <span className={styles.featureBody}>{feature.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <dl className={styles.stack}>
              {stack.map((item, i) => (
                <div key={`${item.name}-${i}`} className={styles.stackRow}>
                  <dt className={styles.stackName}>{item.name}</dt>
                  <dd className={styles.stackText}>{item.text}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>

      {/* Sticky footer */}
      <div className={styles.modalFooter}>
        <button type="button" onClick={onPrev} className={styles.navButton}>
          Previous
        </button>
        <a href={project.deployedLink} target="_blank" rel="noopener noreferrer" className={styles.visitButton}>
          Visit Website
        </a>
        <button type="button" onClick={onNext} className={styles.navButton}>
          Next
        </button>
      </div>
    </>
  );
}

// * Native <dialog> opened with showModal(): focus trapping, Escape to close, and an
// inert background come from the browser. Backdrop clicks and scroll locking are added here.
function ProjectModal({ projects, openIndex, onClose, onNavigate }) {
  const dialogRef = useRef(null);
  const isOpen = openIndex !== null;

  // Open or close the dialog to match state, and lock page scroll while it is open
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
    if (!isOpen) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Clicks on the ::backdrop are reported on the dialog itself, outside its box
  const handleClick = (e) => {
    const dialog = dialogRef.current;
    if (e.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!inside) dialog.close();
  };

  const total = projects.length;

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="project-modal-title"
      onClose={onClose}
      onClick={handleClick}
    >
      {isOpen && (
        <ModalContent
          key={openIndex}
          project={projects[openIndex]}
          position={openIndex}
          total={total}
          titleId="project-modal-title"
          onClose={() => dialogRef.current?.close()}
          onPrev={() => onNavigate((openIndex + total - 1) % total)}
          onNext={() => onNavigate((openIndex + 1) % total)}
        />
      )}
    </dialog>
  );
}

export default ProjectModal;
