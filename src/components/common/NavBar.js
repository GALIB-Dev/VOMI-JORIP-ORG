import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/NavBar.css';
import { motion } from 'framer-motion';
import { FaUser } from 'react-icons/fa';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);

  // Handle navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu and dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest('.nav-container') &&
        !e.target.closest('.menu-toggle')
      ) {
        setMenuOpen(false);
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  // Disable body scrolling when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  // News items
  const newsItems = [
    {
      category: 'আইন সংক্রান্ত',
      text: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন, ২০২৩ প্রকাশিত হয়েছে',
    },
    {
      category: 'নতুন আইন',
      text: 'ভূমি সংস্কার আইন, ২০২৩ এর নতুন সংস্করণ জারি করা হয়েছে',
    },
    // ... Add remaining news items
  ];

  // News ticker scrolling effect
  useEffect(() => {
    const scrollNews = () => {
      setScrollPosition((prev) => {
        const textWidth = document.querySelector('.news-text')?.offsetWidth || 0;
        const nextPosition = prev - 1;
        return nextPosition < -textWidth ? window.innerWidth : nextPosition;
      });
    };

    const scrollInterval = setInterval(scrollNews, 30);
    return () => clearInterval(scrollInterval);
  }, []);

  // Navbar items
  const navItems = [
    { path: '/', label: 'হোম' },
    {
      label: 'সেবা',
      dropdown: true,
      items: [
        { path: '/market', label: 'জমি বাজার' },
        { path: '/PropertyForm', label: 'জমি বিক্রি' },
        { path: '/Office', label: 'অফিস' },
      ],
    },
    { path: '/About', label: 'আমাদের-বিষয়ে' },
    { path: '/Contact', label: 'যোগাযোগ' },
  ];

  return (
    <>
      {/* News Ticker */}
      <div className="news-ticker">
        <div className="news-container">
          <motion.div
            className="news-text"
            style={{
              transform: `translateX(${scrollPosition}px)`,
              whiteSpace: 'nowrap',
            }}
            transition={{ type: 'tween', ease: 'linear' }}
          >
            {newsItems.map((item, index) => (
              <span key={index}>
                <span className="news-category">{item.category}:</span>
                <span className="news-content">{item.text}</span>
                {' | '}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-content">
          {/* Brand Logo */}
          <Link to="/" className="brand-container">
            <img
              src="https://i.ibb.co/5WxP9T3/logo.png"
              alt="ভূমি জরিপ Logo"
              className="nav-logo"
            />
            <span className="company-name">ভূমি জরিপ উন্নয়ন সংস্থা</span>
          </Link>

          {/* Navigation Links */}
          <div className="nav-container">
            <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
              {navItems.map((item, index) =>
                item.dropdown ? (
                  <div
                    key={index}
                    className={`dropdown ${dropdownOpen ? 'active' : ''}`}
                  >
                    <button
                      className="nav-item dropbtn"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <span className="dropdown-arrow">▼</span>
                    </button>
                    <div className="dropdown-content">
                      {item.items.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          onClick={() => {
                            setDropdownOpen(false);
                            setMenuOpen(false);
                          }}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={index}
                    to={item.path}
                    className={`nav-item ${
                      location.pathname === item.path ? 'active' : ''
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
              {/* Login Button */}
              <Link to="/login" className="login-button">
                <FaUser className="login-icon" />
                <span></span>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className={`menu-toggle ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className="menu-bar top-bar"></span>
              <span className="menu-bar bottom-bar"></span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
