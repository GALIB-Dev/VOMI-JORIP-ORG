import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Footer.css';
import twelveBasesLogo from '../../assets/images/12Bases.png';
import { FaFileAlt } from 'react-icons/fa';
import { 
  FaFacebookF, 
  FaWhatsapp, 
  FaEnvelope, 
  FaMapMarkerAlt 
} from 'react-icons/fa';

/**
 * Footer component of the app.
 * 
 * It contains the main information of the app, some useful links, contact information and copyright information.
 * 
 * @returns {ReactElement} The JSX element for the Footer component.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Contact information
  const contactInfo = {
    facebook: "https://www.facebook.com/bhumi.jaripa.unnayana.sanstha",
    whatsapp: "https://wa.me/+8801712617226",
    email: "vjusrouf1980@gmail.com",
    address: "জয়পুরহাট-৫৯০০, বাংলাদেশ"
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Main Info */}
        <div className="footer-main">
          <h3>ভূমি জরিপ উন্নয়ন সংস্থা</h3>
          <p className="tagline">Transforming land survey since 2000</p>
          <div className="social-links">
            <a href={contactInfo.facebook} 
               target="_blank" 
               rel="noopener noreferrer" 
               aria-label="Facebook"
               className="social-link facebook">
              <FaFacebookF />
            </a>
            <a href={contactInfo.whatsapp}
               target="_blank" 
               rel="noopener noreferrer" 
               aria-label="WhatsApp"
               className="social-link whatsapp">
              <FaWhatsapp />
            </a>
            <a href={`mailto:${contactInfo.email}`}
               aria-label="Email"
               className="social-link email">
              <FaEnvelope />
            </a>
            <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer" aria-label="Privacy Policy" className="social-link privacy-policy">
              <FaFileAlt />
            </a>
          </div>
        </div>

        {/* Links Section */}
        <div className="footer-links">
          <div className="footer-section">
            <h4>মেনু</h4>
            <ul>
              <li><Link to="/">হোম</Link></li>
              <li><Link to="/about">আমাদের-বিষয়ে</Link></li>
              <li><Link to="/market">জমি বাজার</Link></li>
              <li><Link to="/contact">যোগাযোগ</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>সেবা</h4>
            <ul>
              <li><Link to="/PropertyForm">জমি বিক্রি</Link></li>
              <li><Link to="/office">অফিস</Link></li>
              <li><Link to="/contact">জমি জরিপ</Link></li>
              <li><Link to="/contact">ডিজিটাল জরিপ</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section contact">
            <h4>যোগাযোগ</h4>
            <ul>
              <li>
                <FaMapMarkerAlt />
                <span>{contactInfo.address}</span>
              </li>
              <li>
                <a href={contactInfo.whatsapp} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="contact-link">
                  <FaWhatsapp />
                  <span>+৮৮০১৭১২-৬১৭২২৬</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${contactInfo.email}`} 
                   className="contact-link">
                  <FaEnvelope />
                  <span>{contactInfo.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="footer-bottom">
        <div className="copyright">
          &copy; {currentYear} ভূমি জরিপ উন্নয়ন সংস্থা | All Rights Reserved
        </div>
        <div className="powered-by">
          Powered by{' '}
          <a 
            href="http://www.12bases.xyz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="twelve-bases-link"
          >
            <img 
              src={twelveBasesLogo} 
              alt="12Bases" 
              className="twelve-bases-logo"
            />
            12Bases
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
