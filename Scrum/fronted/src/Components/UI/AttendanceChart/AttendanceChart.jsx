import React from "react";
import styles from "./AttendanceChart.module.css";

const Stats = ({ datos }) => {
  const maxValue = Math.max(...Object.values(datos));

  return (
    <div className={styles.statsContainer}>
      {Object.entries(datos).map(([day, value]) => (
        <div key={day} className={styles.barContainer}>
          <div className={styles.label}>{value}</div>
          <div
            className={styles.bar}
            style={{ minHeight: `${(value / maxValue) * 100}%` }}
          ></div>
          <div className={styles.day}>{day}</div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
