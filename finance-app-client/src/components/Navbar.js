import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
        <header className="header">
            <div className="header-content">
            <div className="logo">My Finance App</div>
            </div>
        </header>
        <Link to="/about">About</Link>
        {isAuthenticated ? (
        <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/transactions">Transactions</Link>
            <Link to="/goals">Goals</Link>
            <button onClick={handleLogout} className="logout-button">Logout</button>
        </>
        ) : (
        <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
