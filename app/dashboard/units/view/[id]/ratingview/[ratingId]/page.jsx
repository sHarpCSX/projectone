import React from "react";
import { fetchSingleUnitRatingById } from "../../../../../../lib/data";
import styles from "../../../../../../ui/dashboard/units/singleUnit/rateUnit/singleRateUnit/singleRateUnit.module.css";
import Link from "next/link";

const UnitRatingDetailPage = async ({ params }) => {
  const { id, ratingId } = params;

  const rating = await fetchSingleUnitRatingById({ unitId: id, ratingId });

  if (!rating) {
    return (
      <div className={styles.container}>
        <h2>Rating Detail Page</h2>
        <p>Loading rating data...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Rating Detail Page</h2>
      <p>Rating ID: {rating.ratingId.toString()}</p>
      <p>Created At: {new Date(rating.createdAt).toLocaleDateString()}</p>

      <div className={styles.ratingsContainer}>
        {/* Goals Criteria */}
        <div className={styles.criteriaContainer}>
          <h3>Goals Criteria</h3>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td>Clarity:</td>
                <td>{rating.goals.clarity}</td>
              </tr>
              <tr>
                <td>Achievability:</td>
                <td>{rating.goals.achievability}</td>
              </tr>
              <tr>
                <td>Alignment:</td>
                <td>{rating.goals.alignment}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Environment Criteria */}
        <div className={styles.criteriaContainer}>
          <h3>Environment Criteria</h3>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td>Teamwork:</td>
                <td>{rating.environment.teamwork}</td>
              </tr>
              <tr>
                <td>Support:</td>
                <td>{rating.environment.support}</td>
              </tr>
              <tr>
                <td>Communication:</td>
                <td>{rating.environment.communication}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Management Criteria */}
        <div className={styles.criteriaContainer}>
          <h3>Management Criteria</h3>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td>Leadership:</td>
                <td>{rating.management.leadership}</td>
              </tr>
              <tr>
                <td>Feedback:</td>
                <td>{rating.management.feedback}</td>
              </tr>
              <tr>
                <td>Decision Making:</td>
                <td>{rating.management.decisionMaking}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Additional Criteria */}
        <div className={styles.criteriaContainer}>
          <h3>Additional Criteria</h3>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td>Work Life Balance:</td>
                <td>{rating.additionalCriteria.workLifeBalance}</td>
              </tr>
              <tr>
                <td>Resources:</td>
                <td>{rating.additionalCriteria.resources}</td>
              </tr>
              <tr>
                <td>Professional Development:</td>
                <td>{rating.additionalCriteria.professionalDevelopment}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Total Score */}
        <div className={styles.criteriaContainer}>
          <h3>Total Score</h3>
          <p>Total Score: {rating.totalScore}</p>
        </div>
        <button className={`${styles.button}`}>
          <Link href={`/dashboard/units/view/${id}`}>Back</Link>
        </button>
      </div>
    </div>
  );
};

export default UnitRatingDetailPage;
