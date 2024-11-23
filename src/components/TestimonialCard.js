import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa'; // Import quote icon

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div 
      className="testimonial-card"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="testimonial-content">
        <FaQuoteLeft className="quote-icon" />
        <p className="content">{testimonial.content}</p>
        <div className="testimonial-author">
          <h3>{testimonial.name}</h3>
          <p className="role">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard; 