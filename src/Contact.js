import React from 'react';
import './Contact.css'; // Assuming you have a Contact.css for styling

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>যোগাযোগ করুন</h1>
        <p>আমাদের অফিস: জয়পুরহাট সদর</p>
        <h3>ফোন নম্বর: <a href="tel:+8801712617226">+8801712617226</a></h3>
      </div>

      <div className="form-container">
        {/* Embed Google Form using iframe */}
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdDqfr5xJNfY9EBSkleQ3oQhON1FlvZEmvBnFZOYBouo71hzw/viewform?embedded=true"
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
