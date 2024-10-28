import React from 'react';
import './Home.css'; // Importing the Home-specific CSS
import survey from './services.1.0.1/land survey.png';
import sell from './services.1.0.1/property sell.png';
import digital from './services.1.0.1/digital survey.png';
import mouzamap from './services.1.0.1/mouzamap.png';
import con from './services.1.0.1/cons.jpg';
import train from './services.1.0.1/images.png';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="title">ভূমি জরিপ উন্নয়ন সংস্থা</h1>
          <p className="subtitle">
            আমরা আপনাকে আত্মবিশ্বাসের সাথে সম্পত্তি কিনতে, বিক্রি করতে এবং জরিপ করতে সহায়তা করি।
          </p>
          <button className="cta-button">জমি বাজার</button>
        </div>
      </header>

      {/* Services Section */}
      <section className="services-section">
        <h2>আমাদের সেবা</h2>
        <div className="service-cards">
          {/* Service 1 */}
          <div className="service-card">
            <a
              href="/contact" // Update the href with a valid internal or external link
              target="_blank"
              rel="noreferrer"
              aria-label="জমি জরিপ">
              <div className="service-box">
                <img
                  className="img-responsive"
                  src={survey}
                  alt="জমি জরিপ"
                  style={{ width: '116px' }}
                />
                <span>জমি জরিপ</span>
              </div>
            </a>
          </div>

          {/* Service 2 */}
          <div className="service-card">
            <a
              href="/market" // Update the href with a valid internal or external link
              target="_blank"
              rel="noreferrer"
              aria-label="জমি ক্রয় এবং বিক্রয়">
              <div className="service-box">
                <img
                  className="img-responsive"
                  src={sell}
                  alt="জমি ক্রয় এবং বিক্রয়"
                  style={{ width: '149px', marginTop: '-9px' }}
                />
                <span>জমি ক্রয় এবং বিক্রয়</span>
              </div>
            </a>
          </div>

          {/* Service 3 */}
          <div className="service-card">
            <a
              href="/contact" // Provide a valid route here
              target="_blank"
              rel="noreferrer"
              aria-label="ডিজিটাল জরিপ">
              <div className="service-box">
                <img
                  className="img-responsive"
                  src={digital}
                  alt="ডিজিটাল জরিপ"
                  style={{ width: '222px', margin: '17px auto' }}
                />
                <span>ডিজিটাল জরিপ</span>
              </div>
            </a>
          </div>

          {/* Service 4 */}
          <div className="service-card">
            <a
              href="/contact" // Provide a valid route here
              target="_blank"
              rel="noreferrer"
              aria-label="ভূমি নকশা">
              <div className="service-box">
                <img
                  className="img-responsive"
                  src={mouzamap}
                  alt="ভূমি নকশা"
                  style={{ width: '210px' }}
                />
                <span>ভূমি নকশা</span>
              </div>
            </a>
          </div>

          {/* Service 5 */}
          <div className="service-card">
            <a
              href="/contact" // Provide a valid route here
              target="_blank"
              rel="noreferrer"
              aria-label="ল্যান্ড কনসালটেন্ট">
              <div className="service-box">
                <img
                  className="img-responsive"
                  src={con}
                  alt="ল্যান্ড কনসালটেন্ট"
                  style={{ width: '110px', marginTop: '13px' }}
                />
                <span>ল্যান্ড কনসালটেন্ট</span>
              </div>
            </a>
          </div>

          {/* Service 6 */}
          <div className="service-card">
            <a
              href="/contact" // Provide a valid route here
              target="_blank"
              rel="noreferrer"
              aria-label="জরিপ প্রশিক্ষণ">
              <div className="service-box">
                <img
                  className="img-responsive"
                  src={train}
                  alt="জরিপ প্রশিক্ষণ"
                />
                <span>জরিপ প্রশিক্ষণ</span>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
