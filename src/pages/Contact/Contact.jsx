import { useEffect } from "react";
import styles from "./Contact.module.css";

function Contact() {
  // * Set page title
  useEffect(() => {
    document.title = "Gilmer Perez | Contact";
  }, []);

  return (
    <>
      <main>
        <div className={styles.contactContainer}>contact</div>
      </main>
    </>
  );
}

export default Contact;
