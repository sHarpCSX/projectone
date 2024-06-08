"use client";
import React from "react";
import styles from "./chart.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    hr: 40,
    employee: 24,
    amt: 2400,
  },
  {
    name: "Page B",
    hr: 30,
    employee: 13,
    amt: 2210,
  },
  {
    name: "Page C",
    hr: 20,
    employee: 98,
    amt: 2290,
  },
  {
    name: "Page D",
    hr: 27,
    employee: 39,
    amt: 2000,
  },
  {
    name: "Page E",
    hr: 18,
    employee: 48,
    amt: 2181,
  },
  {
    name: "Page F",
    hr: 23,
    employee: 38,
    amt: 2500,
  },
  {
    name: "Page G",
    hr: 34,
    employee: 43,
    amt: 2100,
  },
];
const Chart = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Weekly Recap</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="hr"
            /* stroke="#8884d8" */
            stroke="white"
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dataKey="employee"
            /*             stroke="#82ca9d"
             */ stroke="blue"
            strokeDasharray="3 4 5 2"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
