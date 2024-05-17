import React from 'react';
import './About.css';
import photo from '../images/about.png'
function About() {
  return (
    <div className="about-container">
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
          <img src={photo} alt="About Us" />
        </div>
      </main>
    </div>
  );
}

export default About;
