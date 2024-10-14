import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './NavBar.css'; // Import your CSS
import Logo from './logo1.jpg';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
        <h1 className='logotext'>ভূমি জরিপ উন্নয়ন সংস্থা</h1>
      </div>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/"><h4>হোম</h4></Link>
        <div className="dropdown">
          <Link to="#services" className="dropbtn">সেবা</Link>
          <div className="dropdown-content">
            <Link to="#service1">সেবা ১</Link>
            <Link to="#service2">সেবা ২</Link>
            <Link to="#service3">সেবা ৩</Link>
          </div>
        </div>
        <Link to="/About">আমাদের-বিষয়ে</Link>
        <Link to="/contact">যোগাযোগ</Link> {/* Updated link */}
      </div>

      <div className="search-bar">
        <input type="text" placeholder="অনুসন্ধান করুন..." />
        <button type="submit"><h4>যাও</h4></button>
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        <span className="menu-bar"></span>
        <span className="menu-bar"></span>
        <span className="menu-bar"></span>
      </div>
    </nav>
  );
};

export default NavBar;
