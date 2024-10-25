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
        const rows = data.split('\n').slice(1);

        const formattedProperties = rows.map(row => {
          const columns = row.split(',');
          return {
            timestamp: columns[0],
            image: formatDriveUrl(columns[1]),
            description: columns[2],
            price: columns[3],
            ownerName: columns[4],
            phoneNumber: columns[5],
            location: columns[6],
            additionalInfo: columns[7],
            confirmationMessage: columns[8],
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
                src={property.image}
                alt={`Property ${index + 1}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://drive.google.com/drive/folders/1X7KZAsyHyRhlTN8pnE64Lciu7MQ0cR9oGuNNFGMLMl4HMv3PAsRthqR0R7lMNopue5pYiNxK?usp=sharinghttps://drive.google.com/drive/folders/1kncp3ITzJtSeQNjkJiioUACDR1y5Tk5VkQIL7qggX5onSCv_STD_oQQuKcR8JuA1q9EPm9I3?usp=sharing"; // Default fallback image
                }}
              />
              <div className="property-details">
                <h4>মূল্য  : {property.description} BDT</h4>
                <p> মালিক : {property.price}</p>
                <p>যোগাযোগ : {property.ownerName}</p>
                <p>অবস্থান  : {property.phoneNumber}</p>
                <p> বিস্তারিত : {property.location}</p>
                <p>পরিমাণ  : {property.additionalInfo}</p>
                <p className="confirmation-message">একক : {property.confirmationMessage}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Market;
