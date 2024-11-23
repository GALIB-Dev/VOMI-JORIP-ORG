import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Home.css';

// Import images
import landSurveyImg from '../assets/images/land survey.png';
import propertySellImg from '../assets/images/property sell.png';
import digitalSurveyImg from '../assets/images/digital survey.png';
import mouzamapImg from '../assets/images/mouzamap.png';
import consImg from '../assets/images/cons.jpg';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const services = [
  {
    id: 1,
    title: 'জমি জরিপ',
    image: landSurveyImg,
    path: '/contact',
    imageStyle: { width: '116px' }
  },
  {
    id: 2,
    title: 'জমি ক্রয় এবং বিক্রয়',
    image: propertySellImg,
    path: '/market',
    imageStyle: { width: '149px', marginTop: '-9px' }
  },
  {
    id: 3,
    title: 'ডিজিটাল জরিপ',
    image: digitalSurveyImg,
    path: '/contact',
    imageStyle: { width: '222px', margin: '17px auto' }
  },
  {
    id: 4,
    title: 'ভূমি নকশা',
    image: mouzamapImg,
    path: '/contact',
    imageStyle: { width: '210px' }
  },
  {
    id: 5,
    title: 'ল্যান্ড কনসালটেন্ট',
    image: consImg,
    path: '/contact',
    imageStyle: { width: '110px', marginTop: '13px' }
  },
  {
    id: 6,
    title: 'জরিপ প্রশিক্ষণ',
    path: '/contact',
    imageStyle: {}
  }
];

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <motion.header 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <motion.h1 
            className="title"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            ভূমি জরিপ উন্নয়ন সংস্থা
          </motion.h1>
          <motion.p 
            className="subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            আমরা আপনাকে আত্মবিশ্বাসের সাথে সম্পত্তি কিনতে, বিক্রি করতে এবং জরিপ করতে সহায়তা করি।
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link to="/market" className="cta-button">
              জমি বাজার
            </Link>
          </motion.div>
        </div>
      </motion.header>

      {/* Services Section */}
      <section className="services-section">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          আমাদের সেবা
        </motion.h2>
        
        <motion.div 
          className="service-cards"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <motion.div 
              key={service.id}
              className="service-card"
              variants={itemVariants}
            >
              <Link
                to={service.path}
                className="service-link"
                aria-label={service.title}
              >
                <div className="service-box">
                  {service.image && (
                    <img
                      className="img-responsive"
                      src={service.image}
                      alt={service.title}
                      style={service.imageStyle}
                    />
                  )}
                  <span>{service.title}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
