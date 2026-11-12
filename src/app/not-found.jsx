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
          <h1 className={styles.pageNotFoundTitle}>Page Not Found</h1>
          {/* Description */}
          <p className={styles.pageNotFoundDescription}>Sorry, the page you are looking for does not exist</p>
          {/* Back button */}
          <button type="button" className="btn btn-primary" onClick={handleBackToHome}>
            Back to the Home Page
          </button>
        </div>
      </main>
    </>
  );
}
