// src/Loading.js
import React from 'react';
import './Loading.css'; // Make sure this file exists
import Spin from './Spin.png'; // Ensure the image path is correct

const Loading = () => {
  return (
    <div className="loading-screen">
      <img src={Spin} alt="Loading..." className="loading-image" />
      <h2>Loading...</h2>
    </div>
  );
};

export default Loading;
