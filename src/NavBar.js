import React, { useState } from 'react';
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
        <a href="#home"><h2>⌂</h2></a>
        <div className="dropdown">
          <a href="#services" className="dropbtn">সেবা</a>
          <div className="dropdown-content">
            <a href="#service1">সেবা ১</a>
            <a href="#service2">সেবা ২</a>
            <a href="#service3">সেবা ৩</a>
          </div>
        </div>
        <a href="#about">আমাদের-বিষয়ে</a>
        <a href="#contact">যোগাযোগ</a>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="অনুসন্ধান করুন..." />
        <button type="submit">যাও</button>
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
