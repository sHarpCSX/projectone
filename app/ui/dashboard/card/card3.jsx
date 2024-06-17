import React from "react";
import styles from "./card.module.css";
import { MdSupervisedUserCircle } from "react-icons/md";

const Card3 = () => {
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>Average Score - Units</span>
        <span className={styles.number}>89.1</span>
        <span className={styles.detail}>
          <span className={styles.negative}>minus 0.4</span> Points
        </span>
      </div>
    </div>
  );
};

export default Card3;
