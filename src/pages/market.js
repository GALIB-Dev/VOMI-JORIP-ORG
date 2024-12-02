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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentPropertyImages, setCurrentPropertyImages] = useState([]);

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

  const handleImageClick = (images, index) => {
    setCurrentPropertyImages(images);
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeImagePreview = () => {
    setCurrentPropertyImages([]);
    setSelectedImageIndex(0);
    document.body.style.overflow = 'auto';
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => 
      prev === 0 ? currentPropertyImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => 
      prev === currentPropertyImages.length - 1 ? 0 : prev + 1
    );
  };

  const formatPhoneNumber = (phone) => {
    return phone?.toString() || '';
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
              <option value="Shop">দোকান</option>
              <option value="Office">অফিস</option>
              <option value="Commercial">কমার্শিয়াল</option>
              <option value="Industrial">ইন্ডাস্ট্রিয়াল</option>
            </select>
          </div>
        </div>
      </div>

      <div className="property-grid">
        {filteredProperties.map(property => (
          <div key={property.id} className="property-card">
            <div className="property-image">
              {property.propertyImages && property.propertyImages.length > 0 ? (
                <img
                  src={property.propertyImages[0]}
                  alt={property.propertyType}
                  onClick={() => handleImageClick(property.propertyImages, 0)}
                  className="clickable-image"
                  onError={(e) => {
                    e.target.src = "/placeholder.jpg";
                  }}
                />
              ) : (
                <img
                  src="/placeholder.jpg"
                  alt="No image available"
                  className="placeholder-image"
                />
              )}
              {property.propertyImages && property.propertyImages.length > 1 && (
                <div className="image-indicators">
                  {property.propertyImages.map((_, index) => (
                    <span 
                      key={index}
                      className={`indicator-dot ${index === 0 ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageClick(property.propertyImages, index);
                      }}
                    />
                  ))}
                </div>
              )}
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
                <p className="phone">
                  <FaPhone /> {formatPhoneNumber(property.ownerPhone)}
                </p>
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

      {/* Image Preview Modal with Navigation */}
      {currentPropertyImages.length > 0 && (
        <div className="image-preview-modal" onClick={closeImagePreview}>
          <button className="close-button" onClick={closeImagePreview}>
            <FaTimes />
          </button>
          
          {currentPropertyImages.length > 1 && (
            <>
              <button className="nav-button prev" onClick={handlePrevImage}>
                ❮
              </button>
              <button className="nav-button next" onClick={handleNextImage}>
                ❯
              </button>
            </>
          )}

          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img 
              src={currentPropertyImages[selectedImageIndex]} 
              alt={`Preview ${selectedImageIndex + 1}`} 
            />
            
            {currentPropertyImages.length > 1 && (
              <div className="modal-indicators">
                {currentPropertyImages.map((_, index) => (
                  <span
                    key={index}
                    className={`indicator-dot ${index === selectedImageIndex ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex(index);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Market;
