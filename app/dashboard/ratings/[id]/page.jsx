import React from "react";
import { fetchRatingById } from "../../../lib/data";
import styles from "../../../ui/dashboard/ratings/ratingDetail.module.css";
import Image from "next/image";

const RatingDetailPage = async ({ params }) => {
  const { id } = params;

  const rating = await fetchRatingById(id);
  console.log(id);
  console.log(rating);

  if (!rating) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Rating Details</h1>
      </div>
      <div className={styles.details}>
        <div className={styles.userDetails}>
          <Image
            src={rating.user_id.img}
            alt={`${rating.user_id.firstname} ${rating.user_id.lastname}`}
            width={100}
            height={150}
          />
          <h2>{`${rating.user_id.firstname} ${rating.user_id.lastname}`}</h2>
          <p>Position: {rating.user_id.position}</p>
          <p>Unit: {rating.user_id.unit}</p>
        </div>
        <div className={styles.ratingDetails}>
          <h3>Rating</h3>
          <p>
            Score:{" "}
            <span
              style={{
                color: rating.rating[0].totalScore > 70 ? "green" : "red",
              }}
            >
              {rating.rating[0].totalScore}
            </span>
          </p>
          <p>
            Created At:{" "}
            {new Date(rating.rating[0].createdAt).toLocaleDateString()}
          </p>
          <p>
            Updated At:{" "}
            {new Date(rating.rating[0].updatedAt).toLocaleDateString()}
          </p>
          {/* Weitere Rating-Details hier einfügen */}
        </div>
      </div>
    </div>
  );
};

export default RatingDetailPage;
