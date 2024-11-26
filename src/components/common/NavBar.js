// NavBar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/NavBar.css';
import logo from '../../assets/images/logo.jpg';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
  );
};

export default NavBar;
