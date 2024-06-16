import React from "react";
import styles from "../../../../ui/dashboard/units/singleUnit/rateUnit/singleRateUnit/singleRateUnit.module.css";
import { fetchSingleUnit, fetchRatingsByUnitId } from "../../../../lib/data";
import Link from "next/link";

const SingleUnitPage = async ({ params }) => {
  const { id } = params;
  const unit = await fetchSingleUnit(id);
  const ratings = await fetchRatingsByUnitId(unit._id);

  const calculateAverage = (criteria) => {
    if (!criteria || typeof criteria !== "object") {
      return 0;
    }
    const sum = Object.values(criteria).reduce((acc, value) => acc + value, 0);
    return sum / Object.keys(criteria).length;
  };

  return (
    <div className={styles.container}>
      {unit && (
        <div className={styles.infoContainer}>
          <div className={styles.unitInfo}>
            <p>Unit ID: {unit.unitId}</p>
            <p>Name: {unit.name}</p>
            <p>Area: {unit.area}</p>
            <p>Location: {unit.location}</p>
            <p>Employees: {unit.employees}</p>
          </div>
        </div>
      )}

      {!ratings ? (
        <div className={styles.container}>
          <h2>Rating Detail Page</h2>
          <p>No ratings available.</p>
        </div>
      ) : (
        <div className={styles.ratingsContainer}>
          <h2>Ratings</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Rating ID</th>
                <th>Created At</th>
                <th>Average Goals</th>
                <th>Average Environment</th>
                <th>Average Management</th>
                <th>Average Additional Criteria</th>
                <th>Total Score</th>
                <th>Action</th>
              </tr>
            </thead>
            {Array.isArray(ratings) && (
              <tbody>
                {ratings.map(
                  (ratingGroup) =>
                    Array.isArray(ratingGroup.ratings) &&
                    ratingGroup.ratings.reverse().map((rating, index) => (
                      <tr key={index}>
                        <td>{rating.ratingId.toString()}</td>
                        <td>
                          {new Date(rating.createdAt).toLocaleDateString()}
                        </td>
                        <td>{calculateAverage(rating.goals).toFixed(2)}</td>
                        <td>
                          {calculateAverage(rating.environment).toFixed(2)}
                        </td>
                        <td>
                          {calculateAverage(rating.management).toFixed(2)}
                        </td>
                        <td>
                          {calculateAverage(rating.additionalCriteria).toFixed(
                            2
                          )}
                        </td>
                        <td>{rating.totalScore}</td>
                        <td>
                          <Link
                            href={`/dashboard/units/view/${unit.id}/ratingview/${rating._id}`}
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            )}
          </table>
          <button className={`${styles.button}`}>
            <Link href={`/dashboard/units`}>Back</Link>
          </button>
        </div>
      )}
    </div>
  );
};
export default SingleUnitPage;
