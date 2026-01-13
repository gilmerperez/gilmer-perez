"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useRef } from "react";
import Technologies from "../../components/Technologies/Technologies";

export default function About() {
  // * State for profile picture images
  const imageRef = useRef(null);
  const [currentImage, setCurrentImage] = useState("/images/gilmer-perez-1.jpg");

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
    imageRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1)`;
  };

  // * Reset transform when mouse leaves
  const handleMouseLeave = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
  };

  // * Handle image click to switch images
  const handleImageClick = () => {
    setCurrentImage((prev) =>
      prev === "/images/gilmer-perez-1.jpg" ? "/images/gilmer-perez-2.jpg" : "/images/gilmer-perez-1.jpg"
    );
  };

  return (
    <main>
      <div className={styles.aboutContainer}>
        {/* About me */}
        <section className={styles.aboutSection}>
          {/* Title */}
          <h1 className={styles.aboutTitle}>ABOUT ME</h1>
          {/* Description */}
          <div className={styles.aboutDescription}>
            <p>
              I&apos;m Gilmer Perez, a <strong>FRONT-END DEVELOPER AND UI/UX ENTHUSIAST</strong> crafting intuitive,
              user-friendly experiences. My days consist of many cups of coffee and long hours on the computer trying to
              master anything and everything that I put my mind to.
            </p>
            <p>
              People who know me would describe me as an <strong>OBSESSED PERFECTIONIST</strong>, since I am a very
              driven person and love learning new things that make me think critically and challenge me daily, but that
              is fine since I am very driven to always be proud of my work. I&apos;m skilled in crafting responsive,
              pixel-perfect, stunning interfaces with a focus on delivering seamless user experiences.
            </p>
            <p>
              I&apos;m extending my skills to <strong>BUILD SOLUTIONS THAT INSPIRE AND CONNECT PEOPLE</strong>. Versed
              in integrating dynamic content through RESTful APIs and optimizing applications for performance and
              scalability. Proficient in Back-End technologies, including Node.js, Express, and database management with
              both PERN and MERN stacks, ensuring a comprehensive understanding of Full-Stack Development.
            </p>
          </div>
        </section>

        {/* Image */}
        <section className={styles.imageSection}>
          <div
            ref={imageRef}
            onClick={handleImageClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={styles.profileImageWrapper}
          >
            <Image
              src={currentImage}
              alt="Gilmer Perez"
              fill
              className={styles.profileImage}
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>
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
  );
}
