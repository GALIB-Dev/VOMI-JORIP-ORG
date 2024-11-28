// About.js
import React from 'react';
import { motion } from 'framer-motion';
import { FaSearchLocation, FaHandshake, FaClipboardCheck, FaQuoteLeft } from 'react-icons/fa';
import '../styles/About.css';

const About = () => {
  const teamMembers = [
    {
      name: 'মোঃ আব্দুল করিম',
      role: 'প্রধান জরিপকারী',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'আহমেদ হোসেন',
      role: 'ভূমি পরামর্শক',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'নাজমুল হাসান',
      role: 'আইন পরামর্শক',
      image: 'https://via.placeholder.com/150'
    }
  ];

  const milestones = [
    { 
      year: '২০০০', 
      title: 'প্রতিষ্ঠান শুরু', 
      description: 'ভূমি জরিপ ও পরামর্শ সেবা দিয়ে যাত্রা শুরু' 
    },
    { 
      year: '২০০৫', 
      title: 'সেবার সম্প্রসারণ', 
      description: 'ঢাকা বিভাগের সকল জেলায় সেবা বিস্তৃতি' 
    },
    { 
      year: '২০১০', 
      title: 'আইনি সহায়তা শুরু', 
      description: 'ভূমি সংক্রান্ত আইনি পরামর্শ সেবা চালুকরণ' 
    },
    { 
      year: '২০১৫', 
      title: 'আধুনিক প্রযুক্তি', 
      description: 'ডিজিটাল জরিপ যন্ত্রপাতি ব্যবহার শুরু' 
    },
    { 
      year: '২০২০', 
      title: 'সারা দেশব্যাপী সেবা', 
      description: 'বাংলাদেশের সকল জেলায় সেবা সম্প্রসারণ' 
    },
    { 
      year: '২০২৩', 
      title: 'ডিজিটাল প্ল্যাটফর্ম', 
      description: 'অনলাইন সেবা প্ল্যাটফর্ম চালুকরণ' 
    }
  ];

  const testimonials = [
    {
        name: 'আব্দুল করিম',
        location: 'মিরপুর, ঢাকা',
        text: 'আমি তাদের মাধ্যমে আমার জমি জরিপ করিয়েছি। খুবই দক্ষতার সাথে তারা কাজটি সম্পন্ন করেছে। তাদের সেবায় আমি খুবই সন্তুষ্ট।'
    },
    {
        name: 'নাজমুল হক',
        location: 'গাজীপুর',
        text: 'জমি কেনার ব্যাপারে তাদের পরামর্শ আমার জন্য খুবই উপকারী ছিল। সঠিক দামে ভালো জমি কিনতে পেরেছি।'
    },
    {
        name: 'ফারহানা বেগম',
        location: 'উত্তরা, ঢাকা',
        text: 'প্রফেশনাল এবং বিশ্বস্ত সেবা। জমির সকল ডকুমেন্ট যাচাই-বাছাই করে দিয়েছে। খুবই ভালো অভিজ্ঞতা ছিল।'
    }
  ];

  return (
    <div className="about-container">
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1>আমাদের সম্পর্কে</h1>
        <p className="subtitle">বাংলাদেশের অভিজ্ঞ ভূমি জরিপ ও পরামর্শ সেবা প্রদানকারী প্রতিষ্ঠান</p>
      </motion.section>

      {/* Mission Section */}
      <section className="mission-section">
        <h2>আমাদের লক্ষ্য</h2>
        <div className="mission-cards">
          <motion.div 
            className="mission-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaSearchLocation className="mission-icon" />
            <h3>নির্ভুল জরিপ</h3>
            <p>আধুনিক প্রযুক্তি ব্যবহার করে সঠিক ভূমি জরিপ সেবা প্রদান</p>
          </motion.div>

          <motion.div 
            className="mission-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaHandshake className="mission-icon" />
            <h3>বিশ্বস্ত পরামর্শ</h3>
            <p>অভিজ্ঞ টিমের মাধ্যমে নির্ভরযোগ্য ভূমি পরামর্শ সেবা</p>
          </motion.div>

          <motion.div 
            className="mission-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaClipboardCheck className="mission-icon" />
            <h3>জমি ক্রয়-বিক্রয়</h3>
            <p>নিরাপদ ও বিশ্বস্ত জমি কেনা-বেচার সেবা প্রদান</p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>আমাদের দক্ষ টিম</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              className="team-member"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <h2>আমাদের অর্জন</h2>
        <div className="timeline">
          {milestones.map((milestone, index) => (
            <motion.div 
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="timeline-content">
                <h3>{milestone.year}</h3>
                <h4>{milestone.title}</h4>
                <p>{milestone.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <h2>গ্রাহকদের মতামত</h2>
        <div className="testimonial-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="testimonial-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <FaQuoteLeft className="quote-icon" />
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>আপনার জমির জরিপ করতে চান?</h2>
        <motion.button 
          className="cta-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          যোগাযোগ করুন
        </motion.button>
      </section>
    </div>
  );
};

export default About;
