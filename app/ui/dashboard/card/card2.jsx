import React from "react";
import styles from "./card.module.css";
import { MdSupervisedUserCircle } from "react-icons/md";

const Card2 = () => {
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>Average Score - Employees</span>
        <span className={styles.number}>82.3</span>
        <span className={styles.detail}>
          <span className={styles.positive}>plus 1.7</span> Points
        </span>
      </div>
    </div>
  );
};

export default Card2;
