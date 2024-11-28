import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaRuler, FaFileContract, FaHandshake, FaNewspaper } from 'react-icons/fa';
import { BiChevronDown } from 'react-icons/bi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import '../styles/Home.css';
import logo from "../assets/images/land survey.png"

const NewsHeader = () => {
  const news = [
    "নতুন ভূমি আইন ২০২৪ প্রকাশিত হয়েছে",
    "আগামী মাসে নতুন ডিজিটাল জরিপ শুরু হবে",
    "জমি রেজিস্ট্রেশন ফি ১০% কমেছে"
  ];

  const [currentNews, setCurrentNews] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNews(prev => (prev + 1) % news.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [news.length]);

  return (
    <div className="news-ticker">
      <div className="news-container">
        <div className="news-icon">
          <FaNewspaper />
        </div>
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentNews}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="news-text"
          >
            {news[currentNews]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

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
        { title: 'জমি জরিপ', link: '/services/survey' },
        { title: 'আইনি পরামর্শ', link: '/services/legal' },
        { title: 'প্রপার্টি লিস্টিং', link: '/services/listing' },
        { title: 'মৌজা মূল্যমান', link: '/mouza-price' }
      ]
    },
    { title: 'আমাদের সম্পর্কে', link: '/about' },
    { title: 'যোগাযোগ', link: '/contact' },
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
            <img src={logo} alt="Logo" className="nav-logo" />
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

const ServiceCard = ({ icon: Icon, title, description }) => (
  <motion.div 
    className="service-card"
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="service-icon">
      <Icon />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
    <button className="service-button">আরও জানুন</button>
  </motion.div>
);

const Home = () => {
  return (
    <div className="home-page">
      <NewsHeader />
      <Navigation />
      
      <header className="hero-section">
        <div className="hero-content">
          <h1>আপনার জমি, আমাদের দায়িত্ব</h1>
          <p>বিশ্বস্ত ভূমি সেবা প্রদানকারী প্রতিষ্ঠান</p>
          <button className="cta-button">যোগাযোগ করুন</button>
        </div>
      </header>

      <section className="services-section">
        <h2>আমাদের সেবাসমূহ</h2>
        <div className="services-grid">
          <ServiceCard 
            icon={FaRuler}
            title="জমি জরিপ"
            description="আধুনিক প্রযুক্তি ব্যবহার করে নির্ভুল জমি জরিপ সেবা"
          />
          <ServiceCard 
            icon={FaFileContract}
            title="আইনি পরামর্শ"
            description="অভিজ্ঞ আইনজীবীদের মাধ্যমে ভূমি সংক্রান্ত আইনি পরামর্শ"
          />
          <ServiceCard 
            icon={FaHandshake}
            title="প্রপার্টি বিক্রয়"
            description="নিরাপদ ও বিশ্বস্ত প্রপার্টি কেনা-বেচার মাধ্যম"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
