import React, { useState } from 'react';
import '../styles/BookingForm.css';

const BookingForm = ({ service, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    address: '',
    serviceId: service?.id || null,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a booking object with service details
    const newBooking = {
      id: Date.now(), // Use timestamp as unique ID
      service: service?.name || 'Service',
      date: formData.date,
      time: formData.time,
      technician: 'Assigned Soon',
      status: 'Pending',
      bookingDetails: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        serviceId: formData.serviceId
      }
    };

    // Get existing bookings from localStorage
    const existingBookings = localStorage.getItem('userBookings');
    const bookings = existingBookings ? JSON.parse(existingBookings) : [];
    
    // Add new booking
    bookings.push(newBooking);
    
    // Save back to localStorage
    localStorage.setItem('userBookings', JSON.stringify(bookings));
    
    // Dispatch event to notify dashboard to refresh
    window.dispatchEvent(new Event('bookingUpdated'));

    console.log('Booking submitted:', newBooking);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        address: '',
        serviceId: service?.id || null,
      });
      onClose();
    }, 2000);
  };

  return (
    <div className="booking-form-overlay" onClick={onClose}>
      <div className="booking-form-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <h2>Book Service</h2>
        <p className="service-title">{service?.title}</p>

        {submitted ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Booking Confirmed!</h3>
            <p>We'll contact you soon to confirm your appointment.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Preferred Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="time">Preferred Time</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Service Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Enter your service address"
                rows="3"
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Confirm Booking
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
