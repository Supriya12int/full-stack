import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/BookingForm.css';

const BookingForm = ({ service, onClose }) => {
  const { user } = useAuth();
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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (!user || !user.id) {
        throw new Error('User information missing');
      }

      // Create booking object with service details
      const bookingData = {
        service: service?.name || 'Service',
        serviceId: service?.id || null,
        date: formData.date,
        time: formData.time,
        bookingDetails: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          serviceType: service?.title || service?.name
        }
      };

      console.log('Submitting booking with user ID:', user.id);

      // Send booking to backend
      const response = await axios.post('http://localhost:5000/api/bookings/create', bookingData, {
        headers: {
          'user-id': user.id,
          'Content-Type': 'application/json',
        }
      });

      console.log('Booking response:', response);

      if (response.status === 201) {
        // Also save to localStorage for backward compatibility
        const existingBookings = localStorage.getItem('userBookings');
        const bookings = existingBookings ? JSON.parse(existingBookings) : [];
        bookings.push(response.data.booking);
        localStorage.setItem('userBookings', JSON.stringify(bookings));
        
        // Dispatch event to notify dashboard to refresh
        window.dispatchEvent(new Event('bookingUpdated'));

        console.log('Booking submitted:', response.data.booking);
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
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Error creating booking: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
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
