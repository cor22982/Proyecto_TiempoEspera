import React from 'react';
import './AttendanceChart.css';

const Stats = ({ datos }) => {
  const maxValue = Math.max(...Object.values(datos));
  
  return (
    <div className="stats-container">
      {Object.entries(datos).map(([day, value]) => (
        <div key={day} className="bar-container">
          <div className="label">{value}</div>
          <div className="bar" style={{ minHeight: `${(value / maxValue) * 100}%` }}></div>
          <div className="day">{day}</div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
