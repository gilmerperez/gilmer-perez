import { useEffect } from "react";
import styles from "./Home.module.css";

function Home() {
  // * Set page title
  useEffect(() => {
    document.title = "Gilmer Perez | Home";
  }, []);

  return (
    <>
      <main>
        <div className={styles.homeContainer}>home</div>
      </main>
    </>
  );
}

export default Home;
