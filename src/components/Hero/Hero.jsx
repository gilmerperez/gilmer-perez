import { Fragment } from "react";
import styles from "./Hero.module.css";

const STEPS = ["BUILD", "RANK", "TRACK", "ADVERTISE", "REPORT", "MAINTAIN"];

function Hero() {
  return (
    <section id="top" className={styles.hero}>
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
          Digital Growth
          <br />
          <span className={styles.titleAccent}>Specialist.</span>
        </h1>
        <div aria-hidden="true" className={styles.rule}></div>
        <p className={styles.body}>
          I cover the full path from <strong>website</strong> to <strong>customer</strong>. I build and host the site,
          make it <strong>rank in search</strong>, <strong>track</strong> what it does, and run <strong>paid ads</strong>{" "}
          that send it qualified traffic. One partner for the whole digital side of your business.
        </p>
        <div className={styles.buttons}>
          <a href="#how" className={styles.primaryButton}>
            My Process
          </a>
          <a href="#projects" className={styles.secondaryButton}>
            View Projects
          </a>
        </div>

        {/* BUILD · RANK · ... strip. Each word lights up in turn (see .step in the CSS). */}
        <p className={styles.steps}>
          {STEPS.map((step, i) => (
            <Fragment key={step}>
              <span className={styles.step} style={{ "--i": i }}>
                {step}
              </span>
              {i < STEPS.length - 1 && (
                <span aria-hidden="true" className={styles.dot}>
                  ·
                </span>
              )}
            </Fragment>
          ))}
        </p>
      </div>

      {/* Dithered sun over rolling hills. Three layers: the sun (slowly rises and sinks),
          a solid copy of the hills in the page color that hides the sun behind them,
          and the dotted hills on top. */}
      <div aria-hidden="true" className={styles.scene}>
        <div className={styles.sun}></div>
        <div className={styles.hillsSolid}></div>
        <div className={styles.hills}></div>
      </div>
    </section>
  );
}

export default Hero;
