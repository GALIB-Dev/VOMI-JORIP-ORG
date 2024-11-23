import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaPhone, FaMapMarkerAlt, FaRuler, FaMoneyBillWave, FaInfoCircle } from 'react-icons/fa';
import '../styles/market.css';

const Market = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const formatDriveUrl = (url) => {
    if (url?.includes('drive.google.com/file/d/')) {
      const id = url.split('/d/')[1].split('/')[0];
      return `https://drive.google.com/uc?export=view&id=${id}`;
    }
    return url;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5isSWxYcD2SLVidtyZXou_zVP6QK08fav2sT3rvO8kCuB78yDNiy6Kr8TZqzJ_KBs9E4xkWGfghAM/pub?output=csv'
        );

        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.text();
        const rows = data.split('\n').slice(1);

        const formattedProperties = rows.map(row => {
          const columns = row.split(',');
          return {
            date: columns[0],
            propertyType: columns[1],
            price: columns[2],
            ownerName: columns[3],
            ownerPhone: columns[4],
            location: columns[5],
            additionalInfo: columns[6],
            propertyAmount: columns[7],
            landUnit: columns[8],
            propertyImage: formatDriveUrl(columns[9]),
          };
        });

        setProperties(formattedProperties);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setError('দুঃখিত! তথ্য লোড করা যায়নি। পরে আবার চেষ্টা করুন।');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProperties = properties.filter(property => {
    const matchesFilter = filter === 'all' || property.propertyType === filter;
    const matchesSearch = property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.propertyType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div 
      className="market-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="market-header">
        <h1>আমাদের প্রপার্টি সমূহ</h1>
        
        {/* Search and Filter Section */}
        <div className="search-filter-container">
          <input
            type="text"
            placeholder="অবস্থান অথবা প্রপার্টির ধরন খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">সকল প্রপার্টি</option>
            <option value="প্লট">প্লট</option>
            <option value="ফ্ল্যাট">ফ্ল্যাট</option>
            <option value="জমি">জমি</option>
          </select>
        </div>
      </div>

      <AnimatePresence>
        {loading ? (
          <motion.div 
            className="loading-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="loading-spinner"></div>
            <p>লোড হচ্ছে...</p>
          </motion.div>
        ) : error ? (
          <motion.div 
            className="error-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FaInfoCircle />
            <p>{error}</p>
          </motion.div>
        ) : (
          <motion.div 
            className="property-grid"
            layout
          >
            {filteredProperties.map((property, index) => (
              <motion.div
                key={index}
                className="property-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <div className="property-image-container">
                  <img
                    src={property.propertyImage}
                    alt={`${property.propertyType} at ${property.location}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/280x180.png?text=ছবি+উপলব্ধ+নয়";
                    }}
                  />
                  <div className="property-type-badge">
                    <FaHome /> {property.propertyType}
                  </div>
                </div>

                <div className="property-details">
                  <div className="property-price">
                    <FaMoneyBillWave />
                    <h3>{property.price} টাকা</h3>
                  </div>

                  <div className="property-info">
                    <p><FaMapMarkerAlt /> {property.location}</p>
                    <p><FaRuler /> {property.propertyAmount} {property.landUnit}</p>
                    <p><FaPhone /> {property.ownerPhone}</p>
                  </div>

                  <div className="additional-info">
                    <p>{property.additionalInfo}</p>
                  </div>

                  <motion.button
                    className="contact-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = `tel:${property.ownerPhone}`}
                  >
                    যোগাযোগ করুন
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Market;
