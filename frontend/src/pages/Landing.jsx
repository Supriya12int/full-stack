import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Landing.css';
import '../styles/About.css';
import '../styles/Services.css';
import '../styles/Features.css';
import '../styles/Contact.css';

const Landing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = React.useState(false);

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

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

  const features = [
    { id: 1, icon: '✅', title: 'Easy Booking', description: 'Book home services quickly with a simple and user-friendly interface' },
    { id: 2, icon: '✔️', title: 'Verified Professionals', description: 'All technicians are verified and trained to provide high-quality services' },
    { id: 3, icon: '📍', title: 'Service Tracking', description: 'Track your service requests and appointment status in real time' },
    { id: 4, icon: '💰', title: 'Affordable Pricing', description: 'Transparent pricing with no hidden charges for all services' },
    { id: 5, icon: '⭐', title: 'Ratings & Reviews', description: 'Check customer reviews and ratings before choosing a service provider' },
  ];

  return (
    <div className="landing-main-container">
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-icon">🔧</span>
            HelpHub
          </h1>
          <p className="hero-subtitle">
            Your Trusted Home Service Partner
          </p>
          <p className="hero-description">
            Book reliable home services like plumbing, electrical repair, AC servicing, and home cleaning in just a few clicks.
            Fast, affordable, and trusted professionals at your doorstep.
          </p>
          <div className="hero-buttons">
            <button 
              className="btn-primary-large"
              onClick={() => navigate('/signup')}
            >
              Book a Service
            </button>
            <button 
              className="btn-secondary-large"
              onClick={() => {
                document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Services
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="floating-card">
            <div className="card-icon">🏠</div>
            <p>Home Services</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="services-hero">
          <h1>Our Home Services</h1>
          <p className="services-subtitle">
            Comprehensive solutions for all your home maintenance needs
          </p>
        </div>

        <div className="services-grid-section">
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
        </div>

        <div className="services-cta">
          <h2>Ready to Book Your Service?</h2>
          <p>Choose from our wide range of home service professionals</p>
          <button className="cta-button" onClick={() => navigate('/signup')}>Book Now</button>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <h2>How HelpHub Works</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Choose a Service</h3>
            <p>Select the type of home service you need.</p>
            <div className="step-icon">🔍</div>
          </div>
          <div className="step-divider"></div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Book an Appointment</h3>
            <p>Choose a convenient date and time for the service.</p>
            <div className="step-icon">📅</div>
          </div>
          <div className="step-divider"></div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Professional at Your Doorstep</h3>
            <p>A verified technician arrives and completes the service.</p>
            <div className="step-icon">👨‍🔧</div>
          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section id="service-categories" className="service-categories-section">
        <h2>Our Popular Services</h2>
        <div className="service-categories-grid">
          <div className="service-category-card">
            <div className="category-icon">🔧</div>
            <h3>Plumbing</h3>
          </div>
          <div className="service-category-card">
            <div className="category-icon">⚡</div>
            <h3>Electrical</h3>
          </div>
          <div className="service-category-card">
            <div className="category-icon">❄️</div>
            <h3>AC Repair</h3>
          </div>
          <div className="service-category-card">
            <div className="category-icon">🧹</div>
            <h3>Home Cleaning</h3>
          </div>
          <div className="service-category-card">
            <div className="category-icon">🔌</div>
            <h3>Appliance Repair</h3>
          </div>
          <div className="service-category-card">
            <div className="category-icon">🚿</div>
            <h3>Bathroom Repair</h3>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="features-hero">
          <h1>Why Choose HelpHub</h1>
          <p className="features-subtitle">
            Everything you need for reliable home services
          </p>
        </div>

        <div className="features-grid-section">
          <div className="features-grid">
            {features.map((feature) => (
              <div key={feature.id} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="features-highlight">
          <div className="highlight-content">
            <h2>What Our Customers Say</h2>
            <div className="highlight-reasons">
              <div className="reason-item">
                <span className="check-mark">✅</span>
                <p>Quick and reliable service</p>
              </div>
              <div className="reason-item">
                <span className="check-mark">✅</span>
                <p>Professional and courteous technicians</p>
              </div>
              <div className="reason-item">
                <span className="check-mark">✅</span>
                <p>Transparent and fair pricing</p>
              </div>
              <div className="reason-item">
                <span className="check-mark">✅</span>
                <p>Guaranteed satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-hero">
          <h1>Contact Us</h1>
          <p className="contact-subtitle">
            We'd love to hear from you. Get in touch with our team
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Location</h3>
              <p>Hyderabad, Telangana, India</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📧</div>
              <h3>Email</h3>
              <p>support@helphub.com</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>Phone</h3>
              <p>+91 XXXXX XXXXX</p>
            </div>

            <div className="info-card">
              <div className="info-icon">⏰</div>
              <h3>Support Hours</h3>
              <p>24/7 Live Chat</p>
              <p>Available every day</p>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <h2>Send us a Message</h2>
            {submitted && (
              <div className="success-message">
                ✓ Thank you! We'll get back to you soon.
              </div>
            )}
            <form onSubmit={handleContactSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleContactChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleContactChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleContactChange}
                  required
                  placeholder="How can we help?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleContactChange}
                  required
                  placeholder="Tell us more..."
                  rows="5"
                ></textarea>
              </div>

              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="contact-cta">
          <h2>Still have questions?</h2>
          <p>Check out our FAQ or reach out to our support team</p>
          <button className="cta-button-contact">View FAQ</button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
