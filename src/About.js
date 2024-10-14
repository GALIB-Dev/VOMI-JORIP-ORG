import React from 'react';
import Slider from 'react-slick'; // Import the React Slick component
import './About.css'; // Import the corresponding CSS file for styling

import galleryImage1 from './galleryImage1.jpg';
import galleryImage2 from './galleryImage2.jpg';
import galleryImage3 from './galleryImage3.jpg';
import galleryImage4 from './galleryImage4.jpg';
import galleryImage5 from './galleryImage5.jpg';
import galleryImage6 from './galleryImage6.jpg';
import galleryImage7 from './galleryImage7.jpg';
import galleryImage8 from './galleryImage8.jpg';
import legal1 from './training.jpg'

const testimonials = [
  {
    name: 'আব্দুল-রহমান',
    feedback: 'ভূমি জরিপ উন্নয়ন সংস্থা আমাকে দ্রুত এবং পেশাদারীভাবে সাহায্য করেছে।',
  },
  {
    name: 'সাইফুদ্দিন কাঞ্চন চৌধুরী',
    feedback: 'তাদের সেবা অত্যন্ত সন্তোষজনক। আমি তাদের সুপারিশ করছি!',
  },
  {
    name: 'শ্রী কুমার',
    feedback: 'সেরা অভিজ্ঞতা! আমার জমির কাজ দ্রুত সম্পন্ন হয়েছে।',
  },
];

const About = () => {
  // Settings for the image slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="about-container">
      <h1 className="about-title">আমাদের সম্পর্কে</h1>
      <p className="about-description">
        আমাদের ভূমি জরিপ উন্নয়ন সংস্থা দীর্ঘদিন ধরে ভূমি জরিপ, 
        ভূমি কেনা-বেচা, এবং আইনগত কাগজপত্র প্রস্তুত করার ক্ষেত্রে 
        অভিজ্ঞ। আমাদের লক্ষ্য হল গ্রাহকদের সর্বোত্তম পরিষেবা প্রদান করা 
        এবং তাদের প্রয়োজন মেটাতে সহায়তা করা।
      </p>

      {/* Image Slider */}
      <div className="about-gallery">
        <h2 className="gallery-title">গ্যালারি</h2>
        <Slider {...sliderSettings} className="slider">
          <img src={galleryImage1} alt="A scenic view of a surveyed land" />
          <img src={galleryImage2} alt="A land surveying equipment in use" />
          <img src={galleryImage3} alt="A happy client receiving property documents" />
          <img src={galleryImage4} alt="A team of surveyors at work" />
          <img src={galleryImage5} alt="Another scenic land view" />
          <img src={galleryImage6} alt="Land surveying tools and equipment" />
          <img src={galleryImage7} alt="Legal documents for property transaction" />
          <img src={galleryImage8} alt="Our team at a property site" />
        </Slider>
      </div>

      {/* Authenticity Section */}
      <div className="about-authenticity">
        <h2 className="authenticity-title">আমাদের স্বীকৃতি</h2>
        <p className="authenticity-description">
          আমাদের সংস্থা সকল প্রকার আইনগত প্রক্রিয়া এবং ভূমিকম্পের সময়কাল 
          পূরণ করে। নীচে আমাদের বৈধতার কিছু নথি রয়েছে:
        </p>
        <div className="authenticity-docs">
          <img src={legal1} alt="Legal Document 1" />
          <img src="./legalDoc2.jpg" alt="Legal Document 2" />
          {/* Add more legal documents as needed */}
        </div>
      </div>

      <div className="about-testimonials">
        <h2 className="testimonials-title">গ্রাহকদের মতামত</h2>
        <div className="testimonial-cards">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <p className="testimonial-feedback">"{testimonial.feedback}"</p>
              <p className="testimonial-name">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="about-mission">
        <strong>আমাদের লক্ষ্য:</strong> ভূমির সঠিক পরিমাপ এবং 
        গ্রাহকদের সঙ্গে দীর্ঘমেয়াদী সম্পর্ক গড়ে তোলা।
      </p>
      <p className="about-contact">
        আমাদের সাথে যোগাযোগ করুন: <a href="tel:+8801712617226">+88 01712 617 226</a>
      </p>
    </div>
  );
};

export default About;
