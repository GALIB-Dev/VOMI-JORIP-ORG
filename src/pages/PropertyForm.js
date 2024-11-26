import { useState } from 'react';
import { toast } from 'react-toastify';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useUpload } from '../hooks/useUpload';
import '../styles/PropertyForm.css';

const initialFormState = {
  propertyType: '',        // House, Land, Apartment
  propertyAmount: '',      // 20
  landUnit: '',           // Acres, Decimal, Katha
  price: '',              // Price per unit
  totalPrice: '',         // Calculated total price
  ownerName: '',          // Owner's name
  ownerPhone: '',         // Phone number
  propertyAddress: '',    // Property location
  additionalInfo: '',     // Additional details
  propertyImage: '',      // Image URL
};

const PropertyForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { uploadImage } = useUpload();

  // Calculate total price
  const calculateTotalPrice = (price, amount) => {
    if (price && amount && amount > 0) {
      return Math.round(price * amount);
    }
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };

      // Calculate total price when price or amount changes
      if (name === 'price' || name === 'propertyAmount') {
        newData.totalPrice = calculateTotalPrice(
          name === 'price' ? value : prev.price,
          name === 'propertyAmount' ? value : prev.propertyAmount
        );
      }

      return newData;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';
      if (imageFile) {
        // Upload image first
        imageUrl = await uploadImage(imageFile);
        if (!imageUrl) {
          setLoading(false);
          return; // Stop if image upload failed
        }
      }

      // Prepare form data
      const propertyData = {
        ...formData,
        propertyImage: imageUrl,
        timestamp: serverTimestamp(),
      };

      // Add to Firestore
      const docRef = await addDoc(collection(db, 'properties'), propertyData);
      console.log('Document written with ID:', docRef.id);
      
      toast.success('সম্পত্তি সফলভাবে জমা দেওয়া হয়েছে!');
      
      // Reset form
      setFormData(initialFormState);
      setImageFile(null);
      setImagePreview(null);
      
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('জমা দিতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="property-form-container">
      <h2>সম্পত্তি বিক্রয় ফরম</h2>
      <form onSubmit={handleSubmit} className="property-form">
        {/* Property Type */}
        <div className="form-group">
          <label htmlFor="propertyType">সম্পত্তির ধরন</label>
          <select
            id="propertyType"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleInputChange}
            required
          >
            <option value="">সিলেক্ট করুন</option>
            <option value="House">বাড়ি</option>
            <option value="Land">জমি</option>
            <option value="Apartment">ফ্ল্যাট</option>
          </select>
        </div>

        {/* Property Amount */}
        <div className="form-group">
          <label htmlFor="propertyAmount">সম্পত্তির পরিমাণ</label>
          <input
            type="number"
            id="propertyAmount"
            name="propertyAmount"
            value={formData.propertyAmount}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Land Unit */}
        <div className="form-group">
          <label htmlFor="landUnit">জমির একক</label>
          <select
            id="landUnit"
            name="landUnit"
            value={formData.landUnit}
            onChange={handleInputChange}
            required
          >
            <option value="">সিলেক্ট করুন</option>
            <option value="একর">একর</option>
            <option value="শতক">শতক</option>
            <option value="কাঠা">কাঠা</option>
          </select>
        </div>

        {/* Price Per Unit */}
        <div className="form-group">
          <label htmlFor="price">প্রতি {formData.landUnit || 'একক'} মূল্য (টাকা)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Total Price (Read-only) */}
        <div className="form-group">
          <label htmlFor="totalPrice">মোট মূল্য</label>
          <input
            type="text"
            id="totalPrice"
            name="totalPrice"
            value={formData.totalPrice ? `${formData.totalPrice.toLocaleString()} টাকা` : ''}
            readOnly
            className="read-only-input"
          />
        </div>

        {/* Owner Name */}
        <div className="form-group">
          <label htmlFor="ownerName">মালিকের নাম</label>
          <input
            type="text"
            id="ownerName"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Owner Phone */}
        <div className="form-group">
          <label htmlFor="ownerPhone">মোবাইল নম্বর</label>
          <input
            type="tel"
            id="ownerPhone"
            name="ownerPhone"
            value={formData.ownerPhone}
            onChange={handleInputChange}
            required
            pattern="[0-9]{11,}"
            placeholder="01XXXXXXXXX"
          />
        </div>

        {/* Property Address */}
        <div className="form-group">
          <label htmlFor="propertyAddress">সম্পত্তির ঠিকানা</label>
          <input
            type="text"
            id="propertyAddress"
            name="propertyAddress"
            value={formData.propertyAddress}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Additional Info */}
        <div className="form-group">
          <label htmlFor="additionalInfo">অতিরিক্ত তথ্য</label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            rows="4"
          />
        </div>

        {/* Image Upload Field */}
        <div className="form-group">
          <label htmlFor="propertyImage">ছবি</label>
          <div className="image-upload-container">
            <input
              type="file"
              id="propertyImage"
              accept="image/*"
              onChange={handleImageChange}
              className="image-input"
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-button" 
          disabled={loading}
        >
          {loading ? 'জমা দেওয়া হচ্ছে...' : 'জমা দিন'}
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;
