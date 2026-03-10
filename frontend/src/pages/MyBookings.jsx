import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/MyBookings.css';

const MyBookings = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, confirmed, completed

  const serviceIcons = {
    'Plumbing Repair': '🔧',
    'Electrical Repair': '⚡',
    'AC Service': '❄️',
    'Home Cleaning': '🧹'
  };

  useEffect(() => {
    loadBookings();
    window.addEventListener('bookingUpdated', loadBookings);
    return () => window.removeEventListener('bookingUpdated', loadBookings);
  }, []);

  const loadBookings = () => {
    const savedBookings = localStorage.getItem('userBookings');
    const parsedBookings = savedBookings ? JSON.parse(savedBookings) : [];
    setBookings(parsedBookings.sort((a, b) => new Date(b.date) - new Date(a.date)));
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      const updatedBookings = bookings.filter(b => b.id !== bookingId);
      setBookings(updatedBookings);
      localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
      window.dispatchEvent(new Event('bookingUpdated'));
    }
  };

  const getFilteredBookings = () => {
    if (filter === 'all') return bookings;
    return bookings.filter(b => b.status.toLowerCase() === filter);
  };

  const canCancelBooking = (status) => {
    return status.toLowerCase() !== 'completed';
  };

  if (!isAuthenticated) {
    return (
      <div className="my-bookings-container">
        <div className="unauthorized-message">
          <h2>Access Denied</h2>
          <p>Please log in to view your bookings.</p>
          <button onClick={() => navigate('/login')} className="btn-redirect">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const filteredBookings = getFilteredBookings();

  return (
    <div className="my-bookings-container">
      {/* Header */}
      <div className="bookings-header">
        <div className="header-content">
          <h1>My Bookings</h1>
          <p className="header-subtitle">View and manage all your service bookings</p>
        </div>
        <button onClick={() => navigate('/home')} className="btn-back-home">
          ← Back to Dashboard
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="filter-section">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Bookings ({bookings.length})
        </button>
        <button
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending ({bookings.filter(b => b.status === 'Pending').length})
        </button>
        <button
          className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
          onClick={() => setFilter('confirmed')}
        >
          Confirmed ({bookings.filter(b => b.status === 'Confirmed').length})
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed ({bookings.filter(b => b.status === 'Completed').length})
        </button>
      </div>

      {/* Bookings List */}
      <div className="bookings-content">
        {filteredBookings.length > 0 ? (
          <div className="bookings-grid">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                {/* Card Header */}
                <div className="card-header">
                  <div className="service-info">
                    <span className="service-icon">
                      {serviceIcons[booking.service] || '📋'}
                    </span>
                    <div className="service-details">
                      <h3 className="service-name">{booking.service}</h3>
                      <p className="booking-id">ID: {booking.id}</p>
                    </div>
                  </div>
                  <span className={`status-badge ${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                </div>

                {/* Card Body */}
                <div className="card-body">
                  <div className="detail-row">
                    <span className="detail-icon">📅</span>
                    <div className="detail-text">
                      <span className="detail-label">Date</span>
                      <span className="detail-value">
                        {new Date(booking.date).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          weekday: 'short'
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="detail-row">
                    <span className="detail-icon">⏰</span>
                    <div className="detail-text">
                      <span className="detail-label">Time</span>
                      <span className="detail-value">{booking.time}</span>
                    </div>
                  </div>

                  <div className="detail-row">
                    <span className="detail-icon">📍</span>
                    <div className="detail-text">
                      <span className="detail-label">Address</span>
                      <span className="detail-value">
                        {booking.bookingDetails?.address || 'Not specified'}
                      </span>
                    </div>
                  </div>

                  <div className="detail-row">
                    <span className="detail-icon">👨‍🔧</span>
                    <div className="detail-text">
                      <span className="detail-label">Technician</span>
                      <span className="detail-value">{booking.technician}</span>
                    </div>
                  </div>

                  {booking.bookingDetails?.description && (
                    <div className="detail-row">
                      <span className="detail-icon">💬</span>
                      <div className="detail-text">
                        <span className="detail-label">Problem Description</span>
                        <span className="detail-value description-text">
                          {booking.bookingDetails.description}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="detail-row">
                    <span className="detail-icon">📞</span>
                    <div className="detail-text">
                      <span className="detail-label">Contact</span>
                      <span className="detail-value">
                        {booking.bookingDetails?.phone || 'Not specified'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="card-footer">
                  {canCancelBooking(booking.status) ? (
                    <button
                      className="btn-cancel-booking"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      Cancel Booking
                    </button>
                  ) : (
                    <button className="btn-completed" disabled>
                      ✓ Completed
                    </button>
                  )}
                  <button
                    className="btn-view-details"
                    onClick={() => {
                      // Could expand to show more details or open a modal
                      // For now, we'll just keep it as a placeholder
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h2>No {filter !== 'all' ? filter : ''} Bookings</h2>
            <p>
              {filter === 'all'
                ? 'You have no service bookings yet. Start by booking a service!'
                : `You have no ${filter} bookings.`}
            </p>
            <button
              onClick={() => navigate('/book-service')}
              className="btn-book-now"
            >
              Book a Service
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
