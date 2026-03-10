import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    navigate('/');
    setMobileMenuOpen(false);
  };

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      // Already on landing page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home and then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <nav className="navbar-main">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🚀</span> HelpHub
        </Link>

        <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <button 
            className="nav-link-btn"
            onClick={() => handleNavClick('about')}
          >
            About
          </button>
          <Link to="/services" className="nav-link-btn" style={{ borderBottom: 'none', paddingBottom: 0, cursor: 'pointer' }}>
            Services
          </Link>
          <button 
            className="nav-link-btn"
            onClick={() => handleNavClick('how-it-works')}
          >
            How It Works
          </button>
          <button 
            className="nav-link-btn"
            onClick={() => handleNavClick('features')}
          >
            Features
          </button>
          <button 
            className="nav-link-btn"
            onClick={() => handleNavClick('contact')}
          >
            Contact
          </button>
        </div>

        <div className="nav-buttons">
          {isAuthenticated ? (
            <div className="auth-menu">
              <span className="user-name">Hi, {user?.name}</span>
              <Link to="/home" className="nav-btn btn-primary">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="nav-btn btn-logout">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-btn btn-secondary">
                Login
              </Link>
              <Link to="/signup" className="nav-btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>

        <div
          className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
