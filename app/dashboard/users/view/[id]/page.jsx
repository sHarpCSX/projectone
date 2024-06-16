import React from "react";
import styles from "../../../../ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";
import { fetchSingleUser, fetchRatingsById } from "../../../../lib/data";
import Link from "next/link";
import { ChartSingle } from "../../../../ui/dashboard/chart/chartSingle";
import { PieSingle } from "../../../../ui/dashboard/chart/pieSingle";
import { deleteRating } from "../../../../lib/actions";

const SingleUserPage = async ({ params }) => {
  const { id } = params;
  const user = await fetchSingleUser(id);

  const ratings = await fetchRatingsById(user._id);

  const calculateAverage = (criteria) => {
    if (!criteria || typeof criteria !== "object") {
      return 0;
    }
    const sum = Object.values(criteria).reduce((acc, value) => acc + value, 0);
    return sum / Object.keys(criteria).length;
  };

  const transformedRatings = ratings
    .map((ratingGroup) => {
      if (!Array.isArray(ratingGroup.ratings)) {
        console.error("Invalid ratings structure:", ratingGroup);
        return null;
      }

      //TODO: Sortierung noch nicht korrekt
      //TODO: Zweiten Chart verändern
      // Reverse and take the last 5 ratings
      const lastFiveRatings = ratingGroup.ratings.slice(0, 5);

      return lastFiveRatings.map((element) => ({
        ratingId: element.ratingId,
        totalScore: element.totalScore,
        social: calculateAverage(element.social),
        kpi: calculateAverage(element.kpi),
        additional: calculateAverage(element.additionalCriteria),
      }));
    })
    .flat()
    .filter(Boolean);

  return (
    <div className={styles.container}>
      {user && (
        <div className={styles.infoContainer}>
          <div className={styles.imageContainer}>
            <Image
              src={user.img || "/noavatar.png"}
              alt=""
              width={200}
              height={300}
            />
          </div>
          <div className={styles.userInfo}>
            <p>
              Name: <br></br> {user.firstname} {user.lastname}
            </p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Position: {user.position}</p>
            <p>Unit-ID: {user.unit}</p>
            <p>Role: {user.role}</p>
            <p>Status: {user.isActive ? "Active" : "Passive"}</p>
          </div>
          <ChartSingle ratings={transformedRatings} />
          {/* <PieSingle ratings={transformedRatings} /> */}
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
                      <tr key={rating.id}>
                        <td>{rating.ratingId.toString()}</td>
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
                          <div className={styles.buttons}>
                            <Link
                              href={`/dashboard/users/view/${user._id}/ratingview/${rating._id}`}
                            >
                              <button
                                className={`${styles.button} ${styles.btn}`}
                              >
                                View
                              </button>
                            </Link>
                            <form action={deleteRating}>
                              <input
                                type="hidden"
                                name="id"
                                value={rating.id}
                              ></input>
                              <button
                                className={`${styles.button} ${styles.btn}`}
                              >
                                Delete
                              </button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            )}
          </table>
          <button className={`${styles.button_view}`}>
            <Link href={`/dashboard/users`}>Back</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleUserPage;
