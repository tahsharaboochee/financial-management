import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="header">
        <div className="header-content">
          <div className="logo">My Finance App</div>
          <nav className="nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="main-content">
        <div className="intro">
          <h1>Introducing a new Financial budgeting app!</h1>
          <p>Review transactions, monitor your spending and track your networth.</p>
          <Link to="/register" className="cta-button">Check it out</Link>
        </div>
        <div className="image-section">
          <img src="finance-app-client/public/images/budget-photo.png" alt="Financial Wellness" />
        </div>
      </main>
    </div>
  );
}

export default Home;
