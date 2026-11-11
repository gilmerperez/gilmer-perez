"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./Experience.module.css";

const PHOTOS = [
  { src: "/images/gilmer-perez-1.jpg", alt: "Gilmer Perez standing at an overlook with the Hollywood Hills behind him" },
  { src: "/images/gilmer-perez-2.jpg", alt: "Gilmer Perez on a trail below the Hollywood sign" },
];

// The photo column is about 40% of the 1200px content width on desktop and full width below 860px
const PHOTO_SIZES = "(max-width: 860px) calc(100vw - 48px), 460px";

// * Both photos sit stacked in one frame. Clicking crossfades to the other one.
function PhotoSwitcher() {
  const [current, setCurrent] = useState(0);

  return (
    <button
      type="button"
      className={styles.photoButton}
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
