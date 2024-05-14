import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import './App.css';
import TransactionsList from './components/transactions/TransactionsList';
import GoalsList from './components/goals/GoalsList';

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" component={Home} />
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
