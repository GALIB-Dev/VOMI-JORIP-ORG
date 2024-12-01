import React from 'react';
import '../styles/Contact.css';
import { FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-hero">
        <h1>যোগাযোগ করুন</h1>
        <p>আপনার যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-card">
            <FaMapMarkerAlt className="info-icon" />
            <h3>ঠিকানা</h3>
            <p>জয়পুরহাট সদর</p>
          </div>

          <div className="info-card">
            <FaPhone className="info-icon" />
            <h3>ফোন</h3>
            <a href="tel:+8801712617226">+880 1712-617226</a>
          </div>

          <div className="info-card">
            <FaClock className="info-icon" />
            <h3>কার্যালয়ের সময়</h3>
            <p>রবিবার - বৃহস্পতিবার</p>
            <p>সকাল ৯টা - বিকাল ৫টা</p>
          </div>
        </div>

        <div className="form-container">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdDqfr5xJNfY9EBSkleQ3oQhON1FlvZEmvBnFZOYBouo71hzw/viewform?embedded=true"
            width="100%"
            height="800"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="Contact Form"
          >
            লোড হচ্ছে...
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
