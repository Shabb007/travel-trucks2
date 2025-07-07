import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import "modern-normalize";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.hero}>
      <div className={styles.hero_wrapper}>
        <h1 className={styles.heroH1}>Campers of your dreams</h1>
        <p className={styles.heroText}>
          You can find everything you want in our catalog.
        </p>
        <button
          className={styles.heroButton}
          onClick={() => navigate("/catalog")}
        >
          View now
        </button>
      </div>
    </section>
  );
};

export default HomePage;
