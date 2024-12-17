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

  // Scroll and outside click handling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (e) => {
      const navContainer = document.querySelector('.nav-container');
      const menuToggle = document.querySelector('.menu-toggle');
      
      if (
        navContainer && !navContainer.contains(e.target) &&
        menuToggle && !menuToggle.contains(e.target)
      ) {
        setMenuOpen(false);
        setDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
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

  // News items (same as previous implementation)
  const newsItems = [
    {
      category: 'আইন সংক্রান্ত',
      text: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন, ২০২৩ প্রকাশিত হয়েছে',
    },
    // ... (rest of the news items remain the same)
  ];

  // News ticker scrolling logic (same as previous implementation)
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const newsTextElement = document.querySelector('.news-text');
    if (!newsTextElement) return;

    const scrollNews = () => {
      const textWidth = newsTextElement.offsetWidth;
      const screenWidth = window.innerWidth;
      
      setScrollPosition((prev) => {
        const nextPosition = prev - 1;
        return nextPosition < -textWidth ? screenWidth : nextPosition;
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

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  return (
    <>
      {/* News Ticker */}
      <div className="news-ticker" aria-label="Latest News">
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
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation">
        <div className="navbar-content">
          {/* Brand Logo - Improved for mobile visibility */}
          <Link to="/" className="brand-container">
            <img
              src="https://i.ibb.co/5WxP9T3/logo.png"
              alt="Logo"
              className="nav-logo mobile-logo"
              style={{
                height: '50px',
                width: 'auto',
                maxWidth: '100%',
                objectFit: 'contain'
              }}
            />
            <span className="company-name">
              ভূমি জরিপ উন্নয়ন সংস্থা
            </span>
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
                      onClick={toggleDropdown}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <span className="dropdown-arrow" aria-hidden="true">▼</span>
                    </button>
                    <div 
                      className="dropdown-content" 
                      aria-hidden={!dropdownOpen}
                    >
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
              <Link 
                to="/login" 
                className="login-button"
                aria-label="Login"
              >
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
              <span className="menu-bar top-bar" aria-hidden="true"></span>
              <span className="menu-bar bottom-bar" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;