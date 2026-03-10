import React from 'react';
import '../styles/Features.css';

const Features = () => {
  const features = [
    {
      id: 1,
      icon: '✅',
      title: 'Easy Booking',
      description: 'Book home services quickly with a simple and user-friendly interface',
    },
    {
      id: 2,
      icon: '✔️',
      title: 'Verified Professionals',
      description: 'All technicians are verified and trained to provide high-quality services',
    },
    {
      id: 3,
      icon: '📍',
      title: 'Service Tracking',
      description: 'Track your service requests and appointment status in real time',
    },
    {
      id: 4,
      icon: '💰',
      title: 'Affordable Pricing',
      description: 'Transparent pricing with no hidden charges for all services',
    },
    {
      id: 5,
      icon: '⭐',
      title: 'Ratings & Reviews',
      description: 'Check customer reviews and ratings before choosing a service provider',
    },
  ];

  return (
    <div className="features-container">
      <section className="features-hero">
        <h1>Why Choose HelpHub</h1>
        <p className="features-subtitle">
          Everything you need for reliable home services
        </p>
      </section>

      <section className="features-grid-section">
        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="features-highlight">
        <div className="highlight-content">
          <h2>Why Choose HelpHub?</h2>
          <div className="highlight-reasons">
            <div className="reason-item">
              <span className="check-mark">✅</span>
              <p>Trusted by industry leaders</p>
            </div>
            <div className="reason-item">
              <span className="check-mark">✅</span>
              <p>Continuously updated with new features</p>
            </div>
            <div className="reason-item">
              <span className="check-mark">✅</span>
              <p>Proven ROI for our customers</p>
            </div>
            <div className="reason-item">
              <span className="check-mark">✅</span>
              <p>Dedicated customer success managers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
