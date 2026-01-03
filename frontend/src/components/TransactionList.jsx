import React from 'react';
import { MdDelete } from 'react-icons/md';
import '../styles/TransactionList.css';

const TransactionList = ({ transactions }) => {
  const getCategoryColor = (type) => {
    const colors = {
      'Food': '#FF6B6B',
      'Transport': '#4ECDC4',
      'Entertainment': '#FFE66D',
      'Salary': '#95E1D3',
      'Freelance': '#F38181',
      'Bonus': '#AA96DA',
      'Shopping': '#FCBAD3',
      'Utilities': '#A8D8EA',
    };
    return colors[type] || '#95E1D3';
  };

  if (transactions.length === 0) {
    return (
      <div className="transaction-list empty">
        <p>No transactions yet. Start by adding your first transaction!</p>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      {transactions.map((transaction) => (
        <div key={transaction.id} className={`transaction-item ${transaction.type}`}>
          <div className="transaction-category" style={{ backgroundColor: getCategoryColor(transaction.category) }}>
            {transaction.category[0]}
          </div>
          <div className="transaction-details">
            <h4 className="transaction-description">{transaction.description}</h4>
            <p className="transaction-category-name">{transaction.category}</p>
            <p className="transaction-date">{new Date(transaction.date).toLocaleDateString()}</p>
          </div>
          <div className="transaction-amount">
            <span className={`amount ${transaction.type}`}>
              {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
            </span>
          </div>
          <button className="delete-btn" title="Delete">
            <MdDelete />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
