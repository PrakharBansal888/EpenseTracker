import React, { useState } from 'react';
import { MdAdd, MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import StatCard from '../../components/StatCard';
import TransactionList from '../../components/TransactionList';
import AddTransactionModal from '../../components/AddTransactionModal';
import '../../styles/Dashboard.css';

const Home = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'expense', category: 'Food', amount: 45.50, date: '2024-12-01', description: 'Lunch' },
    { id: 2, type: 'income', category: 'Salary', amount: 5000, date: '2024-12-01', description: 'Monthly salary' },
    { id: 3, type: 'expense', category: 'Transport', amount: 15, date: '2024-11-30', description: 'Taxi' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const handleAddTransaction = (newTransaction) => {
    setTransactions([
      { ...newTransaction, id: Date.now() },
      ...transactions
    ]);
    toast.success('Transaction added successfully!');
    setShowModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-main">
        <TopBar onLogout={handleLogout} />
        
        <div className="dashboard-content">
          {/* Stats Section */}
          <div className="stats-grid">
            <StatCard
              title="Total Balance"
              amount={balance}
              color="primary"
              icon="💰"
            />
            <StatCard
              title="Total Income"
              amount={totalIncome}
              color="success"
              icon="📈"
            />
            <StatCard
              title="Total Expense"
              amount={totalExpense}
              color="danger"
              icon="📉"
            />
          </div>

          {/* Main Content */}
          <div className="content-grid">
            {/* Transactions Section */}
            <div className="transactions-section">
              <div className="section-header">
                <h2>Recent Transactions</h2>
                <button
                  className="add-btn"
                  onClick={() => setShowModal(true)}
                >
                  <MdAdd /> Add Transaction
                </button>
              </div>
              <TransactionList transactions={transactions} />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <AddTransactionModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddTransaction}
        />
      )}
    </div>
  );
};

export default Home;