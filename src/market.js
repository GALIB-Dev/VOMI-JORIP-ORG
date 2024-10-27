import React, { useEffect, useState } from 'react';
import './market.css';

const Market = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to format Google Drive URLs
  const formatDriveUrl = (url) => {
    return url.includes('drive.google.com')
      ? url.replace('/file/d/', '/uc?export=view&id=').replace('/view?usp=sharing', '')
      : url;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5isSWxYcD2SLVidtyZXou_zVP6QK08fav2sT3rvO8kCuB78yDNiy6Kr8TZqzJ_KBs9E4xkWGfghAM/pub?output=csv'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data from Google Sheets');
        }

        const data = await response.text();
        const rows = data.split('\n').slice(1); // Skip header row

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
        console.error('Error fetching data:', error);
        setError('Unable to load properties. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="market">
      {loading && <div className="loading-spinner">Loading properties...</div>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && properties.length === 0 && (
        <p className="no-data">No properties available at the moment.</p>
      )}
      {!loading && !error && properties.length > 0 && (
        <div className="property-list">
          {properties.map((property, index) => (
            <div key={index} className="property-card">
              <img
                src={property.propertyImage}
                alt={`Property ${index + 1}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://example.com/fallback-image.jpg"; // Default fallback image URL
                }}
              />
              <div className="property-details">
                <h4>মূল্য: {property.price} BDT</h4>
                <p><h4><b>ধরন: {property.propertyType}</b></h4></p>
                <p>মালিক: {property.ownerName}</p>
                <p>যোগাযোগ: {property.ownerPhone}</p>
                <p>অবস্থান: {property.location}</p>
                <p>বিস্তারিত: {property.additionalInfo}</p>
                <p><b>পরিমাণ: {property.propertyAmount} {property.landUnit}</b></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Market;
