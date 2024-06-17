import React from "react";
import Card1 from "../ui/dashboard/card/card1";
import Card2 from "../ui/dashboard/card/card2";
import Card3 from "../ui/dashboard/card/card3";
import styles from "../ui/dashboard/dashboard.module.css";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Ratings from "../ui/dashboard/ratings/ratings";
import Chart from "../ui/dashboard/chart/chart";

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card1 />
          <Card2 />
          <Card3 />
        </div>
        <Ratings />
        <Chart />
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;
