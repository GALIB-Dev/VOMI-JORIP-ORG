import React from 'react';
import './Home.css'; // Importing the Home-specific CSS

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="title">ভূমি জরিপ উন্নয়ন সংস্থা</h1>
          <p className="subtitle">
          আমরা আপনাকে আত্মবিশ্বাসের সাথে সম্পত্তি কিনতে, বিক্রি করতে এবং জরিপ করতে সহায়তা করি।
          </p>
          <button className="cta-button">শুরু করুন</button>
        </div>
      </header>

      <div className="services-section">
  <h2>আমাদের সেবা</h2>
  <div className="service-cards">
    <div className="card">
      <div className="card-icon">💼</div> {/* Example icon */}
      <div className="card-title">Service 1</div>
    </div>
    <div className="card">
      <div className="card-icon">📐</div> {/* Example icon */}
      <div className="card-title">Service 2</div>
    </div>
    <div className="card">
      <div className="card-icon">🛠</div> {/* Example icon */}
      <div className="card-title">Service 3</div>
    </div>
  </div>
</div>
    </div>
  );
};

export default Home;

