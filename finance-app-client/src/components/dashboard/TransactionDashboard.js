import React from 'react';
import './Dashboard.css';

function TransactionDashboard({ transactions }) {
  return (
    <section className="section">
      <h2>Transactions</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction._id}>
            {transaction.date} - {transaction.type}: ${transaction.amount} - {transaction.category} ({transaction.description})
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TransactionDashboard;
