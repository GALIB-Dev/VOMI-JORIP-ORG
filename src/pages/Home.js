import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from 'react-responsive';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import '../styles/Home.css';import throttle from 'lodash/throttle';

// Import images
import landSurveyImg from '../assets/images/land survey.png';
import propertySellImg from '../assets/images/property sell.png';
import digitalSurveyImg from '../assets/images/digital survey.png';
import mouzamapImg from '../assets/images/mouzamap.png';
import consImg from '../assets/images/cons.jpg';

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
      duration: 1,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { 
    y: 60, 
    opacity: 0,
    scale: 0.9
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  hover: {
    y: -8,
    scale: 1.05,
    transition: {
      duration: 0.4,
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

const HeroSection = ({ isMobile }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);
  
  return (
    <motion.header className="home-hero-section">
      <Parallax className="hero-parallax" speed={-20}>
        <motion.div 
          className="home-hero-content"
          style={{ y }}
        >
          <motion.h1 
            className="home-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            ভূমি জরিপ উন্নয়ন সংস্থা
          </motion.h1>
          
          <motion.div 
            className="home-hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p>আমরা আপনাকে আত্মবিশ্বাসের সাথে সম্পত্তি কিনতে, বিক্রি করতে এবং জরিপ করতে সহায়তা করি।</p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">১০০০+</span>
                <span className="stat-label">সন্তুষ্ট গ্রাহক</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">৫০+</span>
                <span className="stat-label">বছরের অভিজ্ঞতা</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/market" className="primary-button">
              জমি বাজার
            </Link>
            <Link to="/contact" className="secondary-button">
              যোগাযোগ করুন
            </Link>
          </motion.div>
        </motion.div>
      </Parallax>
    </motion.header>
  );
};

const ServiceCard = ({ service, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <motion.div 
      ref={ref}
      className="service-card"
      variants={cardVariants}
      whileHover="hover"
      custom={index}
      animate={inView ? "visible" : "hidden"}
    >
      <Link to={service.path} className="service-link">
        <div className="service-content">
          {service.image && (
            <div className="service-image-wrapper">
              <LazyLoadImage
                src={service.image}
                alt={service.title}
                effect="blur"
                className="service-image"
                style={service.imageStyle}
              />
            </div>
          )}
          <h3 className="service-title">{service.title}</h3>
          <motion.div 
            className="service-arrow"
            whileHover={{ x: 5 }}
          >
            →
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

const LandCalculator = () => {
  const [values, setValues] = useState({
    bigha: 0,
    katha: 0,
    decimal: 0,
    sqft: 0
  });

  const [result, setResult] = useState({
    acre: 0,
    hectare: 0,
    sqMeter: 0
  });

  // Conversion rates for Bangladesh
  const CONVERSION = {
    BIGHA_TO_SQFT: 14400, // 1 bigha = 14400 sq ft (in most parts of Bangladesh)
    KATHA_TO_SQFT: 720,   // 1 katha = 720 sq ft
    DECIMAL_TO_SQFT: 435.6, // 1 decimal = 435.6 sq ft
    SQFT_TO_SQMETER: 0.092903,
    SQMETER_TO_HECTARE: 0.0001,
    SQFT_TO_ACRE: 0.000022957
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const calculateArea = () => {
    // Convert everything to square feet first
    const totalSqft = (values.bigha * CONVERSION.BIGHA_TO_SQFT) +
                     (values.katha * CONVERSION.KATHA_TO_SQFT) +
                     (values.decimal * CONVERSION.DECIMAL_TO_SQFT) +
                     values.sqft;

    // Convert to other units
    const sqMeter = totalSqft * CONVERSION.SQFT_TO_SQMETER;
    const hectare = sqMeter * CONVERSION.SQMETER_TO_HECTARE;
    const acre = totalSqft * CONVERSION.SQFT_TO_ACRE;

    setResult({
      acre: acre.toFixed(3),
      hectare: hectare.toFixed(3),
      sqMeter: sqMeter.toFixed(2)
    });
  };

  return (
    <section className="calculator-section">
      <motion.div 
        className="calculator-container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>জমি পরিমাপ ক্যালকুলেটর</h2>
        
        <div className="calculator-inputs">
          <div className="input-group">
            <label>বিঘা</label>
            <input
              type="number"
              name="bigha"
              value={values.bigha}
              onChange={handleInputChange}
              min="0"
              step="0.01"
            />
          </div>

          <div className="input-group">
            <label>কাঠা</label>
            <input
              type="number"
              name="katha"
              value={values.katha}
              onChange={handleInputChange}
              min="0"
              step="0.01"
            />
          </div>

          <div className="input-group">
            <label>ডেসিমাল</label>
            <input
              type="number"
              name="decimal"
              value={values.decimal}
              onChange={handleInputChange}
              min="0"
              step="0.01"
            />
          </div>

          <div className="input-group">
            <label>বর্গফুট</label>
            <input
              type="number"
              name="sqft"
              value={values.sqft}
              onChange={handleInputChange}
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <button 
          className="calculate-button"
          onClick={calculateArea}
        >
          হিসাব করুন
        </button>

        <div className="calculator-results">
          <div className="result-item">
            <span className="result-label">একর:</span>
            <span className="result-value">{result.acre}</span>
          </div>
          <div className="result-item">
            <span className="result-label">হেক্টর:</span>
            <span className="result-value">{result.hectare}</span>
          </div>
          <div className="result-item">
            <span className="result-label">বর্গমিটার:</span>
            <span className="result-value">{result.sqMeter}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const Home = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Preload the background image
    const img = new Image();
    img.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';

    // Scroll handler with throttle
    const handleScroll = throttle(() => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.pageYOffset / totalScroll) * 100;
      setScrollProgress(currentProgress);
    }, 100);

    window.addEventListener('scroll', handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Reset any inherited styles when component mounts
  useEffect(() => {
    // Remove any lingering classes from other pages
    document.body.classList.remove('about-page');
    document.body.classList.add('home-page');

    // Cleanup when component unmounts
    return () => {
      document.body.classList.remove('home-page');
    };
  }, []);

  return (
    <div className="home-page-wrapper">
      <ParallaxProvider>
        <motion.div 
          className="scroll-progress"
          style={{
            scaleX: scrollProgress / 100,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'var(--primary-color)',
            transformOrigin: '0%',
            zIndex: 1000
          }}
        />
        
        <div className="home-container">
          <div className="hero-calculator-wrapper">
            <HeroSection isMobile={isMobile} />
            <div className="calculator-overlay">
              <LandCalculator />
            </div>
          </div>
          
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
              viewport={{ once: true, amount: 0.2 }}
            >
              {services.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </motion.div>
          </section>
        </div>
      </ParallaxProvider>
    </div>
  );
};

export default Home;
