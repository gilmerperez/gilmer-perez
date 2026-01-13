"use client";
import styles from "./not-found.module.css";
import { useRouter } from "next/navigation";

export default function NotFound() {
  // * Handle back to home page
  const router = useRouter();
  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <>
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
    </>
  );
}
