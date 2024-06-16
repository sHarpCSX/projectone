import React from "react";
import styles from "./ratings.module.css";
import Image from "next/image";

const Ratings = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Ratings</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>From</td>
            <td>To</td>
            <td>Status</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="https://images.pexels.com/photos/20068318/pexels-photo-20068318/free-photo-of-stadt-mann-strasse-gebaude.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                <span>John Doe </span>
              </div>
            </td>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                <span>Sales</span>
              </div>
            </td>
            <td className={`${styles.status} ${styles.pending}`}>Pending</td>
            <td>13.05.2024</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                <span>Hanna Hansen </span>
              </div>
            </td>
            <td>
              <div className={styles.user}>
                <Image
                  src="https://images.pexels.com/photos/7841434/pexels-photo-7841434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                <span>Gill Bates</span>
              </div>
            </td>
            <td className={`${styles.status} ${styles.done}`}>Done</td>
            <td>13.05.2024</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                <span>Hanna Hansen </span>
              </div>
            </td>
            <td>
              <div className={styles.user}>
                <Image
                  src="https://images.pexels.com/photos/20068318/pexels-photo-20068318/free-photo-of-stadt-mann-strasse-gebaude.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                <span>John Doe</span>
              </div>
            </td>
            <td className={`${styles.status} ${styles.cancelled}`}>
              Cancelled
            </td>
            <td>13.05.2024</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Ratings;
