import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/BookService.css';

const BookService = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    serviceType: '',
    fullName: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    description: ''
  });

  const serviceTypes = [
    { id: 1, name: 'Plumbing Repair', icon: '🔧' },
    { id: 2, name: 'Electrical Repair', icon: '⚡' },
    { id: 3, name: 'AC Service', icon: '❄️' },
    { id: 4, name: 'Home Cleaning', icon: '🧹' }
  ];

  if (!isAuthenticated) {
    return (
      <div className="booking-page-container">
        <div className="unauthorized-message">
          <h2>Access Denied</h2>
          <p>Please log in to book a service.</p>
          <button onClick={() => navigate('/login')} className="btn-redirect">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors = {};

    if (!formData.serviceType.trim()) {
      newErrors.serviceType = 'Please select a service type';
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }
    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Please describe the issue';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }

    if (!user || !user.id) {
      setErrors({ submit: 'User information missing. Please log in again.' });
      console.log('User ID missing:', user);
      return;
    }

    setLoading(true);

    try {
      console.log('Submitting booking with user ID:', user.id);

      // Get service name from service type
      const selectedService = serviceTypes.find(s => s.name === formData.serviceType);

      // Create booking object for API
      const bookingData = {
        service: formData.serviceType,
        date: formData.date,
        time: formData.time,
        bookingDetails: {
          name: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          description: formData.description,
          serviceType: formData.serviceType
        }
      };

      console.log('Booking data:', bookingData);

      // Send to backend API
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

        // Dispatch event to update dashboard
        window.dispatchEvent(new Event('bookingUpdated'));

        // Show success message
        setSubmitted(true);

        // Reset form and redirect after delay
        setTimeout(() => {
          navigate('/home');
        }, 3000);
      }
    } catch (error) {
      console.error('Booking error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Error creating booking';
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page-container">
      <div className="booking-page-wrapper">
        {/* Header */}
        <div className="booking-header">
          <h1>Book a Service</h1>
          <p className="booking-header-subtitle">Fill in the details below to book your home service</p>
        </div>

        {submitted ? (
          <div className="success-section">
            <div className="success-icon">✓</div>
            <h2>Booking Confirmed!</h2>
            <p>Your service has been booked successfully.</p>
            <p className="success-subtitle">A technician will contact you soon to confirm the appointment.</p>
            <div className="success-details">
              <div className="detail-item">
                <span className="detail-label">Service:</span>
                <span className="detail-value">{formData.serviceType}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{new Date(formData.date).toLocaleDateString()}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Time:</span>
                <span className="detail-value">{formData.time}</span>
              </div>
            </div>
            <button onClick={() => navigate('/home')} className="btn-back-dashboard">
              Back to Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="booking-form">
            {/* Service Type Section */}
            <div className="form-section">
              <h3 className="section-title">Service Type</h3>
              <div className="service-options">
                {serviceTypes.map((service) => (
                  <label key={service.id} className="service-option">
                    <input
                      type="radio"
                      name="serviceType"
                      value={service.name}
                      checked={formData.serviceType === service.name}
                      onChange={handleChange}
                    />
                    <div className="service-option-content">
                      <span className="service-icon">{service.icon}</span>
                      <span className="service-name">{service.name}</span>
                    </div>
                  </label>
                ))}
              </div>
              {errors.serviceType && <span className="error-message">{errors.serviceType}</span>}
            </div>

            {/* User Details Section */}
            <div className="form-section">
              <h3 className="section-title">Your Details</h3>
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={errors.fullName ? 'input-error' : ''}
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className={errors.phone ? 'input-error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your complete service address"
                  rows="3"
                  className={errors.address ? 'input-error' : ''}
                ></textarea>
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>
            </div>

            {/* Appointment Details Section */}
            <div className="form-section">
              <h3 className="section-title">Appointment Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Preferred Date *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={errors.date ? 'input-error' : ''}
                  />
                  {errors.date && <span className="error-message">{errors.date}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="time">Preferred Time *</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={errors.time ? 'input-error' : ''}
                  />
                  {errors.time && <span className="error-message">{errors.time}</span>}
                </div>
              </div>
            </div>

            {/* Problem Description Section */}
            <div className="form-section">
              <h3 className="section-title">Problem Description</h3>
              <div className="form-group">
                <label htmlFor="description">Describe the Issue *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Please describe the problem in detail. This helps our technician prepare for the service."
                  rows="5"
                  className={errors.description ? 'input-error' : ''}
                ></textarea>
                <span className="char-count">{formData.description.length}/500</span>
                {errors.description && <span className="error-message">{errors.description}</span>}
              </div>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button type="button" onClick={() => navigate('/home')} className="btn-cancel" disabled={loading}>
                Cancel
              </button>
              <button type="submit" className="btn-confirm" disabled={loading}>
                {loading ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
            {errors.submit && <span className="error-message">{errors.submit}</span>}
          </form>
        )}
      </div>
    </div>
  );
};

export default BookService;
