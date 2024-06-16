"use client";
import React from "react";
import styles from "./chartSingle.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const ChartSingle = ({ ratings }) => {
  // Sort the ratings array in ascending order based on ratingId
  const sortedRatings = [...ratings].sort((a, b) => a.ratingId - b.ratingId);

  // Transform the sorted data
  const transformedData = sortedRatings.map((rating) => ({
    ratingId: rating.ratingId,
    totalScore: rating.totalScore,
    social: rating.social ? parseFloat(rating.social.toFixed(2)) : 0,
    kpi: rating.kpi ? parseFloat(rating.kpi.toFixed(2)) : 0,
    additional: rating.additional
      ? parseFloat(rating.additional.toFixed(2))
      : 0,
  }));

  console.log(transformedData);

  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={200}
          data={transformedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="ratingId" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalScore"
            stroke="blue"
            strokeDasharray="3 4 5 2"
          />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={200}
          data={transformedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="ratingId" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="social"
            stroke="green"
            strokeDasharray="3 4 5 2"
          />
          <Line
            type="monotone"
            dataKey="kpi"
            stroke="blue"
            strokeDasharray="3 4 5 2"
          />
          <Line
            type="monotone"
            dataKey="additional"
            stroke="red"
            strokeDasharray="3 4 5 2"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
