import React from "react";
import { fetchRatings } from "../../lib/data";
import Link from "next/link";
import Pagination from "../../ui/dashboard/pagination/pagination";
import styles from "../../ui/dashboard/ratings/ratings.module.css";

// TODO: Sortierung Seitenübergreifend ermöglichen

const RatingsPage = async ({ searchParams }) => {
  const page = searchParams?.page || 1;
  const { count, ratings } = await fetchRatings(page);

  console.log(ratings);

  const allRatingObjects = ratings?.length
    ? ratings.reduce((acc, curr) => {
        return [...acc, ...curr.ratings]; // Ändere curr.rating zu curr.ratings
      }, [])
    : [];

  const sortedRatings = allRatingObjects.sort(
    (a, b) => b.ratingId - a.ratingId
  );

  sortedRatings.forEach((element) => {
    console.log(element);
  });

  return (
    <div className={styles.container}>
      <h1>Ratings</h1>
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
              <td>{rating._id.toString()}</td>
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
