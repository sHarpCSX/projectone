"use client";

import React from "react";
import styles from "../users/singleUser/rateUser/rateUser.module.css";

const PaginationSection = ({ currentSection, handleBack, handleNext }) => {
  return (
    <div className={styles.paginationContainer}>
      <div className={styles.buttonContainer}>
        {currentSection > 1 && (
          <button type="button" onClick={handleBack} className={styles.button}>
            Back
          </button>
        )}
        {currentSection < 3 ? (
          <button type="button" onClick={handleNext} className={styles.button}>
            Next
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default PaginationSection;
