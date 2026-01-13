"use client";

import { useState, useEffect } from "react";
import styles from "./Technologies.module.css";
import technologiesData from "../../data/technologies.json";

function Technologies() {
  // * State for selected category
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("frontend");

  // * Handle category selection
  const handleCategorySelect = (category) => {
    setIsDropdownOpen(false);
    setSelectedCategory(category);
  };

  // * Map category keys to display names
  const categoryMap = {
    frontend: "FRONT-END",
    backend: "BACK-END",
    databases: "DATABASES",
    tools: "TOOLS",
  };

  // * Get current technologies based on selected category
  const currentTechnologies = technologiesData.technologies[selectedCategory] || [];

  // * Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.dropdownContainer}`)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <section className={styles.technologiesContainer}>
        {/* Dropdown container */}
        <div className={styles.dropdownContainer}>
          <button className={styles.dropdownButton} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {/* Category name */}
            <span>{categoryMap[selectedCategory]}</span>
            {/* Arrow icon */}
            <span className={`${styles.dropdownArrow} ${isDropdownOpen ? styles.arrowUp : styles.arrowDown}`}>
              <i className="fa-solid fa-angle-up"></i>
            </span>
          </button>
          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              {Object.entries(categoryMap).map(([key, displayName]) => (
                <button
                  key={key}
                  onClick={() => handleCategorySelect(key)}
                  className={`${styles.dropdownItem} ${selectedCategory === key ? styles.selected : ""}`}
                >
                  {displayName}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Technologies display */}
        <div className={styles.technologiesDisplay}>
          {currentTechnologies.map((tech, index) => (
            <div key={index} className={styles.techCapsule}>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Technologies;
