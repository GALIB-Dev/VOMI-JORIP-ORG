import React, { useState, useCallback, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleLogin } from '@react-oauth/google';
import { useLocation } from 'react-router-dom';
import { googleDriveService } from '../services/googleDrive';
import '../styles/PropertyForm.css';

const variants = {
  enter: { x: 300, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -300, opacity: 0 }
};

// Move validateStep outside the component
const validateStep = (step, formData) => {
  switch (step) {
    case 1:
      return formData.propertyType && formData.propertyAmount && formData.price;
    case 2:
      return formData.ownerName && formData.ownerPhone && formData.location;
    case 3:
      return true; // Additional info is optional
    default:
      return false;
  }
};

const PropertyForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    propertyType: '',
    price: '',
    ownerName: '',
    ownerPhone: '',
    location: '',
    additionalInfo: '',
    propertyAmount: '',
    landUnit: 'কাঠা',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const location = useLocation();

  const login = useGoogleLogin({
    onSuccess: (response) => {
      localStorage.setItem('google_access_token', response.access_token);
      handleUpload();
    },
    onError: (error) => {
      console.error('Login Failed:', error);
      toast.error('Google লগইন ব্যর্থ হয়েছে');
    },
    scope: 'https://www.googleapis.com/auth/drive.file',
    flow: 'implicit'
  });

  // Image compression function
  const compressImage = async (file) => {
    try {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            try {
              const canvas = document.createElement('canvas');
              const MAX_WIDTH = 1200;
              const MAX_HEIGHT = 1200;
              let width = img.width;
              let height = img.height;

              if (width > height) {
                if (width > MAX_WIDTH) {
                  height *= MAX_WIDTH / width;
                  width = MAX_WIDTH;
                }
              } else {
                if (height > MAX_HEIGHT) {
                  width *= MAX_HEIGHT / height;
                  height = MAX_HEIGHT;
                }
              }

              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0, width, height);

              canvas.toBlob((blob) => {
                if (!blob) {
                  reject(new Error('Image compression failed'));
                  return;
                }
                resolve(new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                }));
              }, 'image/jpeg', 0.7);
            } catch (error) {
              reject(error);
            }
          };
          img.onerror = reject;
          img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error('Image compression error:', error);
      throw new Error('ছবি প্রক্রিয়াকরণে সমস্যা হয়েছে');
    }
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('ছবির সাইজ ৫ এমবি-এর বেশি হতে পারবে না');
        return;
      }
      setImageFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Reset form function
  const resetForm = () => {
    setFormData({
      propertyType: '',
      price: '',
      ownerName: '',
      ownerPhone: '',
      location: '',
      additionalInfo: '',
      propertyAmount: '',
      landUnit: 'কাঠা',
    });
    setImageFile(null);
    setImagePreview(null);
    setStep(1);
    
    // Cleanup preview URL to prevent memory leaks
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
  };

  // Cleanup on component unmount
  React.useEffect(() => {
    return () => {
      // Cleanup preview URL when component unmounts
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Then update the handleNext function
  const handleNext = useCallback(() => {
    if (!validateStep(step, formData)) {
      toast.error('সব তথ্য পূরণ করুন');
      return;
    }
    setStep(prev => Math.min(prev + 1, 3));
  }, [step, formData]);

  const handlePrev = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  // Upload to Google Drive
  const handleUpload = async () => {
    const token = localStorage.getItem('google_access_token');
    if (!token) {
      toast.error('Google অনুমোদন প্রয়োজন');
      return;
    }

    try {
      setLoading(true);
      const compressedImage = await compressImage(imageFile);
      const imageUrl = await googleDriveService.uploadFile(token, compressedImage);
      await saveToFirebase(imageUrl);
      toast.success('সফলভাবে আপলোড হয়েছে!');
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('আপলোড ব্যর্থ হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3, formData)) {
      toast.error('সব তথ্য পূরণ করুন');
      return;
    }

    setLoading(true);
    try {
      let imageUrl = '';
      if (imageFile) {
        console.log('Starting image upload...'); // Debug log
        const token = localStorage.getItem('google_access_token');
        if (!token) {
          console.log('No token, initiating login...'); // Debug log
          login();
          return;
        }
        const compressedImage = await compressImage(imageFile);
        imageUrl = await googleDriveService.uploadFile(token, compressedImage);
        console.log('Upload successful:', imageUrl); // Debug log
      }

      const propertyData = {
        ...formData,
        imageUrl,
        createdAt: new Date(),
        status: 'active'
      };

      await addDoc(collection(db, 'properties'), propertyData);
      toast.success('ফর্ম সফলভাবে জমা দেওয়া হয়েছে!');
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      toast.error('দুঃখিত! কিছু সমস্যা হয়েছে।');
    } finally {
      setLoading(false);
    }
  };

  const saveToFirebase = async (imageUrl) => {
    try {
      const propertyData = {
        ...formData,
        imageUrl,
        createdAt: new Date(),
        status: 'active'
      };

      await addDoc(collection(db, 'properties'), propertyData);
      toast.success('ফর্ম সফলভাবে জমা দেওয়া হয়েছে!');
      resetForm();
    } catch (error) {
      console.error('Firebase save error:', error);
      toast.error('দুঃখিত! কিছু সমস্যা হয়েছে।');
    }
  };

  // Check for auth callback messages
  useEffect(() => {
    if (location.state?.authSuccess) {
      toast.success(location.state.message);
    } else if (location.state?.authError) {
      toast.error(location.state.message);
    }
  }, [location]);

  // Form rendering helpers
  const renderStepContent = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return (
          <motion.div
            key="step1"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="form-step"
          >
            <div className="form-group">
              <label>সম্পত্ির ধরন</label>
              <input
                type="text"
                value={formData.propertyType}
                onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
                placeholder="যেমন: প্লট/ফ্ল্যাট/জমি"
                required
              />
            </div>
            
            <div className="form-group">
              <label>দাম (টকা)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                placeholder="উদাহরণ: ১০০০০০"
                required
              />
            </div>

            <div className="form-group">
              <label>পরিমাণ</label>
              <div className="amount-input">
                <input
                  type="number"
                  value={formData.propertyAmount}
                  onChange={(e) => setFormData({...formData, propertyAmount: e.target.value})}
                  placeholder="পরিমাণ লিখুন"
                  required
                />
                <select
                  value={formData.landUnit}
                  onChange={(e) => setFormData({...formData, landUnit: e.target.value})}
                >
                  <option value="কাঠা">কাঠা</option>
                  <option value="শতক">শতক</option>
                  <option value="বিঘা">বিঘা</option>
                  <option value="একর">একর</option>
                </select>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="form-step"
          >
            <div className="form-group">
              <label>মালিকের নাম</label>
              <input
                type="text"
                value={formData.ownerName}
                onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                placeholder="পূর্ণ নাম লিখন"
                required
              />
            </div>

            <div className="form-group">
              <label>মোবাইল নম্বর</label>
              <input
                type="tel"
                value={formData.ownerPhone}
                onChange={(e) => setFormData({...formData, ownerPhone: e.target.value})}
                placeholder="০১XXXXXXXXX"
                pattern="[০-৯]{11}"
                required
              />
            </div>

            <div className="form-group">
              <label>অবস্থান</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="সম্পূর্ণ ঠিকানা"
                required
              />
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="form-step"
          >
            <div className="form-group">
              <label>অতিরিক্ত তথ্য</label>
              <textarea
                value={formData.additionalInfo}
                onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
                placeholder="অন্যান্য প্রয়োজনীয় তথ্য..."
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label>ছবি আপলোড করুন</label>
              <div className="file-upload-container">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                  required
                />
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="property-form-container">
      <motion.div 
        className="form-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="form-title">জমি/প্লট বিক্রয়ের তথ্য</h2>
        
        <div className="step-indicators">
          {[1, 2, 3].map((num) => (
            <div 
              key={num} 
              className={`step-indicator ${step === num ? 'active' : ''}`}
            >
              {num}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode='wait'>
            {renderStepContent(step)}
          </AnimatePresence>

          <div className="form-navigation">
            {step > 1 && (
              <button 
                type="button" 
                onClick={handlePrev}
                className="prev-button"
              >
                পূর্ববর্তী
              </button>
            )}
            {step < 3 ? (
              <button 
                type="button" 
                onClick={handleNext}
                className="next-button"
              >
                পরবর্তী
              </button>
            ) : (
              <button 
                type="submit" 
                className="submit-button" 
                disabled={loading}
              >
                {loading ? (
                  <span>
                    <span className="loading-spinner"></span>
                    অপেক্ষা করুন...
                  </span>
                ) : (
                  'জমা দিন'
                )}
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PropertyForm;
