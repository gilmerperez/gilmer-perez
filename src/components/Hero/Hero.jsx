import { Fragment } from "react";
import styles from "./Hero.module.css";

const STEPS = ["BUILD", "RANK", "TRACK", "ADVERTISE", "REPORT", "MAINTAIN"];

function Hero() {
  return (
    <section id="top" className={styles.hero}>
      {/* Blurred blue haze behind the heading */}
      <div aria-hidden="true" className={styles.haze}></div>

      {/* The wrapper shrinks to the heading's width. The paragraphs are given
          width: 0 so they add nothing to that measurement, then stretch with
          min-width: the intro to exactly the heading width, the body to the
          heading width plus 72px (capped at 88vw). */}
      <div className={styles.content}>
        <p className={styles.intro}>
          Hi, my name is <strong>Gilmer Perez</strong>. I build the parts of the internet you actually enjoy using,
          then I make sure people find them.
        </p>
        <h1 className={styles.title}>
          DIGITAL GROWTH
          <br />
          SPECIALIST.
        </h1>
        <div aria-hidden="true" className={styles.bar}></div>
        <p className={styles.body}>
          I cover the full path from <strong>WEBSITE</strong> to <strong>CUSTOMER</strong>. I build and host the site,
          make it <strong>RANK IN SEARCH</strong>, <strong>TRACK</strong> what it does, and run{" "}
          <strong>PAID ADS</strong> that send it qualified traffic. One partner for the whole digital side of your
          business.
        </p>
        <div className={styles.buttons}>
          <a href="#how" className={styles.primaryButton}>
            SEE THE PROCESS
          </a>
          <a href="#projects" className={styles.secondaryButton}>
            VIEW PROJECTS
          </a>
        </div>
      </div>

      {/* BUILD > RANK > ... strip */}
      <div className={styles.steps}>
        {STEPS.map((step, i) => (
          <Fragment key={step}>
            <span>{step}</span>
            {i < STEPS.length - 1 && (
              <span aria-hidden="true" className={styles.arrow}>
                &gt;
              </span>
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}

export default Hero;
