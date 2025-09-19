import { useEffect } from "react";
import styles from "./PageNotFound.module.css";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  // * Set page title
  useEffect(() => {
    document.title = "Gilmer Perez | Page Not Found";
  }, []);

  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <>
      <main>
        <div className={styles.pageNotFoundContainer}>
          {/* Title */}
          <h1 className={styles.title}>PAGE NOT FOUND</h1>
          {/* Description */}
          <p className={styles.description}>Sorry, the page you are looking for does not exist</p>
          {/* Back button */}
          <button className={styles.backButton} onClick={handleBackToHome}>
            BACK TO HOME PAGE
          </button>
        </div>
      </main>
    </>
  );
}

export default PageNotFound;
