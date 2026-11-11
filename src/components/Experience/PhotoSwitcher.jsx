"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./Experience.module.css";

// Wide overlook shot first. `position` keeps Gilmer in frame when the photo is cropped to a portrait shape on wide screens.
const PHOTOS = [
  {
    src: "/images/gilmer-perez-1.jpg",
    alt: "Gilmer Perez standing at an overlook with the Hollywood Hills behind him",
    position: "57% 50%",
  },
  { src: "/images/gilmer-perez-2.jpg", alt: "Gilmer Perez on a trail below the Hollywood sign", position: "66% 50%" },
];

// Full width below 1024px, about 40% of the 1200px content width above it
const PHOTO_SIZES = "(max-width: 1024px) calc(100vw - 48px), 480px";

// Strongest tilt in degrees when the pointer is at an edge
const MAX_TILT = 10;

// * Both photos sit stacked in one frame. Clicking crossfades to the other one.
// * On devices with a mouse, the frame tilts toward the pointer as if you were leaning on it.
function PhotoSwitcher() {
  const [current, setCurrent] = useState(0);
  const frameRef = useRef(null);

  // Tilt only with a real hover-capable pointer, and never when reduced motion is requested
  const canTilt = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handlePointerMove = (event) => {
    const frame = frameRef.current;
    if (!frame || event.pointerType !== "mouse" || !canTilt()) return;
    const rect = frame.getBoundingClientRect();
    // Pointer position from the center of the frame, from -0.5 to 0.5 on each axis
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    // The side under the pointer presses away from the viewer
    const rotateX = y * -2 * MAX_TILT;
    const rotateY = x * 2 * MAX_TILT;
    frame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handlePointerLeave = () => {
    if (frameRef.current) frameRef.current.style.transform = "";
  };

  return (
    <button
      ref={frameRef}
      type="button"
      className={styles.photoButton}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={() => setCurrent((i) => (i + 1) % PHOTOS.length)}
      aria-label={`0${current + 1} OF 0${PHOTOS.length} / CLICK TO SWITCH, shows the other photo of Gilmer`}
    >
      {PHOTOS.map((photo, i) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={PHOTO_SIZES}
          style={{ objectPosition: photo.position }}
          className={`${styles.photo} ${i === current ? styles.photoVisible : styles.photoHidden}`}
        />
      ))}
      <span className={styles.photoCaption}>
        0{current + 1} OF 0{PHOTOS.length} / CLICK TO SWITCH
      </span>
    </button>
  );
}

export default PhotoSwitcher;
