import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <header className="header">
        <div className="header-content">
          <div className="logo">My Finance App</div>
          <nav className="nav">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="main-content">
        <div className="about-section">
          <h1>About Us</h1>
          <p>
            Welcome to My Finance App, your go-to solution for managing your personal finances.
            Our mission is to provide you with the tools and knowledge you need to take control
            of your financial future.
          </p>
          <p>
            Our app helps you track your income, expenses, and savings, and provides insights to
            help you make informed financial decisions. Whether you're saving for a big purchase
            or trying to manage your monthly budget, My Finance App is here to help.
          </p>
        </div>
        <div className="image-section">
          <img src="finance-app-client/public/images/about.png" alt="About Us" />
        </div>
      </main>
    </div>
  );
}

export default About;
