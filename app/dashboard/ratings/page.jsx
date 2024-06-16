import React from "react";
import { fetchRatings } from "../../lib/data";
import Pagination from "../../ui/dashboard/pagination/pagination";
import styles from "../../ui/dashboard/ratings/ratingsPage.module.css";

const RatingsPage = async ({ searchParams }) => {
  const page = searchParams?.page || 1;
  const { count, ratings } = await fetchRatings(page);

  const allRatingObjects = ratings?.length
    ? ratings.reduce((acc, curr) => {
        return [...acc, ...curr.ratings]; // Ändere curr.rating zu curr.ratings
      }, [])
    : [];

  const sortedRatings = allRatingObjects.sort(
    (a, b) => b.ratingId - a.ratingId
  );

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Rating ID</th>
            <th>Total Score</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {sortedRatings.map((rating, index) => (
            <tr key={`${rating.user_id}-${index}`}>
              <td>{rating.ratingId.toString()}</td>
              <td>{rating._doc.totalScore}</td>
              <td>{new Date(rating._doc.createdAt).toString().slice(4, 24)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} currentPage={page} />
    </div>
  );
};

export default RatingsPage;
