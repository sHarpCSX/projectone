import React from "react";
import { fetchSingleRatingById } from "../../../../../../lib/data";
import styles from "../../../../../../ui/dashboard/users/singleUser/singleRateUser/singleRateUser.module.css";
import Link from "next/link";

const RatingDetailPage = async ({ params }) => {
  const { id, ratingId } = params;
  const rating = await fetchSingleRatingById({ userId: id, ratingId });

  if (!rating) {
    return (
      <div className={styles.container}>
        <h2>Rating Detail Page</h2>
        <p>Rating Daten werden geladen...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Rating Detail Page</h2>
      <p>Rating ID: {rating._id.toString()}</p>
      <p>Created At: {new Date(rating.createdAt).toLocaleDateString()}</p>

      <div className={styles.ratingsContainer}>
        {/* Social Criteria */}
        <div className={styles.criteriaContainer}>
          <h3>Social Criteria</h3>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td>Behaviour:</td>
                <td>{rating.social.behaviour}</td>
              </tr>
              <tr>
                <td>Feedback:</td>
                <td>{rating.social.feedback}</td>
              </tr>
              <tr>
                <td>Presence:</td>
                <td>{rating.social.presence}</td>
              </tr>
              <tr>
                <td>Communication:</td>
                <td>{rating.social.communication}</td>
              </tr>
              <tr>
                <td>Teamwork:</td>
                <td>{rating.social.teamwork}</td>
              </tr>
              <tr>
                <td>Leadership:</td>
                <td>{rating.social.leadership}</td>
              </tr>
              <tr>
                <td>Adaptability:</td>
                <td>{rating.social.adaptability}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* KPI Criteria */}
        <div className={styles.criteriaContainer}>
          <h3>KPI Criteria</h3>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td>Zielerreichung:</td>
                <td>{rating.kpi.Zielerreichung}</td>
              </tr>
              <tr>
                <td>Productivity:</td>
                <td>{rating.kpi.productivity}</td>
              </tr>
              <tr>
                <td>Efficiency:</td>
                <td>{rating.kpi.efficiency}</td>
              </tr>
              <tr>
                <td>Innovation:</td>
                <td>{rating.kpi.innovation}</td>
              </tr>
              <tr>
                <td>Quality Of Work:</td>
                <td>{rating.kpi.qualityOfWork}</td>
              </tr>
              <tr>
                <td>Punctuality:</td>
                <td>{rating.kpi.punctuality}</td>
              </tr>
              <tr>
                <td>Client Satisfaction:</td>
                <td>{rating.kpi.clientSatisfaction}</td>
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
                <td>Initiative:</td>
                <td>{rating.additionalCriteria.initiative}</td>
              </tr>
              <tr>
                <td>Problem Solving:</td>
                <td>{rating.additionalCriteria.problemSolving}</td>
              </tr>
              <tr>
                <td>Dependability:</td>
                <td>{rating.additionalCriteria.dependability}</td>
              </tr>
              <tr>
                <td>Technical Skills:</td>
                <td>{rating.additionalCriteria.technicalSkills}</td>
              </tr>
              <tr>
                <td>Work Ethic:</td>
                <td>{rating.additionalCriteria.workEthic}</td>
              </tr>
              <tr>
                <td>Decision Making:</td>
                <td>{rating.additionalCriteria.decisionMaking}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Total Score */}
        <div className={styles.criteriaContainer}>
          <h3>Total Score</h3>
          <p>Total Score: {rating.totalScore}</p>
        </div>
      </div>
      <Link href={`/dashboard/users/view/${id}`}>Back to User</Link>
    </div>
  );
};

export default RatingDetailPage;
