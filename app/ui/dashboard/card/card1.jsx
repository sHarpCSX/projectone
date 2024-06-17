import React from "react";
import styles from "./card.module.css";
import { MdSupervisedUserCircle } from "react-icons/md";

const Card1 = () => {
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>Total Ratings</span>
        <span className={styles.number}>231</span>
        <span className={styles.detail}>
          <span className={styles.positive}>7.2%</span> more than previous week
        </span>
      </div>
    </div>
  );
};

export default Card1;
