import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Company Info */}
        <div className="footer-section">
          <h3>ভূমি জরিপ উন্নয়ন সংস্থা</h3>
          <p>Providing quality land survey services since 2020</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/market">Market</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h4>Our Services</h4>
          <ul>
            <li><Link to="/PropertyForm">Property Form</Link></li>
            <li><Link to="/office">Office</Link></li>
            <li>Land Survey</li>
            <li>Digital Survey</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul className="contact-info">
            <li>
              <i className="fas fa-map-marker-alt"></i>
              123 Survey Road, Dhaka, Bangladesh
            </li>
            <li>
              <i className="fas fa-phone"></i>
              +880 1234-567890
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              info@vomijorip.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>&copy; {currentYear} ভূমি জরিপ উন্নয়ন সংস্থা. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
