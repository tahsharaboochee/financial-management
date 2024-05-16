import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TransactionForm.css';

const allowedCategories = ['Groceries', 'Job', 'Utilities', 'Rent', 'Salary', 'Investment', 'Entertainment', 'Miscellaneous'];

function TransactionForm({ transactionId, setTransactions, isEditing, setIsEditing }) {
  const [formData, setFormData] = useState({
    type: 'expense', // default type
    amount: '',
    category: allowedCategories[0], // Default to the first category in the list
    date: ''
  });
  const [error, setError] = useState('');

  const { type, amount, category, date } = formData;

  useEffect(() => {
    if (isEditing && transactionId) {
      // Fetch the transaction data for editing
      const fetchTransaction = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/transactions/${transactionId}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          });
          const { type, amount, category, date, tags, recurring, frequency } = response.data;
          setFormData({ type, amount, category, date, tags, recurring, frequency });
        } catch (err) {
          setError('Failed to fetch transaction data');
        }
      };

      fetchTransaction();
    }
  }, [transactionId, isEditing]);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const config = {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      };
      const method = isEditing ? 'patch' : 'post';
      const url = isEditing ? `http://localhost:3000/transactions/${transactionId}` : 'http://localhost:3000/transactions';

      // Only include allowed fields in the payload
      const { type, amount, category, date, tags, recurring, frequency } = formData;
      const payload = { type, amount, category, date, tags, recurring, frequency };

      const response = await axios[method](url, payload, config);

      if (isEditing) {
        // Update the UI optimistically
        setTransactions(prev => prev.map(tr => tr._id === transactionId ? { ...tr, ...payload } : tr));
        // Reset the editing state
        setIsEditing(false);
        setFormData({
          type: 'expense',
          amount: '',
          category: allowedCategories[0], // Reset to the default category
          date: '',
          tags: [],
          recurring: false,
          frequency: null
        });
      } else {
        // Append to the list of transactions
        setTransactions(prev => [...prev, response.data]);
      }

      // Clear form or handle next steps
      setFormData({
        type: 'expense',
        amount: '',
        category: allowedCategories[0], // Reset to the default category
        date: '',
        tags: [],
        recurring: false,
        frequency: null
      });
    } catch (err) {
      setError('Failed to submit transaction');
    }
  };

  return (
    <div>
      <h2>{isEditing ? 'Edit Transaction' : 'Add Transaction'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <select name="type" value={type} onChange={onChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
            <option value="saving">Saving</option>
          </select>
        </label>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={onChange}
            required
          />
        </label>
        <label>
          Category:
          <select name="category" value={category} onChange={onChange}>
            {allowedCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={date}
            onChange={onChange}
            required
          />
        </label>
        {error && <div className="error">{error}</div>}
        <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
}

export default TransactionForm;
