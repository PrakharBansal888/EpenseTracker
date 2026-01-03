import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import toast from 'react-hot-toast';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import StatCard from '../../components/StatCard';
import TransactionList from '../../components/TransactionList';
import AddTransactionModal from '../../components/AddTransactionModal';
import '../../styles/Dashboard.css';

const Expense = () => {
  const [expenseTransactions, setExpenseTransactions] = useState([
    { id: 1, type: 'expense', category: 'Food', amount: 45.50, date: '2024-12-01', description: 'Lunch' },
    { id: 2, type: 'expense', category: 'Transport', amount: 15, date: '2024-11-30', description: 'Taxi' },
    { id: 3, type: 'expense', category: 'Entertainment', amount: 30, date: '2024-11-29', description: 'Movie tickets' },
  ]);
  const [showModal, setShowModal] = useState(false);

  const totalExpense = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

  const handleAddExpense = (newTransaction) => {
    if (newTransaction.type === 'expense') {
      setExpenseTransactions([
        { ...newTransaction, id: Date.now() },
        ...expenseTransactions
      ]);
      toast.success('Expense added successfully!');
      setShowModal(false);
    } else {
      toast.error('Please select expense type');
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
              title="Total Expense"
              amount={totalExpense}
              color="danger"
              icon="📉"
            />
          </div>

          <div className="content-grid">
            <div className="transactions-section">
              <div className="section-header">
                <h2>Expense Transactions</h2>
                <button
                  className="add-btn"
                  onClick={() => setShowModal(true)}
                >
                  <MdAdd /> Add Expense
                </button>
              </div>
              <TransactionList transactions={expenseTransactions} />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <AddTransactionModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddExpense}
          defaultType="expense"
        />
      )}
    </div>
  );
};

export default Expense;