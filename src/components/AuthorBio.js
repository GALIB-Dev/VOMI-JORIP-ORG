import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaMedal, FaUserTie, FaMapMarkedAlt, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { BiCertification } from 'react-icons/bi';
import { MdWork } from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';
import roufImage from '../assets/images/MD Abdur Rouf.png';
import '../styles/AuthorBio.css';
import ErrorBoundary from './ErrorBoundary';

const AuthorBioContent = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const ceoQuote = {
    text: "আমাদের লক্ষ্য হলো বাংলাদেশের প্রতিটি মানুষের জমি সংক্রান্ত সমস্যার সমাধান করা। আমরা বিশ্বাস করি, প্রযুক্তি এবং অভিজ্ঞতার সমন্বয়ে আমরা এই লক্ষ্যে পৌঁছাতে পারব।",
    author: "মোঃ আব্দুর রউফ",
    position: "প্রতিষ্ঠাতা এবং CEO"
  };

  return (
    <motion.div 
      className="auth-bio-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="auth-hero" variants={itemVariants}>
        <div className="auth-hero-content">
          <motion.div 
            className="auth-image-wrapper"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img 
              src={roufImage}
              alt="মোঃ আব্দুর রউফ" 
              className="auth-image"
            />
          </motion.div>
          <div className="auth-title">
            <h1>মোঃ আব্দুর রউফ</h1>
            <h2>প্রতিষ্ঠাতা এবং CEO</h2>
          </div>
        </div>
      </motion.div>

      <motion.section 
        className="auth-quote-section"
        data-aos="fade-up"
        data-aos-delay="50"
      >
        <div className="auth-quote-container">
          <FaQuoteLeft className="quote-icon left" />
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p>{ceoQuote.text}</p>
            <footer>
              <cite>
                <strong>{ceoQuote.author}</strong>
                <span>{ceoQuote.position}</span>
              </cite>
            </footer>
          </motion.blockquote>
          <FaQuoteRight className="quote-icon right" />
        </div>
      </motion.section>

      <div className="auth-sections">
        <motion.section 
          className="auth-section"
          data-aos="fade-up"
        >
          <h3><FaUserTie className="auth-section-icon" /> যোগাযোগ</h3>
          <div className="auth-contact-grid">
            <motion.a 
              href="tel:+8801712617226"
              className="auth-contact-item"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaWhatsapp className="auth-icon" />
              <span>+880 1712-617226</span>
            </motion.a>
            <motion.a 
              href="mailto:vjusrouf1980@gmail.com"
              className="auth-contact-item"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope className="auth-icon" />
              <span>vjusrouf1980@gmail.com</span>
            </motion.a>
          </div>
        </motion.section>

        <motion.section 
          className="auth-section"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h3><MdWork className="auth-section-icon" /> অভিজ্ঞতা</h3>
          <div className="auth-timeline">
            <div className="auth-timeline-item">
              <div className="year">২০০০ - বর্তমান</div>
              <div className="description">ভূমি জরিপ উন্নয়ন সংস্থার প্রতিষ্ঠাতা এবং CEO</div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="auth-section"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h3><FaMedal className="auth-section-icon" /> সাফল্য</h3>
          <div className="auth-achievements-grid">
            <motion.div 
              className="auth-achievement-card"
              whileHover={{ y: -5 }}
            >
              <BiCertification className="auth-achievement-icon" />
              <h4>100000+</h4>
              <p>সফল প্রকল্প</p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          className="auth-section"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <h3><FaMapMarkedAlt className="auth-section-icon" /> কার্যালয়</h3>
          <div className="auth-office-info">
          <p> কার্যালয়: হাতিল সদর রোড, জয়পুরহাট, বাংলাদেশ (হোল্ডিং নং-২৪)</p>
            <p> কার্যালয়: ১/বি, মেহেরুন টাওয়ার, ২০ নং ডি. এন. সেন. রোড, গেন্ডারিয়া, ঢাকা-১২০৪।</p>
            
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

const AuthorBio = () => {
  return (
    <ErrorBoundary>
      <AuthorBioContent />
    </ErrorBoundary>
  );
};

export default AuthorBio; 