import React from 'react';
import { MdHome, MdShowChart, MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', icon: MdHome, path: '/dashboard' },
    { label: 'Income', icon: MdTrendingUp, path: '/income' },
    { label: 'Expense', icon: MdTrendingDown, path: '/expense' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>💰 ExpenseTracker</h2>
      </div>
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <item.icon className="menu-icon" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
