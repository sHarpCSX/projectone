import React from "react";
import styles from "../../../../ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";
import { fetchSingleUser, fetchRatingsById } from "../../../../lib/data";
import Link from "next/link";

const SingleUserPage = async ({ params }) => {
  const { id } = params;

  const user = await fetchSingleUser(id);
  const ratings = await fetchRatingsById(user._id);
  console.log(ratings);

  const calculateAverage = (criteria) => {
    if (!criteria || typeof criteria !== "object") {
      return 0;
    }
    const sum = Object.values(criteria).reduce((acc, value) => acc + value, 0);
    return sum / Object.keys(criteria).length;
  };

  return (
    <div className={styles.container}>
      {user && (
        <div className={styles.infoContainer}>
          <div className={styles.imageContainer}>
            <Image src={user.img || "/noavatar.png"} alt="" fill />
          </div>
          <div className={styles.userInfo}>
            <p>Firstname: {user.firstname} </p>
            <p>Lastname: {user.lastname} </p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Position: {user.position}</p>
            <p>Unit-ID: {user.unit}</p>
            <p>Role: {user.role}</p>
            <p>Status: {user.isActive ? "Active" : "Passive"}</p>
          </div>
        </div>
      )}

      {!ratings ? (
        <div className={styles.container}>
          <h2>Rating Detail Page</h2>
          <p>Keine Ratings vorhanden.</p>
        </div>
      ) : (
        <div className={styles.ratingsContainer}>
          <h2>Ratings</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Rating ID</th>
                <th>Created At</th>
                <th>Average Social</th>
                <th>Average KPI</th>
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
                        <td>{rating._id.toString()}</td>
                        <td>
                          {new Date(rating.createdAt).toLocaleDateString()}
                        </td>
                        <td>{calculateAverage(rating.social).toFixed(2)}</td>
                        <td>{calculateAverage(rating.kpi).toFixed(2)}</td>
                        <td>
                          {calculateAverage(rating.additionalCriteria).toFixed(
                            2
                          )}
                        </td>
                        <td>{rating.totalScore}</td>
                        <td>
                          <Link
                            href={`/dashboard/users/view/${user.id}/ratingview/${rating._id}`}
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
        </div>
      )}
    </div>
  );
};

export default SingleUserPage;
