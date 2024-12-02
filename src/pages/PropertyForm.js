import { useState } from 'react';
import { toast } from 'react-toastify';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import '../styles/PropertyForm.css';

const MAX_FILE_SIZE = 16 * 1024 * 1024; // 16MB limit
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_IMAGES = 3;

const initialFormState = {
  additionalInfo: 'কোনো তথ্য নেই',
  landUnit: 'শতক',
  ownerName: '',
  ownerPhone: '',
  price: '',
  propertyAddress: '',
  propertyAmount: '',
  propertyType: '',
  totalPrice: ''
};

const districts = [
  'বাগেরহাট', 'বান্দরবান', 'বরগুনা', 'বরিশাল', 'ভোলা', 'বগুড়া', 'ব্রাহ্মণবাড়িয়া', 'চাঁদপুর', 'চাঁপাইনবাবগঞ্জ',
  'চট্টগ্রাম', 'চুয়াডাঙ্গা', 'কক্সবাজার', 'কুমিল্লা', 'ঢাকা', 'দিনাজপুর', 'ফরিদপুর', 'ফেনী', 'গাইবান্ধা',
  'গাজীপু', 'গোপালগঞ্জ', 'হবিগঞ্জ', 'জামালপুর', 'যশোর', 'ঝালকাঠি', 'ঝিনাইদহ', 'জয়পুরহাট', 'খাগড়াছড়ি',
  'খুলনা', 'কিশোরগঞ্জ', 'কুড়িগ্রাম', 'কুষ্টিয়া', 'লক্ষ্মীপুর', 'লালমনিরহাট', 'মাদারীপুর', 'মাগুরা', 'মানিকগঞ্জ',
  'মেহেরপুর', 'মৌলভীবাড়িয়া', 'মুন্সিগঞ্জ', 'ময়মনসিংহ', 'নওগাঁ', 'নড়াইল', 'নারায়ণগঞ্জ', 'নরসিংদী', 'নাটোর',
  'নেত্রকোণা', 'নীলফামারী', 'নোয়াখালী', 'পাবনা', 'পঞ্চগড়', 'পটুয়াখালী', 'পিরোজপুর', 'রাজবাড়ী', 'রাজশাহী',
  'রাঙ্গামাটি', 'রংপুর', 'সাতক্ষীরা', 'শরীয়তপুর', 'শেরপুর', 'সিরাজগঞ্জ', 'সুনামগঞ্জ', 'সিলেট', 'টাঙ্গাইল', 'ঠাকুরগাঁও'
];

const PropertyForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
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
    
    // Validate phone number length and format
    if (name === 'ownerPhone') {
      // Remove any non-digit characters
      const phoneValue = value.replace(/\D/g, '');
      
      if (phoneValue.length > 11) {
        return; // Don't update if longer than 11 digits
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: phoneValue
      }));
      return;
    }

    setFormData(prev => {
      const updates = {
        ...prev,
        [name]: value,
        // Combine district and additional address into propertyAddress
        ...(name === 'district' || name === 'additionalAddress' ? {
          propertyAddress: `${prev.district || ''}, ${prev.additionalAddress || ''}`
        } : {})
      };

      // Calculate total price when either propertyAmount or price changes
      if (name === 'propertyAmount' || name === 'price') {
        const amount = name === 'propertyAmount' ? Number(value) : Number(prev.propertyAmount);
        const price = name === 'price' ? Number(value) : Number(prev.price);
        updates.totalPrice = amount * price;
      }

      return updates;
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (imageFiles.length + files.length > MAX_IMAGES) {
      toast.error(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    const validFiles = files.filter(file => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error('Only JPG, PNG and WebP formats are allowed');
        return false;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error('File size must not exceed 16MB');
        return false;
      }

      return true;
    });

    setImageFiles(prev => [...prev, ...validFiles]);

    // Generate previews for valid files
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Upload all images to ImgBB
      const imageUrls = await Promise.all(
        imageFiles.map(file => uploadToImgBB(file))
      );

      const propertyData = {
        ...formData,
        ownerPhone: formData.ownerPhone,
        price: Number(formData.price),
        propertyAmount: Number(formData.propertyAmount),
        totalPrice: Number(formData.totalPrice),
        propertyImages: imageUrls, // Array of image URLs
        timestamp: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'properties'), propertyData);
      toast.success('Property submitted successfully!');
      
      // Reset form
      setFormData(initialFormState);
      setImageFiles([]);
      setImagePreviews([]);
      
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit property: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="form-title">সম্পত্তি বিক্রয়ের ফরম</h1>
      <form onSubmit={handleSubmit} className="property-form">
        <div className="form-group">
          <label>মালিকের নাম</label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>মালিকের ফোন নম্বর</label>
          <input
            type="tel"
            name="ownerPhone"
            value={formData.ownerPhone}
            onChange={handleInputChange}
            pattern="01[0-9]{9}"
            maxLength="11"
            placeholder="01XXXXXXXXX"
            required
          />
        </div>

        <div className="form-group">
          <label>সম্পত্তির ধিকানা</label>
          <input
            type="text"
            name="propertyAddress"
            value={formData.propertyAddress}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>সম্পত্তির ধরন</label>
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleInputChange}
            required
          >
            <option value="বাড়ি">বাড়ি</option>
            <option value="ফ্ল্যাট">ফ্ল্যাট</option>
            <option value="দোকান">দোকান</option>
            <option value="কারখানা">কারখানা</option>
            <option value="গুদাম">গুদাম</option>
            <option value="অফিস">অফিস</option>
            <option value="বাণিজ্যিক প্লট">বাণিজ্যিক প্লট</option>
            <option value="আবাসিক প্লট">আবাসিক প্লট</option>
            <option value="কৃষি জমি">কৃষি জমি</option>
            <option value="বাগানবাড়ি">বাগানবাড়ি</option>
            <option value="রিসোর্ট">রিসোর্ট</option>
            <option value="হোটেল">হোটেল</option>
            <option value="রেস্টুরেন্ট">রেস্টুরেন্ট</option>
            <option value="শিক্ষা প্রতিষ্ঠান">শিক্ষা প্রতিষ্ঠান</option>
            <option value="স্বাস্থ্যকেন্দ্র">স্বাস্থ্যকেন্দ্র</option>
            <option value="গ্যারেজ">গ্যারেজ</option>
            <option value="পেট্রোল পাম্প">পেট্রোল পাম্প</option>
            <option value="শিল্প প্লট">শিল্প প্লট</option>
            <option value="বাণিজ্যিক ভবন">বাণিজ্যিক ভবন</option>
            <option value="কনডোমিনিয়াম">কনডোমিনিয়াম</option>
            <option value="বিল্ডিং">বিল্ডিং</option>
            <option value="মাঠ">মাঠ</option>
            <option value="পার্কিং স্পেস">পার্কিং স্পেস</option>
            <option value="প্লট">প্লট</option>
            <option value="বাগান">বাগান</option>
            <option value="পুকুর">পুকুর</option>
            <option value="বনভূমি">বনভূমি</option>
            <option value="চাষের জমি">চাষের জমি</option>
            <option value="বাণিজ্যিক জমি">বাণিজ্যিক জমি</option>
          </select>
        </div>

        <div className="form-group">
          <label>জমির একক</label>
          <select
            name="landUnit"
            value={formData.landUnit}
            onChange={handleInputChange}
            required
          >
            <option value="শতক">শতক</option>
            <option value="কাঠা">কাঠা</option>
            <option value="বিঘা">বিঘা</option>
            <option value="একর">একর</option>
            <option value="ছটাক">ছটাক</option>
            <option value="কানি">কানি</option>
          </select>
        </div>

        <div className="form-group">
          <label>সম্পত্তির পরিমাণ ({formData.landUnit})</label>
          <input
            type="number"
            name="propertyAmount"
            value={formData.propertyAmount}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>দাম (প্রতি {formData.landUnit})</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>মোট দাম</label>
          <input
            type="number"
            name="totalPrice"
            value={formData.totalPrice}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>অতিরিক্ত তথ্য</label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>সম্পত্তির ছবি (সর্বোচ্চ ৩টি)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading || imageFiles.length >= MAX_IMAGES}
            multiple
          />
          <div className="image-preview-container">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="preview-wrapper">
                <img 
                  src={preview} 
                  alt={`Preview ${index + 1}`} 
                  className="preview-image"
                />
                <button 
                  type="button"
                  className="remove-image"
                  onClick={() => removeImage(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>জেলা</label>
          <select
            name="district"
            value={formData.district || ''}
            onChange={handleInputChange}
            required
          >
            <option value="">জেলা নির্বাচন করুন</option>
            {districts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>বিস্তারিত ঠিকানা</label>
          <input
            type="text"
            name="additionalAddress"
            value={formData.additionalAddress || ''}
            onChange={handleInputChange}
            required
          />
        </div>

        <button 
          type="submit" 
          className={`submit-button ${loading ? 'loading' : ''}`} 
          disabled={loading}
        >
          {loading ? 'আপলোড হচ্ছে...' : 'জমা দিন'}
        </button>
      </form>
    </>
  );
};

export default PropertyForm;
