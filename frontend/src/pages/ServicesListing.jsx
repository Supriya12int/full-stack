import React, { useState } from 'react';
import BookingForm from '../components/BookingForm';
import '../styles/ServiceListing.css';

const ServicesListing = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      icon: '🔧',
      title: 'Plumbing Repair',
      description: 'Fix pipe leaks, tap issues, drainage problems.',
      priceRange: '₹299 – ₹799',
    },
    {
      id: 2,
      icon: '⚡',
      title: 'Electrical Repair',
      description: 'Wiring issues, switch repairs, power failure solutions.',
      priceRange: '₹399 – ₹999',
    },
    {
      id: 3,
      icon: '❄️',
      title: 'AC Service',
      description: 'AC servicing, gas refilling, and maintenance.',
      priceRange: '₹499 – ₹1299',
    },
    {
      id: 4,
      icon: '🧹',
      title: 'Home Cleaning',
      description: 'Professional deep cleaning and regular maintenance.',
      priceRange: '₹199 – ₹699',
    },
    {
      id: 5,
      icon: '🔌',
      title: 'Appliance Repair',
      description: 'Expert repair services for home appliances.',
      priceRange: '₹299 – ₹899',
    },
    {
      id: 6,
      icon: '🚿',
      title: 'Bathroom Repair',
      description: 'Tile repair, fixture installation, waterproofing.',
      priceRange: '₹599 – ₹1499',
    },
  ];

  return (
    <div className="services-listing-container">
      {/* Hero Section */}
      <section className="services-listing-hero">
        <h1>Our Services</h1>
        <p>Choose from a wide range of home services</p>
      </section>

      {/* Services Grid */}
      <section className="services-listing-grid">
        <div className="services-container">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-price">{service.priceRange}</div>
              <button 
                className="book-btn"
                onClick={() => setSelectedService(service)}
              >
                Book Service
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Form Modal */}
      {selectedService && (
        <BookingForm 
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
};

export default ServicesListing;
