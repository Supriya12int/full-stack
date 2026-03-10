import React from 'react';
import '../styles/Services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: '�',
      title: 'Plumbing Services',
      description: 'Fix leaking pipes, blocked drains, faucet installation, and other plumbing issues with experienced professionals.',
      features: ['Leak repairs', 'Drain cleaning', 'Faucet installation'],
    },
    {
      id: 2,
      icon: '⚡',
      title: 'Electrical Repair',
      description: 'Professional electricians to handle wiring issues, switch repairs, power failures, and appliance installations safely.',
      features: ['Wiring issues', 'Switch repairs', 'Power failures'],
    },
    {
      id: 3,
      icon: '❄️',
      title: 'AC Repair & Maintenance',
      description: 'Keep your air conditioner running efficiently with expert servicing, gas refilling, and repair solutions.',
      features: ['AC servicing', 'Gas refilling', 'Repair solutions'],
    },
    {
      id: 4,
      icon: '🧹',
      title: 'Home Cleaning',
      description: 'Get professional home cleaning services to maintain a clean, hygienic, and comfortable living environment.',
      features: ['Deep cleaning', 'Regular cleaning', 'Specialized cleaning'],
    },
    {
      id: 5,
      icon: '🔌',
      title: 'Appliance Repair',
      description: 'Expert repair services for all major home appliances with quick turnaround time.',
      features: ['Quick repairs', 'All brands', 'Warranty included'],
    },
    {
      id: 6,
      icon: '🚿',
      title: 'Bathroom Repair',
      description: 'Complete bathroom maintenance and repair services from plumbing to tiling.',
      features: ['Tile repair', 'Fixture installation', 'Waterproofing'],
    },
  ];

  return (
    <div className="services-container">
      <section className="services-hero">
        <h1>Our Home Services</h1>
        <p className="services-subtitle">
          Comprehensive solutions for all your home maintenance needs
        </p>
      </section>

      <section className="services-grid-section">
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card-large">
              <div className="card-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p className="card-description">{service.description}</p>
              <ul className="card-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>✓ {feature}</li>
                ))}
              </ul>
              <button className="card-button">Book Service</button>
            </div>
          ))}
        </div>
      </section>

      <section className="services-cta">
        <h2>Ready to Book Your Service?</h2>
        <p>Choose from our wide range of home service professionals</p>
        <button className="cta-button">Book Now</button>
      </section>
    </div>
  );
};

export default Services;
