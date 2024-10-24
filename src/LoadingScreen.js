import React from 'react';
import './LoadingScreen.css';

function LoadingScreen() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Loading<span className="loading-dots">...</span></p>
    </div>
  );
}

export default LoadingScreen;
