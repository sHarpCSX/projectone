"use client";

import React, { useState } from "react";
import styles from "./rateUser.module.css";
import { addRating } from "../../../../../lib/actions";
import PaginationSection from "../../../paginationSection/paginationSection";

const RatingForm = ({ userId, ratingUserId }) => {
  const [currentSection, setCurrentSection] = useState(1);

  const [socialValues, setSocialValues] = useState({
    behaviour: 3,
    feedback: 3,
    presence: 3,
    communication: 3,
    teamwork: 3,
    leadership: 3,
    adaptability: 3,
  });

  const [kpiValues, setKpiValues] = useState({
    Zielerreichung: 3,
    productivity: 3,
    efficiency: 3,
    innovation: 3,
    qualityOfWork: 3,
    punctuality: 3,
    clientSatisfaction: 3,
  });

  const [additionalCriteriaValues, setAdditionalCriteriaValues] = useState({
    initiative: 3,
    problemSolving: 3,
    dependability: 3,
    technicalSkills: 3,
    workEthic: 3,
    decisionMaking: 3,
  });

  const handleNext = () => {
    setCurrentSection(currentSection + 1);
  };

  const handleBack = () => {
    setCurrentSection(currentSection - 1);
  };

  const handleValueChange = (category, field, value) => {
    switch (category) {
      case "social":
        setSocialValues({ ...socialValues, [field]: value });
        break;
      case "kpi":
        setKpiValues({ ...kpiValues, [field]: value });
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
    const percent = (value / 6) * 100;
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
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("userId", userId); // Hinzufügen der userId

    formData.append("ratingUserId", ratingUserId);

    Object.entries(socialValues).forEach(([key, value]) => {
      formData.append(`social_${key}`, value);
    });

    Object.entries(kpiValues).forEach(([key, value]) => {
      formData.append(`kpi_${key}`, value);
    });

    Object.entries(additionalCriteriaValues).forEach(([key, value]) => {
      formData.append(`additionalCriteria_${key}`, value);
    });

    try {
      await addRating(formData);
    } catch (error) {
      console.error("Failed to add rating:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input type="hidden" name="user_id" value={userId} />

      {currentSection === 1 && (
        <div className={styles.section}>
          <h3>Social</h3>
          {Object.entries(socialValues).map(([key, value]) => (
            <div key={key} className={styles.rangeContainer}>
              <label className={styles.formLabel}>{key}</label>
              <input
                type="range"
                name={`social_${key}`}
                min="0"
                max="5"
                value={value}
                className={`${styles.rangeInput} custom-range`}
                onChange={(e) =>
                  handleValueChange("social", key, parseInt(e.target.value))
                }
                style={{ background: getSliderBackground(value) }}
              />
              <span className={styles.rangeValue}>{value}</span>
            </div>
          ))}
          <PaginationSection
            currentSection={currentSection}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        </div>
      )}

      {currentSection === 2 && (
        <div className={styles.section}>
          <h3>KPI</h3>
          {Object.entries(kpiValues).map(([key, value]) => (
            <div key={key} className={styles.rangeContainer}>
              <label className={styles.formLabel}>{key}</label>
              <input
                type="range"
                name={`kpi_${key}`}
                min="0"
                max="5"
                value={value}
                className={`${styles.rangeInput} custom-range`}
                onChange={(e) =>
                  handleValueChange("kpi", key, parseInt(e.target.value))
                }
                style={{ background: getSliderBackground(value) }}
              />
              <span className={styles.rangeValue}>{value}</span>
            </div>
          ))}
          <PaginationSection
            currentSection={currentSection}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        </div>
      )}

      {currentSection === 3 && (
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
          <PaginationSection
            currentSection={currentSection}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        </div>
      )}

      {currentSection === 3 && (
        <div className={styles.section}>
          <button type="submit">Submit Rating</button>
        </div>
      )}
    </form>
  );
};

export default RatingForm;
