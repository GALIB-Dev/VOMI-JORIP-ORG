import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { FaHome, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaSearch, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import '../styles/market.css';

const Market = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const q = query(collection(db, 'properties'), orderBy('timestamp', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate()
      }));
      setProperties(data);
    } catch (error) {
      toast.error('তথ্য লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesFilter = filter === 'all' || property.propertyType === filter;
    const matchesSearch = !searchTerm || 
      property.propertyAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.propertyType?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatDate = (timestamp) => {
    if (!timestamp) return 'তারিখ নেই';
    return new Date(timestamp).toLocaleDateString('bn-BD');
  };

  const formatPrice = (price) => {
    return `৳ ${new Intl.NumberFormat('bn-BD').format(price)}`;
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeImagePreview = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  if (loading) return <div className="loading">লোড হচ্ছে...</div>;

  return (
    <div className="market-container">
      <div className="market-header">
        <h1>আমাদের প্রপার্টি সমূহ</h1>
        
        <div className="filters">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="select-wrapper">
            <FaHome className="select-icon" />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">সকল প্রপার্টি</option>
              <option value="House">বাড়ি</option>
              <option value="Land">জমি</option>
              <option value="Apartment">ফ্ল্যাট</option>
            </select>
          </div>
        </div>
      </div>

      <div className="property-grid">
        {filteredProperties.map(property => (
          <div key={property.id} className="property-card">
            <div className="property-image">
              <img
                src={property.propertyImage || "/placeholder.jpg"}
                alt={property.propertyType}
                onClick={() => handleImageClick(property.propertyImage || "/placeholder.jpg")}
                className="clickable-image"
                onError={(e) => {
                  e.target.src = "/placeholder.jpg";
                }}
              />
              <span className="property-type">
                <FaHome /> {property.propertyType}
              </span>
              <span className="property-date">
                <FaCalendarAlt /> {formatDate(property.timestamp)}
              </span>
            </div>

            <div className="property-info">
              <div className="price">
                <div className="price-details">
                  <span className="total-price">{formatPrice(property.totalPrice)}</span>
                  <span className="unit-price">
                    {formatPrice(property.price)}/{property.landUnit}
                  </span>
                </div>
              </div>

              <div className="details">
                <p className="owner-name"><strong>মালিক:</strong> {property.ownerName}</p>
                <p className="address"><FaMapMarkerAlt /> {property.propertyAddress}</p>
                <p className="size"><strong>আয়তন:</strong> {property.propertyAmount} {property.landUnit}</p>
                <p className="phone"><FaPhone /> {property.ownerPhone}</p>
                {property.additionalInfo && property.additionalInfo !== 'কোনো তথ্য নেই' && (
                  <p className="additional-info"><strong>অতিরিক্ত তথ্য:</strong> {property.additionalInfo}</p>
                )}
              </div>

              <button 
                className="call-button"
                onClick={() => window.location.href = `tel:${property.ownerPhone}`}
              >
                <FaPhone /> কল করুন
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="image-preview-modal" onClick={closeImagePreview}>
          <button className="close-button" onClick={closeImagePreview}>
            <FaTimes />
          </button>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img src={selectedImage} alt="Preview" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Market;
