import { useState, useRef, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactCrop from 'react-image-crop';
import { toast } from 'react-toastify';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useUpload } from '../hooks/useUpload';
import { optimizeImage, generateCroppedImage } from '../utils/imageHandler';
import { VALIDATION_RULES } from '../config/constants';
import 'react-image-crop/dist/ReactCrop.css';

const PropertyForm = () => {
  // State management
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    propertyType: '',
    propertyAmount: '',
    price: '',
    ownerName: '',
    ownerPhone: '',
    location: '',
    imageUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Refs
  const imgRef = useRef(null);
  const location = useLocation();
  const { uploadImage } = useUpload();

  // Handle file selection and preview
  const handleFileSelect = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setIsEditing(true);
    };
    reader.readAsDataURL(file);
  }, []);

  // Handle crop completion and upload
  const handleCropComplete = useCallback(async () => {
    try {
      setLoading(true);
      
      const croppedBlob = await generateCroppedImage(imgRef.current, completedCrop);
      if (!croppedBlob) return;

      const optimizedImage = await optimizeImage(croppedBlob);
      const imageUrl = await uploadImage(optimizedImage);
      
      setFormData(prev => ({ ...prev, imageUrl }));
      setIsEditing(false);
      toast.success('ছবি সফলভাবে আপলোড হয়েছে!');
    } catch (error) {
      toast.error(error.message || 'আপলোড ব্যর্থ হয়েছে');
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  }, [completedCrop, uploadImage]);

  // Form validation and submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('ফর্মে কিছু ভুল আছে, সংশোধন করে আবার চেষ্টা করুন');
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, 'properties'), {
        ...formData,
        createdAt: new Date(),
        status: 'active'
      });

      toast.success('সফলভাবে জমা দেওয়া হয়েছে!');
      resetForm();
    } catch (error) {
      toast.error('দুঃখিত! কিছু সমস্যা হয়েছে।');
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  // ... rest of your component code (renderStepContent, etc.)
};

export default PropertyForm;
