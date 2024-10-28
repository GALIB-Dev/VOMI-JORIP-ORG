import React, { useEffect, useState } from 'react';
import './market.css';

const Market = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to format Google Drive URLs
  const formatDriveUrl = (url) => {
    if (url.includes('drive.google.com/file/d/')) {
      const id = url.split('/d/')[1].split('/')[0]; // Extract the file ID
      return `https://drive.google.com/uc?export=view&id=${id}`; // Create direct link
    }
    return url; // Return original URL if it's not a Google Drive link
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
            propertyImage: formatDriveUrl(columns[9]), // Format image URL
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
                  e.target.src = "https://via.placeholder.com/280x180.png?text=Image+Not+Available"; // Fallback image
                }}
              />
              <div className="property-details">
                <h4>মূল্য: {property.price} BDT</h4>
                <p><b>ধরন: {property.propertyType}</b></p>
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
