import { useState } from 'react';
import { toast } from 'react-toastify';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import '../styles/PropertyForm.css';

const MAX_FILE_SIZE = 16 * 1024 * 1024; // 16MB limit
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const initialFormState = {
  additionalInfo: 'NA',
  landUnit: 'শতক',
  ownerName: '',
  ownerPhone: '',
  price: '',
  propertyAddress: '',
  propertyAmount: '',
  propertyType: 'Land',
  totalPrice: ''
};

const PropertyForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok && data.success) {
        return data.data.url;
      } else {
        throw new Error(data.error?.message || 'Upload failed');
      }
    } catch (error) {
      console.error('ImgBB upload error:', error);
      throw error;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Auto calculate total price when price or propertyAmount changes
      ...(name === 'price' || name === 'propertyAmount' ? {
        totalPrice: Number(name === 'price' ? value : prev.price) * 
                   Number(name === 'propertyAmount' ? value : prev.propertyAmount)
      } : {})
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('Only JPG, PNG and WebP formats are allowed');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size must not exceed 16MB');
      return;
    }

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Starting submission...');

    try {
      let imageUrl = '';
      if (imageFile) {
        console.log('Starting image upload...');
        imageUrl = await uploadToImgBB(imageFile);
        console.log('Image uploaded:', imageUrl);
      }

      const propertyData = {
        ...formData,
        ownerPhone: Number(formData.ownerPhone),
        price: Number(formData.price),
        propertyAmount: Number(formData.propertyAmount),
        totalPrice: Number(formData.totalPrice),
        propertyImage: imageUrl,
        timestamp: serverTimestamp(),
      };

      console.log('Property data:', propertyData);

      const docRef = await addDoc(collection(db, 'properties'), propertyData);
      console.log('Document written with ID:', docRef.id);
      
      toast.success('Property submitted successfully!');
      
      // Reset form
      setFormData(initialFormState);
      setImageFile(null);
      setImagePreview(null);
      
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit property: ' + error.message);
    } finally {
      setLoading(false);
      console.log('Submission process completed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="property-form">
      <div className="form-group">
        <label>Owner Name</label>
        <input
          type="text"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Owner Phone</label>
        <input
          type="tel"
          name="ownerPhone"
          value={formData.ownerPhone}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Property Address</label>
        <input
          type="text"
          name="propertyAddress"
          value={formData.propertyAddress}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Property Type</label>
        <select
          name="propertyType"
          value={formData.propertyType}
          onChange={handleInputChange}
          required
        >
          <option value="Land">Land</option>
          {/* Add other property types if needed */}
        </select>
      </div>

      <div className="form-group">
        <label>Land Unit</label>
        <select
          name="landUnit"
          value={formData.landUnit}
          onChange={handleInputChange}
          required
        >
          <option value="শতক">শতক</option>
          {/* Add other units if needed */}
        </select>
      </div>

      <div className="form-group">
        <label>Property Amount (in {formData.landUnit})</label>
        <input
          type="number"
          name="propertyAmount"
          value={formData.propertyAmount}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Price (per {formData.landUnit})</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Total Price</label>
        <input
          type="number"
          name="totalPrice"
          value={formData.totalPrice}
          readOnly
        />
      </div>

      <div className="form-group">
        <label>Additional Info</label>
        <textarea
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Property Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={loading}
        />
      </div>
      
      {imagePreview && (
        <div className="image-preview">
          <img 
            src={imagePreview} 
            alt="Preview" 
            style={{ maxWidth: '200px' }} 
          />
        </div>
      )}

      <button 
        type="submit" 
        className={`submit-button ${loading ? 'loading' : ''}`} 
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Submit'}
      </button>
    </form>
  );
};

export default PropertyForm;
