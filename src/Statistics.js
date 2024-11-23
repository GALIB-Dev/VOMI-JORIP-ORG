import { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import './Statistics.css';
import { 
  HandshakeOutlined,
  PeopleOutlined,
  LandscapeOutlined,
  CampaignOutlined
} from '@mui/icons-material';

const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    {
      id: 1,
      value: 1500,
      suffix: '',
      title: 'সফল লেনদেন',
      Icon: HandshakeOutlined,
      color: '#2E7D32'
    },
    {
      id: 2,
      value: 22000,
      suffix: '+',
      title: 'সন্তুষ্ট গ্রাহক',
      Icon: PeopleOutlined,
      color: '#1565C0'
    },
    {
      id: 3,
      value: 5000,
      suffix: '',
      title: 'একর জমি পরিমাপ',
      Icon: LandscapeOutlined,
      color: '#E65100'
    },
    {
      id: 4,
      value: 300,
      suffix: '',
      title: 'সক্রিয় বিজ্ঞাপন',
      Icon: CampaignOutlined,
      color: '#C2185B'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats-section" className="statistics-section">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="stats-container"
      >
        <div className="stats-grid">
          {stats.map((stat) => {
            const IconComponent = stat.Icon;
            return (
              <motion.div
                key={stat.id}
                className="stat-card"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="stat-icon-wrapper" style={{ color: stat.color }}>
                  <IconComponent sx={{ fontSize: 40 }} />
                </div>
                <div className="stat-value" style={{ color: stat.color }}>
                  {isVisible && (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2.5}
                      separator=","
                      suffix={stat.suffix}
                      useEasing={true}
                    />
                  )}
                </div>
                <h3 className="stat-title">{stat.title}</h3>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Statistics;