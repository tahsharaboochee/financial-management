import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import photo from '../images/budget-photo.png';

function Home() {
  return (
    <div className="home-container">
      <main className="main-content">
        <div className="intro">
          <h1>Introducing a new Financial budgeting app!</h1>
          <p>Review transactions, monitor your spending and track your net worth.</p>
          <Link to="/register" className="cta-button">Check it out</Link>
        </div>
        <div className="image-section">
          <img src={photo} alt="Financial Wellness" />
        </div>
      </main>
    </div>
  );
}

export default Home;
