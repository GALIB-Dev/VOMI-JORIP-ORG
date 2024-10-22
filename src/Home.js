import React from 'react';
import './Home.css'; // Importing the Home-specific CSS

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
          <button className="cta-button">শুরু করুন</button>
        </div>
      </header>

      {/* Services Section */}
      <section className="services-section">
        <h2>আমাদের সেবা</h2>
        <div className="service-cards">
          {/* Service 1 */}
          <div className="service-card">
            <a
              href="https://mutation.land.gov.bd"
              target="_blank"
              rel="noreferrer"
              aria-label="নামজারি">
              <div className="service-box">
                <img
                  className="img-responsive"
                  src="https://land.gov.bd/wp-content/uploads/2024/08/Namjari-Logo-v3.png"
                  alt="নামজারি"
                  style={{ width: '116px' }}
                />
                <span>নামজারি</span>
              </div>
            </a>
          </div>

          {/* Service 2 */}
          <div className="service-card">
            <a
              href="https://ldtax.gov.bd/"
              target="_blank"
              rel="noreferrer"
              aria-label="ভূমি উন্নয়ন কর">
              <div className="service-box">
                <img
                  className="img-responsive"
                  src="https://land.gov.bd/wp-content/themes/land-portal/images/icons/ldt.png"
                  alt="ভূমি উন্নয়ন কর"
                  style={{ width: '149px', marginTop: '-9px' }}
                />
                <span>ভূমি উন্নয়ন কর</span>
              </div>
            </a>
          </div>

          {/* Service 3 */}
          <div className="service-card">
            <a
              href="https://www.eporcha.gov.bd/"
              target="_blank"
              rel="noreferrer"
              aria-label="ভূমি রেকর্ড ও ম্যাপ">
              <div className="service-box">
                <img
                  className="img-responsive"
                  src="https://land.gov.bd/wp-content/uploads/2024/08/dlrms.png"
                  alt="ভূমি রেকর্ড ও ম্যাপ"
                  style={{ width: '222px', margin: '17px auto' }}
                />
                <span>ভূমি রেকর্ড ও ম্যাপ</span>
              </div>
            </a>
          </div>

          {/* Service 4 */}
          <div className="service-card">
            <a
              href="http://map.land.gov.bd/"
              target="_blank"
              rel="noreferrer"
              aria-label="ভূমি নকশা">
              <div className="service-box">
                <img
                  className="img-responsive"
                  src="https://land.gov.bd/wp-content/uploads/2024/08/service-img-naksha.png"
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
              href="https://mutation.land.gov.bd/search-mortgage-info"
              target="_blank"
              rel="noreferrer"
              aria-label="মর্টগেজ তথ্য যাচাই">
              <div className="service-box">
                <img
                  className="img-responsive"
                  src="https://land.gov.bd/wp-content/uploads/2023/03/morgaj.png"
                  alt="মর্টগেজ তথ্য যাচাই"
                  style={{ width: '110px', marginTop: '13px' }}
                />
                <span>মর্টগেজ তথ্য যাচাই</span>
              </div>
            </a>
          </div>

          {/* Service 6 */}
          <div className="service-card">
            <a
              href="http://bhumipedia.land.gov.bd/"
              target="_blank"
              rel="noreferrer"
              aria-label="ভূমি পিডিয়া">
              <div className="service-box">
                <img
                  className="img-responsive"
                  src="https://land.gov.bd/wp-content/uploads/2024/08/service-img-pidia.png"
                  alt="ভূমি পিডিয়া"
                />
                <span>ভূমি পিডিয়া</span>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
