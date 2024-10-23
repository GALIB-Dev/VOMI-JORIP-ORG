import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Powered by <a href="https://12bases.xyz" target="_blank" rel="noopener noreferrer">          <span style={{ color: 'red' }}> <b>Ⅻ</b></span> 𝘽𝘼𝙎𝙀𝙎
        </a>
      </p>


      <p>&copy; {new Date().getFullYear()} ভূমি জরিপ উন্নয়ন সংস্থা. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;
