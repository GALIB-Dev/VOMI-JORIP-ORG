import React, { useEffect, useState } from 'react';
import './market.css';

const Market = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://docs.google.com/spreadsheets/d/e/2PACX-1vRa58948mO7lwPszaE3JEi5ltl8eRqTAzwxKuz8CoIVANcAdwFfhPreccWVXLX9t-dh17rfh3OQMhp9/pub?output=csv'
        );
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Remove header row
        const formattedProperties = rows.map(row => {
          const columns = row.split(',');
          
          // Format the Google Drive URL for images
          const googleDriveUrl = columns[1].includes('drive.google.com') 
           ? columns[1].replace('/file/d/', '/uc?export=view&id=').replace('/view?usp=sharing', '') 
           : columns[1];

        
          return {
            timestamp: columns[0],
            image: googleDriveUrl, // Updated to use the formatted URL
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
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="market">
      {loading ? (
        <p>Loading properties...</p>
      ) : (
        properties.map((property, index) => (
          <div key={index} className="property-card">
            <img
              src={property.image}
              alt={`Property ${index}`}
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://via.placeholder.com/150"; // Fallback if image fails
              }}
            />
            <h4>{property.description}</h4>
            <p>BDT {property.price}</p>
            <p>{property.ownerName}</p>
            <p>{property.phoneNumber}</p>
            <p>{property.location}</p>
            <p>{property.additionalInfo}</p>
            <p>{property.confirmationMessage}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Market;
