import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About HelpHub</h1>
        <p className="about-subtitle">
          Connecting You with Trusted Home Service Professionals
        </p>
      </section>

      <section className="about-content">
        <div className="about-text">
          <h2>What is HelpHub?</h2>
          <p>
            HelpHub is a home services platform that connects customers with trusted professionals for everyday household needs. Whether it's fixing a leaking pipe, repairing electrical issues, servicing your air conditioner, or scheduling a home cleaning, HelpHub makes it easy to find the right service quickly.
          </p>
          <p>
            Our goal is to simplify home maintenance by providing a reliable platform where users can easily book services, track appointments, and get quality assistance from skilled technicians.
          </p>
          <p>
            With HelpHub, managing home services becomes simple, fast, and stress-free.
          </p>
        </div>

        <div className="services-overview">
          <h2>Why Choose HelpHub?</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">⚡</div>
              <h3>Quick Booking</h3>
              <p>Get services booked in minutes, not hours</p>
            </div>
            <div className="service-card">
              <div className="service-icon">✅</div>
              <h3>Verified Professionals</h3>
              <p>All technicians are background-checked and trained</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💰</div>
              <h3>Transparent Pricing</h3>
              <p>No hidden charges, pay only for what you use</p>
            </div>
            <div className="service-card">
              <div className="service-icon">⭐</div>
              <h3>Quality Assured</h3>
              <p>Ratings and reviews help you choose the best professionals</p>
            </div>
          </div>
        </div>

        <div className="about-stats">
          <div className="stat-item">
            <h3>50K+</h3>
            <p>Services Completed</p>
          </div>
          <div className="stat-item">
            <h3>10K+</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stat-item">
            <h3>500+</h3>
            <p>Verified Professionals</p>
          </div>
          <div className="stat-item">
            <h3>4.8⭐</h3>
            <p>Average Rating</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
