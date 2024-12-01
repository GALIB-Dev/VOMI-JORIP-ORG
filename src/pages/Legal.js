import React from 'react';
import { motion } from 'framer-motion';
import { FaBalanceScale, FaFileAlt, FaHandshake, FaGavel } from 'react-icons/fa';
import '../styles/Legal.css';
import { Link } from 'react-router-dom';

const LegalService = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      className="legal-service-card"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="service-icon" />
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  );
};

const Legal = () => {
  const legalServices = [
    {
      icon: FaBalanceScale,
      title: "ভূমি বিরোধ সমাধান",
      description: "জমি সংক্রান্ত বিরোধের ক্ষেত্রে আইনি পরামর্শ ও সমাধান"
    },
    {
      icon: FaFileAlt,
      title: "দলিল পর্যালোচনা",
      description: "জমির দলিল-দস্তাবেজ পর্যালোচনা ও আইনি মতামত প্রদান"
    },
    {
      icon: FaHandshake,
      title: "ক্রয়-বিক্রয় পরামর্শ",
      description: "স্থাবর সম্পত্তি ক্রয়-বিক্রয়ের ক্ষেত্রে আইনি পরামর্শ"
    },
    {
      icon: FaGavel,
      title: "আদালত সহায়তা",
      description: "ভূমি সংক্রান্ত মামলায় আইনি সহায়তা প্রদান"
    }
  ];

  const recentUpdates = [
    {
      date: "১৫ মার্চ ২০২৪",
      title: "ডিজিটাল পদ্ধতিতে জমি জরিপ কার্যক্রম",
      description: "ভূমি মন্ত্রণালয় ডিজিটাল পদ্ধতিতে জমি জরিপ কার্যক্রম শুরু করেছে। এই প্রকল্পের মাধ্যমে দেশের সকল জমির ডিজিটাল ম্যাপিং করা হবে।"
    },
    {
      date: "১০ মার্চ ২০২৪",
      title: "ই-নামজারি সিস্টেম সম্প্রসারণ",
      description: "ভূমি মন্ত্রণালয় ই-নামজারি সিস্টেম সারা দেশে সম্প্রসারণ করেছে। এখন থেকে অনলাইনে নামজারির আবেদন করা যাবে।"
    },
    {
      date: "০৫ মার্চ ২০২৪",
      title: "ভূমি অধিগ্রহণ আইন সংশোধন",
      description: "ভূমি অধিগ্রহণ আইনে নতুন সংশোধনী আনা হয়েছে, যা ক্ষতিপূরণের হার বৃদ্ধি করেছে।"
    }
  ];

  return (
    <div className="legal-page">
      <div className="legal-header">
        <h1>আইনি পরামর্শ সেবা</h1>
        <p>অভিজ্ঞ আইনজীবীদের মাধ্যমে ভূমি সংক্রান্ত সকল আইনি সহায়তা</p>
      </div>

      <div className="legal-cta-section">
        <h2>আপনার আইনি সমস্যার সমাধানে আমরা আছি</h2>
        <p>বিশেষজ্ঞ আইনজীবীদের সাথে কথা বলতে যোগাযোগ করুন</p>
        <Link to="/contact" className="contact-button">
          পরামর্শের জন্য যোগাযোগ করুন
        </Link>
      </div>

      <div className="legal-services-grid">
        {legalServices.map((service, index) => (
          <LegalService
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>

      <div className="legal-updates-section">
        <h2>সর্বশেষ ভূমি আইন সংক্রান্ত আপডেট</h2>
        <div className="updates-grid">
          {recentUpdates.map((update, index) => (
            <div key={index} className="update-card">
              <div className="update-date">{update.date}</div>
              <h3>{update.title}</h3>
              <p>{update.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="consultation-section">
        <h2>পরামর্শের জন্য প্রয়োজনীয় কাগজপত্র</h2>
        <ul>
          <li>জমির দলিল ও খতিয়ানের কপি</li>
          <li>হালনাগাদ ভূমি উন্নয়ন কর পরিশোধের রশিদ</li>
          <li>জাতীয় পরিচয়পত্রের কপি</li>
          <li>বিরোধের ক্ষেত্রে সংশ্লিষ্ট কাগজপত্র</li>
          <li>পূর্ববর্তী আইনি পদক্ষেপের কাগজপত্র (যদি থাকে)</li>
        </ul>
      </div>

      <div className="legal-faq-section">
        <h2 style={{ color: '#2E7D32' }}>সাধারণ জিজ্ঞাসা</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3 style={{ color: '#388E3C' }}>নামজারি কি?</h3>
            <p>নামজারি হলো জমির মালিকানা পরিবর্তনের আইনি প্রক্রিয়া। এটি জমির মালিকানা একজনের নাম থেকে অন্যজনের নামে স্থানান্তরের জন্য প্রয়োজনীয়।</p>
          </div>
          <div className="faq-item">
            <h3 style={{ color: '#388E3C' }}>খতিয়ান কি?</h3>
            <p>খতিয়ান হলো জমির মালিকানার সরকারি দলিল, যেখানে জমির বিস্তারিত তথ্য, মালিকের নাম ও অন্যান্য প্রয়োজনীয় তথ্য লিপিবদ্ধ থাকে।</p>
          </div>
          <div className="faq-item">
            <h3 style={{ color: '#388E3C' }}>ভূমি উন্নয়ন কর কি?</h3>
            <p>ভূমি উন্নয়ন কর হলো জমির মালিকদের সরকারকে প্রদেয় বার্ষিক কর। এটি জমির পরিমাণ ও অবস্থান অনুযায়ী নির্ধারণ করা হয়।</p>
          </div>
          <div className="faq-item">
            <h3 style={{ color: '#388E3C' }}>মিউটেশন কি?</h3>
            <p>মিউটেশন বা নামজারি হলো জমির মালিকানা পরিবর্তনের পর রেকর্ড আপডেট করার প্রক্রিয়া। এটি ভূমি অফিসে করাতে হয়।</p>
          </div>
          <div className="faq-item">
            <h3 style={{ color: '#388E3C' }}>পর্চা কি?</h3>
            <p>পর্চা হলো জমির মালিকানার একটি সরকারি দলিল, যা জমির মালিকের নাম, জমির পরিমাণ ও সীমানা নির্দেশ করে।</p>
          </div>
          <div className="faq-item">
            <h3 style={{ color: '#388E3C' }}>জমি রেজিস্ট্রি করার জন্য কি কি লাগে?</h3>
            <p>জমি রেজিস্ট্রির জন্য প্রয়োজন: জাতীয় পরিচয়পত্র, টিআইএন, বিক্রেতার দলিলের কপি, খতিয়ান, ভূমি উন্নয়ন কর পরিশোধের রশিদ এবং মূল্য পরিশোধের প্রমাণপত্র।</p>
          </div>
          <div className="faq-item">
            <h3 style={{ color: '#388E3C' }}>ওয়ারিশ সূত্রে জমি পেলে কি করণীয়?</h3>
            <p>ওয়ারিশ সূত্রে জমি পেলে প্রথমে ওয়ারিশ সনদ সংগ্রহ করতে হবে, তারপর নামজারির জন্য আবেদন করতে হবে এবং সকল প্রয়োজনীয় কাগজপত্র জমা দিতে হবে।</p>
          </div>
          <div className="faq-item">
            <h3 style={{ color: '#388E3C' }}>জমির দখল কিভাবে নিতে হয়?</h3>
            <p>জমির আইনি মালিকানা প্রাপ্তির পর, স্থানীয় ভূমি অফিস থেকে দখল বুঝে নিতে হবে। প্রয়োজনে স্থানীয় প্রশাসনের সহায়তা নেওয়া যেতে পারে।</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal; 