"use client";

import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function PageNotFound() {
  // * Handle back to home page
  const router = useRouter();
  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <>
      <Header />
      <main>
        <div className={styles.pageNotFoundContainer}>
          {/* Title */}
          <h1 className={styles.pageNotFoundTitle}>PAGE NOT FOUND</h1>
          {/* Description */}
          <p className={styles.pageNotFoundDescription}>Sorry, the page you are looking for does not exist</p>
          {/* Back button */}
          <button className={styles.backButton} onClick={handleBackToHome}>
            BACK TO HOME PAGE
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
