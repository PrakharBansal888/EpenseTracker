import React from 'react';
import { MdLogout, MdNotifications } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../styles/TopBar.css';

const TopBar = ({ onLogout }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toast.success('Logged out!');
      navigate('/login');
    }
  };

  return (
    <div className="topbar">
      <div className="topbar-content">
        <h1 className="topbar-title">Dashboard</h1>
        <div className="topbar-actions">
          <button className="notification-btn">
            <MdNotifications size={24} />
          </button>
          <div className="user-section">
            <div className="user-info">
              <p className="user-name">{user.name || user.email || 'User'}</p>
            </div>
            <button className="logout-btn" onClick={handleLogout} title="Logout">
              <MdLogout size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
