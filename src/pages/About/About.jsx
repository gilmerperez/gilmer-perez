import styles from "./About.module.css";
import { useEffect, useState, useRef } from "react";
import Technologies from "../../components/Technologies/Technologies";

function About() {
  // * Set page title
  useEffect(() => {
    document.title = "Gilmer Perez | About";
  }, []);

  // * State for profile picture images
  const imageRef = useRef(null);
  const [currentImage, setCurrentImage] = useState("/images/gilmer-perez-1.jpg");

  // * Handle image click to switch images
  const handleImageClick = () => {
    setCurrentImage((prev) =>
      prev === "/images/gilmer-perez-1.jpg" ? "/images/gilmer-perez-2.jpg" : "/images/gilmer-perez-1.jpg"
    );
  };

  // * Handle mouse move for 3D tilt effect
  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    // Get image dimensions
    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Calculate mouse position
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    // Calculate rotation angles
    const rotateX = (mouseY / rect.height) * -20; // Tilt up/down
    const rotateY = (mouseX / rect.width) * 20; // Tilt left/right
    // Set transform
    imageRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  // * Reset transform when mouse leaves
  const handleMouseLeave = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
  };

  return (
    <>
      <main>
        <div className={styles.aboutContainer}>
          {/* Text content */}
          <section className={styles.textContent}>
            {/* Title */}
            <h1 className={styles.title}>ABOUT ME</h1>
            {/* Description */}
            <div className={styles.description}>
              <p>
                I'm Gilmer, a <strong>Front-End Developer and UI/UX enthusiast</strong> crafting intuitive,
                user-friendly experiences. My days consist of many cups of coffee and long hours on the computer trying
                to master anything and everything that I put my mind to.
              </p>
              <p>
                People who know me would describe me as an <strong>obsessed perfectionist</strong>, since I am a very
                driven person and love learning new things that make me think critically and challenge me daily, but
                that is fine since I am very driven to always be proud of my work. I'm skilled in crafting responsive,
                pixel-perfect, stunning interfaces with a focus on delivering seamless user experiences.
              </p>
              <p>
                I'm extending my skills to <strong>build solutions that inspire and connect people</strong>. Versed in
                integrating dynamic content through RESTful APIs and optimizing applications for performance and
                scalability. Proficient in Back-End technologies, including Node.js, Express, and database management
                with both PERN and MERN stacks, ensuring a comprehensive understanding of Full-Stack Development.
              </p>
            </div>
          </section>

          {/* Image */}
          <section className={styles.imageContainer}>
            <img
              ref={imageRef}
              src={currentImage}
              alt="Gilmer Perez"
              onClick={handleImageClick}
              onMouseMove={handleMouseMove}
              className={styles.profileImage}
              onMouseLeave={handleMouseLeave}
            />
          </section>

          {/* Divider */}
          <div className={styles.divider}></div>

          {/* Technologies */}
          <section className={styles.technologiesSection}>
            <h2 className={styles.technologiesTitle}>TECHNOLOGIES</h2>
            {/* Technologies component */}
            <Technologies />
          </section>
        </div>
      </main>
    </>
  );
}

export default About;
