import React from 'react';
import { Link } from 'react-router-dom';
import './styles/NotFound.css'; // Optional: for styling
import characterImage from './assets/images/v.png'; // Ensure this path is correct

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <img 
        src={characterImage} 
        alt="Lost character" 
        className="animated-character" 
        aria-label="A character looking lost" // Accessibility improvement
      />
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default NotFound; 