import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionForm from './TransactionForm';
import './TransactionsList.css';
import { Link } from 'react-router-dom';

function TransactionsList() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTransactionId, setCurrentTransactionId] = useState(null);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/transactions', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTransactions(response.data);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError('Failed to fetch transactions. Please try again later.');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/transactions/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTransactions(transactions.filter(transaction => transaction._id !== id));
    } catch (err) {
      setError('Failed to delete transaction');
    }
  };

  const handleEdit = (id) => {
    setIsEditing(true);
    setCurrentTransactionId(id);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="transactions-container">
      <h2>Transactions</h2>
      <div className="navigation">
        <Link to="/dashboard">Back to Dashboard</Link>
      </div>
      {error && <div className="error">{error}</div>}
      <ul className="transactions-list">
        {transactions.map(transaction => (
          <li key={transaction._id}>
            {transaction.date} - {transaction.type}: ${transaction.amount} - {transaction.category}
            <button className="edit" onClick={() => handleEdit(transaction._id)}>Edit</button>
            <button onClick={() => handleDelete(transaction._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <TransactionForm
        transactionId={currentTransactionId}
        setTransactions={setTransactions}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        setCurrentTransactionId={setCurrentTransactionId}
      />
    </div>
  );
}

export default TransactionsList;
