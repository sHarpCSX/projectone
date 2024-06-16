"use client";

import React, { useState } from "react";
import styles from "./rateUnit.module.css";
import { addUnitRating } from "../../../../../lib/actions";
import UnitPaginationSection from "../../../unitPaginationSection/unitPaginationSection";

const UnitRatingForm = ({ unitId, ratingUserId }) => {
  const [currentSection, setCurrentSection] = useState(1);

  const [goalsValues, setGoalsValues] = useState({
    clarity: 3,
    achievability: 3,
    alignment: 3,
  });

  const [environmentValues, setEnvironmentValues] = useState({
    teamwork: 3,
    support: 3,
    communication: 3,
  });

  const [managementValues, setManagementValues] = useState({
    leadership: 3,
    feedback: 3,
    decisionMaking: 3,
  });

  const [additionalCriteriaValues, setAdditionalCriteriaValues] = useState({
    workLifeBalance: 3,
    resources: 3,
    professionalDevelopment: 3,
  });

  const handleNext = () => {
    setCurrentSection(currentSection + 1);
  };

  const handleBack = () => {
    setCurrentSection(currentSection - 1);
  };

  const handleValueChange = (category, field, value) => {
    switch (category) {
      case "goals":
        setGoalsValues({ ...goalsValues, [field]: value });
        break;
      case "environment":
        setEnvironmentValues({ ...environmentValues, [field]: value });
        break;
      case "management":
        setManagementValues({ ...managementValues, [field]: value });
        break;
      case "additionalCriteria":
        setAdditionalCriteriaValues({
          ...additionalCriteriaValues,
          [field]: value,
        });
        break;
      default:
        break;
    }
  };

  const getSliderBackground = (value) => {
    const percent = (value / 5) * 100;
    if (value === 0) {
      return `linear-gradient(90deg, red ${percent}%, red ${percent}%)`;
    } else if (value === 1) {
      return `linear-gradient(90deg, #FFA07A ${percent}%, #FFA07A ${percent}%)`;
    } else if (value === 2) {
      return `linear-gradient(90deg, #FFA500 ${percent}%, #FFA500 ${percent}%)`;
    } else if (value === 3) {
      return `linear-gradient(90deg, #FFE501 ${percent}%, #FFE501 ${percent}%)`;
    } else if (value === 4) {
      return `linear-gradient(90deg, #32CD32 ${percent}%, #32CD32 ${percent}%)`;
    } else if (value === 5) {
      return `linear-gradient(90deg, green ${percent}%, green ${percent}%)`;
    } else {
      return "linear-gradient(90deg, #ddd, #ddd)";
    }
  };

  const calculateTotalScore = () => {
    const allValues = {
      ...goalsValues,
      ...environmentValues,
      ...managementValues,
      ...additionalCriteriaValues,
    };

    const total = Object.values(allValues).reduce(
      (sum, value) => sum + value,
      0
    );
    return total;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("unitId", unitId);
    formData.append("ratingUserId", ratingUserId);

    Object.entries(goalsValues).forEach(([key, value]) => {
      formData.append(`goals_${key}`, value);
    });

    Object.entries(environmentValues).forEach(([key, value]) => {
      formData.append(`environment_${key}`, value);
    });

    Object.entries(managementValues).forEach(([key, value]) => {
      formData.append(`management_${key}`, value);
    });

    Object.entries(additionalCriteriaValues).forEach(([key, value]) => {
      formData.append(`additionalCriteria_${key}`, value);
    });

    formData.append("totalScore", calculateTotalScore().toString());

    try {
      await addUnitRating(formData);
    } catch (error) {
      console.error("Failed to add rating:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input type="hidden" name="unit_id" value={unitId} />

      {currentSection === 1 && (
        <div className={styles.section}>
          <h3>Goals</h3>
          {Object.entries(goalsValues).map(([key, value]) => (
            <div key={key} className={styles.rangeContainer}>
              <label className={styles.formLabel}>{key}</label>
              <input
                type="range"
                name={`goals_${key}`}
                min="0"
                max="5"
                value={value}
                className={`${styles.rangeInput} custom-range`}
                onChange={(e) =>
                  handleValueChange("goals", key, parseInt(e.target.value))
                }
                style={{ background: getSliderBackground(value) }}
              />
              <span className={styles.rangeValue}>{value}</span>
            </div>
          ))}
          <UnitPaginationSection
            currentSection={currentSection}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        </div>
      )}

      {currentSection === 2 && (
        <div className={styles.section}>
          <h3>Environment</h3>
          {Object.entries(environmentValues).map(([key, value]) => (
            <div key={key} className={styles.rangeContainer}>
              <label className={styles.formLabel}>{key}</label>
              <input
                type="range"
                name={`environment_${key}`}
                min="0"
                max="5"
                value={value}
                className={`${styles.rangeInput} custom-range`}
                onChange={(e) =>
                  handleValueChange(
                    "environment",
                    key,
                    parseInt(e.target.value)
                  )
                }
                style={{ background: getSliderBackground(value) }}
              />
              <span className={styles.rangeValue}>{value}</span>
            </div>
          ))}
          <UnitPaginationSection
            currentSection={currentSection}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        </div>
      )}

      {currentSection === 3 && (
        <div className={styles.section}>
          <h3>Management</h3>
          {Object.entries(managementValues).map(([key, value]) => (
            <div key={key} className={styles.rangeContainer}>
              <label className={styles.formLabel}>{key}</label>
              <input
                type="range"
                name={`management_${key}`}
                min="0"
                max="5"
                value={value}
                className={`${styles.rangeInput} custom-range`}
                onChange={(e) =>
                  handleValueChange("management", key, parseInt(e.target.value))
                }
                style={{ background: getSliderBackground(value) }}
              />
              <span className={styles.rangeValue}>{value}</span>
            </div>
          ))}
          <UnitPaginationSection
            currentSection={currentSection}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        </div>
      )}

      {currentSection === 4 && (
        <div className={styles.section}>
          <h3>Additional Criteria</h3>
          {Object.entries(additionalCriteriaValues).map(([key, value]) => (
            <div key={key} className={styles.rangeContainer}>
              <label className={styles.formLabel}>{key}</label>
              <input
                type="range"
                name={`additionalCriteria_${key}`}
                min="0"
                max="5"
                value={value}
                className={`${styles.rangeInput} custom-range`}
                onChange={(e) =>
                  handleValueChange(
                    "additionalCriteria",
                    key,
                    parseInt(e.target.value)
                  )
                }
                style={{ background: getSliderBackground(value) }}
              />
              <span className={styles.rangeValue}>{value}</span>
            </div>
          ))}
          <UnitPaginationSection
            currentSection={currentSection}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        </div>
      )}

      {currentSection === 4 && (
        <div className={styles.section}>
          <button type="submit">Submit Rating</button>
        </div>
      )}
    </form>
  );
};

export default UnitRatingForm;
