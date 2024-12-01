// NavBar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/NavBar.css';
import logo from '../../assets/images/logo.jpg';
import { motion, AnimatePresence } from 'framer-motion';
import { FaNewspaper, FaPause, FaPlay } from 'react-icons/fa';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [currentNews, setCurrentNews] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.nav-container') && !e.target.closest('.menu-toggle')) {
        setMenuOpen(false);
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    // Handle body scroll when menu is open
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const newsItems = [
    "ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন, ২০২৩ প্রকাশিত হয়েছে",
    "ভূমি সংস্কার আইন, ২০২৩ এর নতুন সংস্করণ জারি করা হয়েছে",
    "বালুমহাল ও মাটি ব্যবস্থাপনা (সংশোধন) আইন, ২০২৩ কার্যকর হয়েছে",
    "হাট ও বাজার (স্থাপন ও ব্যবস্থাপনা) আইন, ২০২৩ অনুমোদিত হয়েছে",
    "স্থাবর সম্পত্তি অধিগ্রহণ ও হুকুমদখল আইন, ২০১৭ এর সংশোধনী প্রস্তাবিত",
    "পরিপত্র-৬৬৮: ভূমি কর্মকর্তাদের জন্য নতুন নির্দেশনা জারি",
    "অর্পিত সম্পত্তি প্রত্যর্পণ (দ্বিতীয় সংশোধন) আইন সংক্রান্ত গুরুত্বপূর্ণ বিজ্ঞপ্তি",
    "উন্নয়ন প্রকল্পে জলমহাল ইজারা প্রক্রিয়ার নতুন নীতিমালা প্রকাশিত"
  ];

  useEffect(() => {
    let timer;
    let progressTimer;

    if (!isPaused) {
      // News rotation timer
      timer = setInterval(() => {
        setCurrentNews(prev => (prev + 1) % newsItems.length);
        setProgress(0);
      }, 5000);

      // Progress bar animation
      progressTimer = setInterval(() => {
        setProgress(prev => Math.min(prev + 1, 100));
      }, 50);
    }

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, [isPaused, newsItems.length]);

  const navItems = [
    { path: '/', label: 'হোম' },
    {
      label: 'সেবা',
      dropdown: true,
      items: [
        { path: '/market', label: 'জমি বাজার' },
        { path: '/PropertyForm', label: 'জমি বিক্রি' },
        { path: '/Office', label: 'অফিস' }
      ]
    },
    { path: '/About', label: 'আমাদের-বিষয়ে' },
    { path: '/Contact', label: 'যোগাযোগ' }
  ];

  return (
    <>
      <div className="news-ticker" 
           onMouseEnter={() => setIsPaused(true)}
           onMouseLeave={() => setIsPaused(false)}>
        <div className="news-container">
          <div className="news-icon">
            <FaNewspaper className="news-icon-svg" />
            <button 
              className="pause-button"
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? "Play news" : "Pause news"}
            >
              {isPaused ? <FaPlay size={12} /> : <FaPause size={12} />}
            </button>
          </div>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentNews}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="news-text"
            >
              {newsItems[currentNews]}
            </motion.div>
          </AnimatePresence>
          <div className="news-indicators">
            {newsItems.map((_, index) => (
              <div 
                key={index}
                className={`indicator ${index === currentNews ? 'active' : ''}`}
                onClick={() => {
                  setCurrentNews(index);
                  setProgress(0);
                }}
              />
            ))}
          </div>
        </div>
        <div className="progress-bar">
          <motion.div 
            className="progress"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-content">
          {/* Brand */}
          <Link to="/" className="brand-container">
            <img src={logo} alt="ভূমি জরিপ Logo" className="nav-logo" />
            <span className="company-name">ভূমি জরিপ উন্নয়ন সংস্থা</span>
          </Link>

          {/* Navigation */}
          <div className="nav-container">
            <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
              {navItems.map((item, index) => (
                item.dropdown ? (
                  <div 
                    key={index} 
                    className={`dropdown ${dropdownOpen ? 'active' : ''}`}
                  >
                    <button 
                      className="nav-item dropbtn"
                      onClick={(e) => {
                        e.preventDefault();
                        setDropdownOpen(!dropdownOpen);
                      }}
                      aria-expanded={dropdownOpen}
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
                    className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>

            {/* Mobile Menu Button */}
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
