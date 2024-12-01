// About.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import '../styles/About.css';
import roufImage from '../assets/images/MD Abdur Rouf.png';

const About = () => {
  const navigate = useNavigate();

  const stats = [
    { number: "২০+", label: "বছরের অভিজ্ঞতা" },
    { number: "১০০০০০+", label: "সন্তুষ্ট গ্রাহক" },
    { number: "৬৪", label: "জেলায় সেবা" },
    { number: "৫০+", label: "বিশেষজ্ঞ সদস্য" }
  ];

  const team = [
    {
      name: "মোঃ আব্দুর রউফ",
      role: "প্রতিষ্ঠাতা এবং CEO",
      image: roufImage,
      whatsapp: "tel:+8801712617226",
      email: "vjusrouf1980@gmail.com",
      about: "/about-author"
    },
    // Add other team members...
  ];

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>আমরা ভূমি ব্যবস্থাপনার <span className="highlight">নতুন দিগন্ত</span></h1>
          <p>২০ বছর ধরে বাংলাদেশের ভূমি ব্যবস্থাপনা খাতে নির্ভরযোগ্য সেবা প্রদান করে আসছি</p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h2>{stat.number}</h2>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="team">
        <h2>আমাদের দল</h2>
        <div className="team-grid">
          {team.map((member, index) => (
            <motion.div 
              key={index}
              className="team-card"
              whileHover={{ y: -10 }}
            >
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <div className="member-social">
                  <a href={`https://wa.me/${member.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp />
                  </a>
                  <a href={`mailto:${member.email}`}><FaEnvelope /></a>
                  {member.about && (
                    <motion.button
                      className="about-author-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(member.about)}
                    >
                      বিস্তারিত
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="contact-cta">
        <motion.div 
          className="cta-content"
          whileInView={{ opacity: [0, 1], y: [50, 0] }}
          viewport={{ once: true }}
        >
          <h2>আপনার জমি সংক্রান্ত সমস্যার সমাধানে আমরা আছি</h2>
          <motion.button 
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/contact')}
          >
            পরামর্শ নিন
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
