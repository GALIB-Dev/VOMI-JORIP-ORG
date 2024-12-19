import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaRuler, FaFileContract, FaHandshake, FaCalculator } from 'react-icons/fa';
import { BiChevronDown } from 'react-icons/bi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import '../styles/Home.css';
import { useNavigate, Link } from 'react-router-dom';

// Navigation Component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Add window resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { 
      title: 'হোম',
      link: '/',
      mobileOnly: true,
      icon: faEyeSlash
    },
    {
      title: 'সেবাসমূহ',
      dropdown: [
        { title: 'জমি জরিপ', link: '/Contact' },
        { title: 'আইনি পরামর্শ', link: '/services/legal' },
        { title: 'মৌজা মূল্যমান', link: '/mouza-price' }
      ]
    },
    { title: 'আমাদের সম্পর্কে', link: '/About' },
    { title: 'নিয়োগ আবেদন', link: 'https://docs.google.com/forms/d/e/1FAIpQLSdcY-vclaXRo5aa2uNhLYRWe0DMdARDqBI4PKwpvmY7JJ_vtw/viewform?usp=sf_link' },
    { title: 'মার্কেট', link: '/market' }
  ];

  const handleDropdownClick = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <div className="nav-wrapper">
      <div className="header-container">
        <div className="nav-top">
          <div className="left-section">
            <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <div className="brand-section">
            <img src="https://i.ibb.co/RY4sVs0/land-survey.png" alt="Logo" className="nav-logo" />
            <span className="brand-name">ভূমি সেবা</span>
          </div>
        </div>
      </div>
      
      <nav className="navigation">
        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {menuItems.map((item, index) => (
            (!item.mobileOnly || isMobile) && (
              <div 
                key={index} 
                className={`nav-item ${activeDropdown === index ? 'active' : ''}`}
              >
                {item.dropdown ? (
                  <button 
                    className="nav-link"
                    onClick={() => handleDropdownClick(index)}
                  >
                    {item.title}
                    <BiChevronDown className={`dropdown-arrow ${activeDropdown === index ? 'rotate' : ''}`} />
                  </button>
                ) : (
                  <a href={item.link} className="nav-link" onClick={closeMenu}>
                    {item.title}
                    {isMobile && item.icon && (
                      <FontAwesomeIcon icon={item.icon} className="mobile-icon" />
                    )}
                  </a>
                )}
                
                {item.dropdown && (
                  <motion.div 
                    className="dropdown-menu"
                    initial={false}
                    animate={activeDropdown === index ? {
                      opacity: 1,
                      height: 'auto',
                      visibility: 'visible'
                    } : {
                      opacity: 0,
                      height: 0,
                      visibility: 'hidden'
                    }}
                  >
                    {item.dropdown.map((subItem, subIndex) => (
                      <a 
                        key={subIndex} 
                        href={subItem.link} 
                        className="dropdown-item"
                        onClick={closeMenu}
                      >
                        {subItem.title}
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>
            )
          ))}
        </div>
      </nav>
    </div>
  );
};

// ServiceCard Component
const ServiceCard = ({ icon: Icon, title, description, onClick }) => {
  return (
    <motion.div 
      className="service-card"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="service-icon" />
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  );
};

// LandCalculator Component
const LandCalculator = () => {
  const [values, setValues] = useState({
    bigha: '',
    katha: '',
    decimal: '',
    squareFeet: ''
  });

  // Updated conversions based on Bangladesh land measurements
  const conversions = {
    bigha: 33, // 1 bigha = 33 decimal
    katha: 1.65, // 1 katha = 1.65 decimal
    squareFeet: 435.6 // 1 decimal = 435.6 sq ft
  };

  const handleChange = (unit, value) => {
    if (value === '' || isNaN(value)) {
      setValues({
        bigha: '',
        katha: '',
        decimal: '',
        squareFeet: ''
      });
      return;
    }

    let decimal = 0;
    const numValue = parseFloat(value);

    switch(unit) {
      case 'bigha':
        decimal = numValue * conversions.bigha;
        break;
      case 'katha':
        decimal = numValue * conversions.katha;
        break;
      case 'decimal':
        decimal = numValue;
        break;
      case 'squareFeet':
        decimal = numValue / conversions.squareFeet;
        break;
      default:
        break;
    }

    setValues({
      bigha: (decimal / conversions.bigha).toFixed(4),
      katha: (decimal / conversions.katha).toFixed(4),
      decimal: decimal.toFixed(4),
      squareFeet: (decimal * conversions.squareFeet).toFixed(4)
    });
  };

  return (
    <div className="calculator-section">
      <div className="calculator-header">
        <FaCalculator className="calculator-icon" />
        <h2>জমি পরিমাপ ক্যালকুলেটর</h2>
        <p className="calculator-subtitle">বাংলাদেশী জমি পরিমাপ একক রূপান্তর</p>
      </div>
      <div className="calculator-grid">
        <div className="calc-input-group">
          <label>বিঘা</label>
          <input
            type="number"
            value={values.bigha}
            onChange={(e) => handleChange('bigha', e.target.value)}
            placeholder="0.0000"
            min="0"
            step="any"
          />
        </div>
        <div className="calc-input-group">
          <label>কাঠা</label>
          <input
            type="number"
            value={values.katha}
            onChange={(e) => handleChange('katha', e.target.value)}
            placeholder="0.0000"
            min="0"
            step="any"
          />
        </div>
        <div className="calc-input-group">
          <label>ডেসিমাল</label>
          <input
            type="number"
            value={values.decimal}
            onChange={(e) => handleChange('decimal', e.target.value)}
            placeholder="0.0000"
            min="0"
            step="any"
          />
        </div>
        <div className="calc-input-group">
          <label>বর্গফুট</label>
          <input
            type="number"
            value={values.squareFeet}
            onChange={(e) => handleChange('squareFeet', e.target.value)}
            placeholder="0.0000"
            min="0"
            step="any"
          />
        </div>
      </div>
    </div>
  );
};

// Main Home Component
const Home = () => {
  const navigate = useNavigate();

  const handleServiceClick = (service) => {
    switch (service) {
      case 'survey':
        navigate('/contact');
        break;
      case 'legal':
        navigate('/services/legal');
        break;
      case 'property':
        navigate('/propertyform');
        break;
      default:
        break;
    }
  };

  return (
    <div className="home-page">
      <Navigation />
      
      <header className="hero-section">
        <div className="hero-content">
          <h1>আপনার জমি, আমাদের দায়িত্ব</h1>
          <p>বিশ্বস্ত ভূমি সেবা প্রদানকারী প্রতিষ্ঠান</p>
          <Link to="/contact" className="cta-button">যোগাযোগ করুন</Link>
        </div>
      </header>

      <section className="services-section">
        <h2>আমাদের সেবাসমূহ</h2>
        <div className="services-grid">
          <ServiceCard 
            icon={FaRuler}
            title="জমি জরিপ"
            description="আধুনিক প্রযুক্তি ব্যবহার করে নির্ভুল জমি জরিপ সেবা"
            onClick={() => handleServiceClick('survey')}
          />
          <ServiceCard 
            icon={FaFileContract}
            title="আইনি পরামর্শ"
            description="অভিজ্ঞ আইনজীবীদের মাধ্যমে ভূমি সংক্রান্ত আইনি পরামর্শ"
            onClick={() => handleServiceClick('legal')}
          />
          <ServiceCard 
            icon={FaHandshake}
            title="প্রপার্টি বিক্রয়"
            description="নিরাপদ ও বিশ্বস্ত প্রপার্টি কেনা-বেচার মাধ্যম"
            onClick={() => handleServiceClick('property')}
          />
        </div>
        <LandCalculator />
      </section>
    </div>
  );
};

export default Home;
