import React from 'react';
import './Footer.css'; // Make sure to style your footer

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()}  ভূমি জরিপ উন্নয়ন সংস্থা. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;
