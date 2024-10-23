import React from 'react';

const PropertyForm = () => {
  const googleFormLink = "https://docs.google.com/forms/d/e/1FAIpQLSdGqM0iqdW3d3G2V7b_2w9aEQCnuIUJGXnP85b8VnuZId00eg/viewform?usp=sf_link"; // Replace with your actual Google Form link

  return (
    <div className="form-container">
      <h2>Submit Property Information</h2>
      <p>Please fill out the form below to submit your property information:</p>
      <a 
        href={googleFormLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="form-link"
      >
        Open Property Form
      </a>
    </div>
  );
};

export default PropertyForm;
