import React from "react";
import { fetchRatings } from "../../lib/data";
import Link from "next/link";
import Pagination from "../../ui/dashboard/pagination/pagination";
import styles from "../../ui/dashboard/ratings/ratings.module.css";

// TODO: Sortierung Seitenübergreifend ermöglichen

const RatingsPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, ratings } = await fetchRatings(q, page);

  const flatRatings = ratings.reduce((acc, curr) => {
    return [
      ...acc,
      ...curr.rating.map((r) => ({
        ...r,
        user_id: curr.user_id,
      })),
    ];
  }, []);

  // Sortiere die Bewertungen nach createdAt (jüngste zuerst)
  const sortedRatings = flatRatings.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  sortedRatings.forEach((element) => {
    console.log(element._doc);
  });

  return (
    <div className={styles.container}>
      <h1>Ratings</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Total Score</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {sortedRatings.reverse().map((rating, index) => (
            <tr key={`${rating.user_id}-${index}`}>
              <td>{rating.user_id.toString()}</td>
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
