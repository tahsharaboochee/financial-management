import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import TransactionsList from './components/transactions/TransactionsList';
import GoalsList from './components/goals/GoalsList';
import './App.css';
import './components/Dashboard.css';
import './components/transactions/TransactionsList.css';
import './components/transactions/TransactionForm.css';
import './components/goals/GoalsList.css';
import './components/goals/GoalForm.css';

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/transactions" element={isAuthenticated() ? <TransactionsList /> : <Navigate to="/login" />} />
          <Route path="/goals" element={isAuthenticated() ? <GoalsList /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
