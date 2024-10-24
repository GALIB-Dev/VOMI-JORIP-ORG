import React from 'react';
import './Contact.css'; // Assuming you have a Contact.css for styling

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>আমাদের অফিস: জয়পুরহাট সদর</h1>
        <p></p>
        <h3>ফোন নম্বর: <a href="tel:+8801712617226">+8801712617226</a></h3>
      </div>

      <div className="form-container">
        {/* Embed Google Form using iframe */}
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdGqM0iqdW3d3G2V7b_2w9aEQCnuIUJGXnP85b8VnuZId00eg/viewform?embedded=true"
          width="100%"
          height="600"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Contact Form"
        >
          লোড হচ্ছে...
        </iframe>
      </div>
    </div>
  );
};

export default Contact;
