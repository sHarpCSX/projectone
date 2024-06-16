import React from "react";
import styles from "../../ui/dashboard/ranking/ranking.module.css";
import { fetchUsers, fetchUnits } from "../../lib/data";

const RankingPage = async () => {
  const { users } = await fetchUsers();
  const { units } = await fetchUnits();

  // Filter users and units without ratings
  const usersWithRatings = users.filter(
    (user) => user.averageTotalScore !== "N/A"
  );
  const unitsWithRatings = units.filter(
    (unit) => unit.averageTotalScore !== "N/A"
  );

  // Sort users and units by averageTotalScore in descending order
  const sortedUsers = usersWithRatings.sort(
    (a, b) => b.averageTotalScore - a.averageTotalScore
  );
  const sortedUnits = unitsWithRatings.sort(
    (a, b) => b.averageTotalScore - a.averageTotalScore
  );

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <h2>Employees</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr key={index}>
                <td># {index + 1}</td>
                <td>
                  {user.firstname} {user.lastname}
                </td>
                <td>{user.averageTotalScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.tableContainer}>
        <h2>Units</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedUnits.map((unit, index) => (
              <tr key={index}>
                <td># {index + 1}</td>
                <td>{unit.name}</td>
                <td>{unit.averageTotalScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankingPage;
