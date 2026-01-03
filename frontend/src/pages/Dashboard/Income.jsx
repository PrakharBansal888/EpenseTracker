import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import toast from 'react-hot-toast';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import StatCard from '../../components/StatCard';
import TransactionList from '../../components/TransactionList';
import AddTransactionModal from '../../components/AddTransactionModal';
import '../../styles/Dashboard.css';

const Income = () => {
  const [incomeTransactions, setIncomeTransactions] = useState([
    { id: 1, type: 'income', category: 'Salary', amount: 5000, date: '2024-12-01', description: 'Monthly salary' },
    { id: 2, type: 'income', category: 'Freelance', amount: 500, date: '2024-11-28', description: 'Project payment' },
    { id: 3, type: 'income', category: 'Bonus', amount: 1000, date: '2024-11-25', description: 'Performance bonus' },
  ]);
  const [showModal, setShowModal] = useState(false);

  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);

  const handleAddIncome = (newTransaction) => {
    if (newTransaction.type === 'income') {
      setIncomeTransactions([
        { ...newTransaction, id: Date.now() },
        ...incomeTransactions
      ]);
      toast.success('Income added successfully!');
      setShowModal(false);
    } else {
      toast.error('Please select income type');
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-main">
        <TopBar />
        
        <div className="dashboard-content">
          <div className="stats-grid">
            <StatCard
              title="Total Income"
              amount={totalIncome}
              color="success"
              icon="📈"
            />
          </div>

          <div className="content-grid">
            <div className="transactions-section">
              <div className="section-header">
                <h2>Income Transactions</h2>
                <button
                  className="add-btn"
                  onClick={() => setShowModal(true)}
                >
                  <MdAdd /> Add Income
                </button>
              </div>
              <TransactionList transactions={incomeTransactions} />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <AddTransactionModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddIncome}
          defaultType="income"
        />
      )}
    </div>
  );
};

export default Income;