// About.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, animate } from 'framer-motion';
import { 
  FaMapMarkedAlt, FaHandshake, FaChartArea, 
  FaSearchLocation, FaFileContract, FaUserTie,
  FaPhoneAlt, FaEnvelope, FaArrowUp, FaMapMarkerAlt,
  FaClock, FaFacebook, FaWhatsapp, FaAward, FaUsers, FaCheckCircle
} from 'react-icons/fa';
import '../styles/About.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  useEffect(() => {
    // Remove home page classes
    document.body.classList.remove('home-page');
    document.body.classList.add('about-page');

    return () => {
      document.body.classList.remove('about-page');
    };
  }, []);

  const heroFeatures = [
    { 
      icon: <FaMapMarkedAlt />, 
      text: "   নির্ভুল জমি জরিপ" 
    },
    { 
      icon: <FaHandshake />, 
      text: "    বিশ্বস্ত পরামর্শ" 
    },
    { 
      icon: <FaChartArea />,
      text: "    সঠিক মূল্যায়ন" 
    }
  ];

  const services = [
    {
      icon: <FaSearchLocation />,
      title: "জমি অনুসন্ধান",
      description: "আপনার প্রয়োজন অনুযায়ী সেরা অবস্থানে জমি খুঁজে বের করা এবং যাচাই-বাছাই করে দেওয়া।"
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "জমি জরিপ",
      description: "আধুনিক প্রযুক্তি ব্যবহার করে নির্ভুল জমি জরিপ এবং সীমানা নির্ধারণ।"
    },
    {
      icon: <FaFileContract />,
      title: "আইনি সহায়তা",
      description: "জমি রেজিস্ট্রেশন, দলিল যাচাই এবং সকল আইনি প্রক্রিয়ায় সহায়তা।"
    },
    {
      icon: <FaChartArea />,
      title: "মূল্য নির্ধারণ",
      description: "বাজার বিশ্লেষণ করে জমির সঠিক মূল্য নির্ধারণ এবং ভবিষ্যৎ মূল্য প্রবণতা পর্যালোচনা।"
    },
    {
      icon: <FaUserTie />,
      title: "পরামর্শ সেবা",
      description: "অভিজ্ঞ টিম দ্বারা জমি ক্রয়-বিক্রয় সংক্রান্ত সকল বিষয়ে পরামর্শ প্রদান।"
    },
    {
      icon: <FaHandshake />,
      title: "ক্রয়-বিক্রয় সহায়তা",
      description: "জমি ক্রয়-বিক্রয়ের সম্পূর্ণ প্রক্রিয়া পরিচালনা এবং দরকষাকষিতে সহায়তা।"
    }
  ];

  const contactInfo = [
    {
      icon: <FaPhoneAlt />,
      title: "ফোন",
      details: ["+880 1712617226", "+880 1712617226"],
      action: "tel:+8801712617226"
    },
    {
      icon: <FaEnvelope />,
      title: "ইমেইল",
      details: ["vjusrouf198@gmail.com", "contact@vomijorip.com"],
      action: "mailto:vjusrouf198@gmail.com"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "ঠিকানা",
      details: [" মেইন রোড, জয়পুরহাট-৫৯০০"],
      action: "https://maps.app.goo.gl/AEaxBaVEgdh7byXu9"
    },
    {
      icon: <FaClock />,
      title: "কার্যালয়ের সময়",
      details: ["শনি - বৃহস্পতি: সকাল ৯টা - সন্ধ্যা ৬টা", "শুক্রবার: Open "],
      action: null
    }
  ];

  const statsData = [
    {
      number: 20,
      suffix: '+',
      label: 'বছরের অভিজ্ঞতা',
      icon: <FaAward className="stats-icon" />,
      color: '#FF6B6B'
    },
    {
      number: 21760,
      suffix: '+',
      label: 'সন্তুষ্ট গ্রাহক',
      icon: <FaUsers className="stats-icon" />,
      color: '#4ECDC4'
    },
    {
      number: 21896,
      suffix: '+',
      label: 'সফল প্রজেক্ট',
      icon: <FaCheckCircle className="stats-icon" />,
      color: '#45B7D1'
    },
    {
      number: 24,
      suffix: '/৭',
      label: 'গ্রাহক সেবা',
      icon: <FaClock className="stats-icon" />,
      color: '#96C93D'
    }
  ];

  // Counter animation component
  const Counter = ({ value, suffix }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const controls = animate(0, value, {
        duration: 2,
        onUpdate: (latest) => setCount(Math.floor(latest))
      });

      return () => controls.stop();
    }, [value]);

    return (
      <span>{count}{suffix}</span>
    );
  };

  return (
    <motion.div className="about-container">
      {/* Hero Section */}
      <motion.section id="hero" className="about-hero">
        <div className="hero-background">
          <motion.div className="hero-gradient" />
        </div>
        <motion.div className="hero-content">
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            আপনার <span className="highlight">বিশ্বস্ত</span> ভূমি উন্নয়ন সহযোগী
          </motion.h1>
          
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="emphasis">২০ বছরের</span> অভিজ্ঞতা নিয়ে আমরা আপনার জমি সংক্রান্ত 
            সকল সমস্যার <span className="text-gradient">সমাধান</span> দিতে প্রতিশ্রুতিবদ্ধ
          </motion.p>
          
          <motion.div className="hero-features">
            {heroFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="feature"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                {feature.icon}
                <span>{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Services Section */}
      <motion.section id="services" className="about-services-section">
        <div className="section-header">
          <motion.h2>আমাদের সেবাসমূহ</motion.h2>
          <motion.div className="section-divider" />
        </div>

        <div className="about-services-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="about-service-card"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <motion.div 
                className="about-service-icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {service.icon}
              </motion.div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="stats-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="stats-background">
          <div className="stats-overlay"></div>
        </div>
        
        <div className="stats-content">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            আমাদের সাফল্য
          </motion.h2>
          
          <div className="stats-grid">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <div 
                  className="stat-icon-wrapper" 
                  style={{ background: `${stat.color}22` }}
                >
                  {stat.icon}
                </div>
                
                <motion.div
                  className="stat-number"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Counter value={stat.number} suffix={stat.suffix} />
                </motion.div>
                
                <p className="stat-label">{stat.label}</p>
                
                {/* Animated Progress Circle */}
                <svg className="progress-ring" width="100%" height="100%">
                  <motion.circle
                    className="progress-ring__circle"
                    stroke={stat.color}
                    strokeWidth="4"
                    fill="transparent"
                    r="58"
                    cx="60"
                    cy="60"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </svg>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Location and Contact Section */}
      <motion.section 
        id="contact" 
        className="contact-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="section-header">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            যোগাযোগ করুন
          </motion.h2>
          <motion.div className="section-divider" />
        </div>

        <div className="contact-wrapper">
          {/* Map Section */}
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0141520006756!2d90.41279731498244!3d23.780887784574577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f7f890a7%3A0x8a4e176abc26c0c!2sGulshan%202%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1647750812017!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location Map"
            ></iframe>
          </div>

          {/* Contact Cards */}
          <div className="contact-cards">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.action}
                className="contact-card"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                target={info.action?.startsWith('http') ? '_blank' : undefined}
                rel={info.action?.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <div className="contact-icon">{info.icon}</div>
                <h3>{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx}>{detail}</p>
                ))}
              </motion.a>
            ))}
          </div>

          {/* Social Links */}
          <div className="social-links">
            <motion.a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaFacebook />
            </motion.a>
            <motion.a
              href="https://wa.me/+8801712617226"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaWhatsapp />
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* Scroll Progress and To Top Button */}
      <motion.div 
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />
      
      <AnimatePresence>
        {isVisible && (
          <motion.button
            className="scroll-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default About;
