// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Personal Finance Management</h1>
      <p>Track your income, expenses, and savings to make informed financial decisions.</p>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Home;
