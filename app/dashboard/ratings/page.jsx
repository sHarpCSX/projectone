import React from "react";
import { fetchRatings } from "../../lib/data";
import Link from "next/link";
import Pagination from "../../ui/dashboard/pagination/pagination";
import styles from "../../ui/dashboard/ratings/ratings.module.css";

const RatingsPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, ratings } = await fetchRatings(q, page);

  // Konvertiere das ratings-Objekt in ein flaches Array und behalte user_id bei
  const flatRatings = ratings.reduce((acc, curr) => {
    return [
      ...acc,
      ...curr.rating.map((r) => ({
        ...r,
        user_id: curr.user_id,
        createdAt: r.createdAt,
        totalScore: r.totalScore,
      })),
    ];
  }, []);

  // Sortiere die Bewertungen nach createdAt (jüngste zuerst)
  const sortedRatings = flatRatings.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  sortedRatings.forEach((element) => {
    console.log(element.__parentArray[0]);
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedRatings.map((rating, index) => (
            <tr key={`${rating.user_id}-${index}`}>
              <td>{rating.user_id.toString()}</td>
              <td>{rating.totalScore}</td>
              <td>{new Date(rating.createdAt).toString().slice(4, 24)}</td>
              <td>
                <Link
                  href={`/dashboard/ratings/${rating.__parentArray[0]._id}`}
                >
                  <button className={styles.button}>View Details</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} currentPage={page} />
    </div>
  );
};

export default RatingsPage;
