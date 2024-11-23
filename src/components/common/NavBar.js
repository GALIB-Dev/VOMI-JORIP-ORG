// NavBar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/NavBar.css';
import logo from '../../assets/images/logo.jpg';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check system dark mode preference
  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeQuery.matches);

    const handler = (e) => setIsDarkMode(e.matches);
    darkModeQuery.addListener(handler);
    return () => darkModeQuery.removeListener(handler);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="navbar-brand">
        <Link to="/" className="brand-container">
          <img 
            src={logo} 
            alt="Vomi Jorip Logo" 
            className="nav-logo"
          />
          <span className="company-name">ভূমি জরিপ উন্নয়ন সংস্থা</span>
        </Link>
      </div>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-item">হোম</Link>
        <div className="dropdown">
          <button className="dropbtn nav-item">সেবা</button>
          <div className="dropdown-content">
            <Link to="/market">জমি বাজার</Link>
            <Link to="/PropertyForm">জমি বিক্রি</Link>
            <Link to="/Office">অফিস</Link>
          </div>
        </div>
        <Link to="/About" className="nav-item">আমাদের-বিষয়ে</Link>
        <Link to="/Contact" className="nav-item">যোগাযোগ</Link>
      </div>

      <button 
        className={`menu-toggle ${menuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-expanded={menuOpen}
        aria-label="Toggle navigation"
      >
        <span className="menu-bar"></span>
        <span className="menu-bar"></span>
        <span className="menu-bar"></span>
      </button>
    </nav>
  );
};

export default NavBar;
