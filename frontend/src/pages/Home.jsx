import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

const Home = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingServices: 0,
    completedServices: 0
  });

  // Load bookings from localStorage on component mount
  useEffect(() => {
    const loadBookings = () => {
      const savedBookings = localStorage.getItem('userBookings');
      const parsedBookings = savedBookings ? JSON.parse(savedBookings) : [];
      setUpcomingBookings(parsedBookings);

      // Calculate stats based on bookings
      const upcoming = parsedBookings.filter(b => b.status === 'Pending' || b.status === 'Confirmed').length;
      const completed = parsedBookings.filter(b => b.status === 'Completed').length;
      
      setStats({
        totalBookings: parsedBookings.length,
        upcomingServices: upcoming,
        completedServices: completed
      });
    };

    // Initial load
    loadBookings();

    // Listen for booking updates
    window.addEventListener('bookingUpdated', loadBookings);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('bookingUpdated', loadBookings);
    };
  }, []);

  const popularServices = [
    { id: 1, name: 'Plumbing Repair', icon: '🔧', description: 'Professional plumbing solutions for all issues', price: '₹199-₹499' },
    { id: 2, name: 'Electrical Repair', icon: '⚡', description: 'Expert electrical maintenance and repairs', price: '₹299-₹699' },
    { id: 3, name: 'AC Repair & Maintenance', icon: '❄️', description: 'AC servicing and repair by certified technicians', price: '₹399-₹899' },
    { id: 4, name: 'Home Cleaning', icon: '🧹', description: 'Deep cleaning services for your home', price: '₹349-₹799' }
  ];

  const quickActions = [
    { id: 1, title: 'My Bookings', icon: '📋', description: 'View all your scheduled services', color: '#3B82F6' },
    { id: 2, title: 'Book New Service', icon: '➕', description: 'Schedule a new home service', color: '#22C55E' },
    { id: 3, title: 'Service History', icon: '✅', description: 'View completed services', color: '#8B5CF6' },
    { id: 4, title: 'Account Settings', icon: '⚙️', description: 'Manage your profile', color: '#F59E0B' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return (
      <div className="home-container">
        <div className="unauthorized-message">
          <h2>Access Denied</h2>
          <p>Please log in to access this page.</p>
          <button onClick={() => navigate('/login')} className="btn-redirect">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1>Dashboard</h1>
          <p className="header-subtitle">Welcome back, {user?.firstName || 'User'} 👋</p>
        </div>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>

      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <h2>Welcome back, <span className="user-name">{user?.firstName || 'User'}</span> 👋</h2>
          <p className="welcome-subtitle">Email: {user?.email}</p>
          <p className="welcome-description">Manage your home service bookings in one place.</p>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <p className="stat-label">Total Bookings</p>
            <p className="stat-value">{stats.totalBookings}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <p className="stat-label">Upcoming Services</p>
            <p className="stat-value">{stats.upcomingServices}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✔️</div>
          <div className="stat-content">
            <p className="stat-label">Completed Services</p>
            <p className="stat-value">{stats.completedServices}</p>
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="quick-actions-section">
        <h3 className="section-title">Quick Actions</h3>
        <div className="actions-grid">
          {quickActions.map((action) => (
            <div key={action.id} className="action-card" style={{ borderTopColor: action.color }}>
              <div className="action-icon" style={{ backgroundColor: action.color }}>
                {action.icon}
              </div>
              <h4 className="action-title">{action.title}</h4>
              <p className="action-description">{action.description}</p>
              <button 
                className="action-btn"
                onClick={() => {
                  if (action.id === 1) navigate('/my-bookings');
                  else if (action.id === 2) navigate('/book-service');
                }}
              >
                Manage →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Services Section */}
      <div className="popular-services-section">
        <h3 className="section-title">Popular Services</h3>
        <div className="services-grid">
          {popularServices.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h4 className="service-name">{service.name}</h4>
              <p className="service-description">{service.description}</p>
              <p className="service-price">{service.price}</p>
              <button 
                className="btn-book-now"
                onClick={() => navigate('/book-service')}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Bookings Section */}
      <div className="upcoming-bookings-section">
        <h3 className="section-title">Upcoming Bookings</h3>
        {upcomingBookings.length > 0 ? (
          <div className="bookings-list">
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <div className="booking-left">
                  <h4 className="booking-service">{booking.service}</h4>
                  <div className="booking-details">
                    <span className="detail">📅 {new Date(booking.date).toLocaleDateString()}</span>
                    <span className="detail">⏰ {booking.time}</span>
                  </div>
                  <p className="booking-technician">Technician: <strong>{booking.technician}</strong></p>
                </div>
                <div className="booking-right">
                  <span className={`status-badge ${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                  <button className="btn-view-details">View Details →</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-bookings">
            <p>📭 You have no upcoming services. Book your first service today!</p>
            <button 
              className="btn-book-service"
              onClick={() => navigate('/book-service')}
            >
              Book a Service
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
