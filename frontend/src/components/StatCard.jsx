import React from 'react';
import '../styles/StatCard.css';

const StatCard = ({ title, amount, color, icon }) => {
  return (
    <div className={`stat-card stat-${color}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h3 className="stat-title">{title}</h3>
        <p className="stat-amount">${amount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default StatCard;
