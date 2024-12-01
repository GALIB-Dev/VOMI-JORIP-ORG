// NavBar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/NavBar.css';
import logo from '../../assets/images/logo.jpg';
import { motion } from 'framer-motion';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);

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
    { 
      category: "আইন সংক্রান্ত",
      text: "ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন, ২০২৩ প্রকাশিত হয়েছে"
    },
    {
      category: "নতুন আইন",
      text: "ভূমি সংস্কার আইন, ২০২৩ এর নতুন সংস্করণ জারি করা হয়েছে"
    },
    {
      category: "আইন সংক্রান্ত",
      text: "বালুমহাল ও মাটি ব্যবস্থাপনা (সংশোধন) আইন, ২০২৩ কার্যকর হয়েছে"
    },
    {
      category: "আইন সংক্রান্ত",
      text: "হাট ও বাজার (স্থাপন ও ব্যবস্থাপনা) আইন, ২০২৩ অনুমোদিত হয়েছে"
    },
    {
      category: "আইন সংক্রান্ত",
      text: "স্থাবর সম্পত্তি অধিগ্রহণ ও হুকুমদখল আইন, ২০১৭ এর সংশোধনী প্রস্তাবিত"
    },
    {
      category: "নতুন আইন",
      text: "পরিপত্র-৬৬৮: ভূমি কর্মকর্তাদের জন্য নতুন নির্দেশনা জারি"
    },
    {
      category: "আইন সংক্রান্ত",
      text: "অর্পিত সম্পত্তি প্রত্যর্পণ (দ্বিতীয় সংশোধন) আইন সংক্রান্ত গুরুত্বপূর্ণ বিজ্ঞপ্তি"
    },
    {
      category: "নতুন আইন",
      text: "উন্নয়ন প্রকল্পে জলমহাল ইজারা প্রক্রিয়ার নতুন নীতিমালা প্রকাশিত"
    }
  ];

  useEffect(() => {
    let scrollTimer;
    
    scrollTimer = setInterval(() => {
      setScrollPosition(prev => {
        const nextPosition = prev - 1;
        const textWidth = document.querySelector('.news-text')?.offsetWidth || 0;
        return nextPosition < -textWidth ? 0 : nextPosition;
      });
    }, 30);

    return () => clearInterval(scrollTimer);
  }, []);

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
      <div className="news-ticker">
        <div className="news-container">
          <div className="news-scroll-container">
            <motion.div
              className="news-text"
              style={{
                x: scrollPosition,
                whiteSpace: 'nowrap'
              }}
              transition={{ type: "tween", ease: "linear" }}
            >
              {newsItems.map((item, index) => (
                <span key={index}>
                  <span className="news-category">{item.category}</span>
                  <span className="news-content">{item.text}</span>
                  {" | "}
                </span>
              ))}
            </motion.div>
          </div>
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
