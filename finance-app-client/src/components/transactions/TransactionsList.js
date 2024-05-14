import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TransactionsList() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  // Fetch transactions from the backend
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
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(err.response.data.error);
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('Failed to fetch transactions. Please try again later.');
      }
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Transactions</h2>
      {error && <div className="error">{error}</div>}
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            {transaction.date} - {transaction.type}: ${transaction.amount} - {transaction.category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionsList;
