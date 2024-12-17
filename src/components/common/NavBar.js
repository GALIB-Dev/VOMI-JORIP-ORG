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

  // News items with more robust scrolling
  const newsItems = [
    {
      category: 'আইন সংক্রান্ত',
      text: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন, ২০২৩ প্রকাশিত হয়েছে',
    },
    {
      category: 'নতুন আইন',
      text: 'ভূমি সংস্কার আইন, ২০২৩ এর নতুন সংস্করণ জারি করা হয়েছে',
    },
    {
      category: 'জমি নিবন্ধন',
      text: 'অনলাইন জমি নিবন্ধন সিস্টেম চালু করা হয়েছে',
    },
    {
      category: 'সরকারি নীতি',
      text: '  সাম্প্রতিক ভূমি ব্যবস্থাপনা নীতিমালা সম্পর্কে গুরুত্বপূর্ণ তথ্য',
    },
    {
      category: 'প্রকল্প',
      text: '    ডিজিটাল ভূমি ব্যবস্থাপনা প্রকল্পের নতুন পর্যায় শুরু',
    },
    {
      category: 'সেবা',
      text: '             জমি সংক্রান্ত সকল তথ্য এখন আরও সহজলভ্য',
    },
    {
      category: 'আইনগত পরামর্শ',
      text: 'জমি সংক্রান্ত আইনি পরামর্শ দেওয়ার নতুন ব্যবস্থা চালু',
    },
    {
      category: 'সংবাদ',
      text: '            ভূমি ব্যবস্থাপনা উন্নয়নে নতুন পদক্ষেপ গৃহীত',
    },
    {
      category: 'প্রযুক্তি',
      text: 'ভূমি তথ্য ব্যবস্থাপনায় নতুন ডিজিটাল সমাধান',
    },
    {
      category: 'নিবন্ধন',
      text: '       জমি নিবন্ধন প্রক্রিয়ায় আরও স্বচ্ছতা আনা হচ্ছে',
    },
    {
      category: 'সম্মেলন',
      text: '           জাতীয় ভূমি ব্যবস্থাপনা সম্মেলন আগামী মাসে অনুষ্ঠিত হবে',
    },
    {
      category: 'পরিকল্পনা',
      text: '         দেশব্যাপী ভূমি সমীক্ষা প্রকল্পের উদ্বোধন',
    }
  ];

  // News ticker scrolling with more reliable calculation
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

  // Navbar items with improved accessibility
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

  // Toggle dropdown with improved accessibility
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
          {/* Brand Logo */}
          <Link>
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  }}>
    <img
      src="https://i.ibb.co/5WxP9T3/logo.png"
      alt=""
      style={{
        height: '40px',
        width: 'auto',
        maxHeight: '100%',
        objectFit: 'contain',
        display: 'block'
      }}
    />
    <span 
      style={{
        fontSize: '1rem',
        fontWeight: 'bold'
      }}
    >
      ভূমি জরিপ উন্নয়ন সংস্থা
    </span>
  </div>
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