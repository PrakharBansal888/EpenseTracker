import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import '../styles/AddTransactionModal.css';

const AddTransactionModal = ({ onClose, onAdd, defaultType = 'expense' }) => {
  const [formData, setFormData] = useState({
    type: defaultType,
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const incomeCategories = ['Salary', 'Freelance', 'Bonus', 'Other Income'];
  const expenseCategories = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Utilities', 'Other'];

  const categories = formData.type === 'income' ? incomeCategories : expenseCategories;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.category || !formData.amount || !formData.description) {
      alert('Please fill all fields');
      return;
    }

    onAdd({
      ...formData,
      amount: parseFloat(formData.amount),
    });

    setFormData({
      type: defaultType,
      category: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Transaction</h2>
          <button className="close-btn" onClick={onClose}>
            <MdClose />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Transaction Type</label>
            <div className="type-buttons">
              <button
                type="button"
                className={`type-btn ${formData.type === 'income' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, type: 'income', category: '' }))}
              >
                Income
              </button>
              <button
                type="button"
                className={`type-btn ${formData.type === 'expense' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, type: 'expense', category: '' }))}
              >
                Expense
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
