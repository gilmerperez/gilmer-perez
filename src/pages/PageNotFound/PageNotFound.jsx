import { useEffect } from "react";
import styles from "./PageNotFound.module.css";

function PageNotFound() {
  // * Set page title
  useEffect(() => {
    document.title = "Gilmer Perez | Page Not Found";
  }, []);

  return (
    <>
      <main>
        <div className={styles.pageNotFoundContainer}>page not found</div>
      </main>
    </>
  );
}

export default PageNotFound;
