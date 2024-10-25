import React, { useState } from 'react';
import './PropertyForm.css';

const PropertyForm = () => {
  const [propertyImage, setPropertyImage] = useState(null);
  const [imageError, setImageError] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [price, setPrice] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [location, setLocation] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [propertyAmount, setPropertyAmount] = useState('');
  const [landUnit, setLandUnit] = useState('কাঠা');
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // Max 5MB
      if (!allowedTypes.includes(file.type)) {
        setImageError('শুধুমাত্র PNG বা JPG ফাইল আপলোড করতে পারবেন');
        setPropertyImage(null);
        return;
      }
      if (file.size > maxSize) {
        setImageError('ফাইলের আকার সর্বাধিক ৫ এমবি হতে পারে');
        setPropertyImage(null);
        return;
      }

      setImageError('');
      setPropertyImage(file); // Store file directly as a Blob
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!propertyImage) {
      setImageError('ছবি আপলোড করতে হবে');
      return;
    }

    const formData = new FormData();
    formData.append('propertyImage', propertyImage); // Send image as Blob
    formData.append('propertyType', propertyType);
    formData.append('price', price);
    formData.append('ownerName', ownerName);
    formData.append('ownerPhone', ownerPhone);
    formData.append('location', location);
    formData.append('additionalInfo', additionalInfo);
    formData.append('propertyAmount', propertyAmount);
    formData.append('landUnit', landUnit);

    fetch('https://script.google.com/macros/s/AKfycbyiPzfxpK2g-vB39wcIoB6q0MZ2AjKc5YQSFyewIfsWnIzx-RNMWLt1ZUYHm9HVFs8/exec', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setSubmitStatus({ success: true, message: 'ফর্ম সফলভাবে জমা দেওয়া হয়েছে!' });
        resetForm();
      })
      .catch((error) => {
        console.error('Error:', error);
        setSubmitStatus({ success: false, message: 'ফর্ম জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।' });
      });
  };

  const resetForm = () => {
    setPropertyImage(null);
    setPropertyType('');
    setPrice('');
    setOwnerName('');
    setOwnerPhone('');
    setLocation('');
    setAdditionalInfo('');
    setPropertyAmount('');
    setLandUnit('কাঠা');
    setSubmitStatus(null);
  };

  return (
    <form onSubmit={handleSubmit} className="property-form">
      <h2 className="form-title">জমি বিক্রয় ফর্ম</h2>

      <label className="form-label">সম্পত্তির ছবি (PNG বা JPG, সর্বাধিক ৫ এমবি)</label>
      <input type="file" onChange={handleImageUpload} accept="image/jpeg, image/png" className="form-input" />
      {imageError && <p className="error-message">{imageError}</p>}
      {propertyImage && (
        <div className="image-preview">
          <img src={URL.createObjectURL(propertyImage)} alt="Property" className="uploaded-image" />
        </div>
      )}

      <label className="form-label">সম্পত্তির ধরণ</label>
      <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="form-input">
        <option value="">ধরণ নির্বাচন করুন</option>
        <option value="farming">চাষের জমি</option>
        <option value="business">বাণিজ্যিক জমি</option>
        <option value="commercial">বাণিজ্যিক এলাকা</option>
        <option value="pond">পুকুর</option>
        <option value="building">বিল্ডিং</option>
        <option value="forest">বনের জমি</option>
        <option value="river">নদীর পাশের জমি</option>
      </select>

      <label className="form-label">মূল্য (BDT)</label>
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="মূল্য লিখুন" className="form-input" />

      <label className="form-label">মালিকের নাম</label>
      <input type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} placeholder="মালিকের নাম লিখুন" className="form-input" />

      <label className="form-label">মালিকের ফোন নম্বর</label>
      <input type="tel" value={ownerPhone} onChange={(e) => setOwnerPhone(e.target.value)} placeholder="ফোন নম্বর লিখুন" className="form-input" />

      <label className="form-label">অবস্থান</label>
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="অবস্থান লিখুন" className="form-input" />

      <label className="form-label">অতিরিক্ত তথ্য (ঐচ্ছিক)</label>
      <textarea value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} placeholder="অতিরিক্ত তথ্য" className="form-input" />

      <label className="form-label">পরিমাণ</label>
      <input type="number" value={propertyAmount} onChange={(e) => setPropertyAmount(e.target.value)} placeholder="পরিমাণ লিখুন" className="form-input" />

      <label className="form-label">মাপের একক</label>
      <select value={landUnit} onChange={(e) => setLandUnit(e.target.value)} className="form-input">
        <option value="কাঠা">কাঠা</option>
        <option value="বিঘা">বিঘা</option>
        <option value="শতাংশ">শতাংশ</option>
        <option value="একর">একর</option>
        <option value="আধেক">আধেক</option>
      </select>

      <button type="submit" className="submit-button">জমা দিন</button>

      {submitStatus && (
        <p className={submitStatus.success ? 'success-message' : 'error-message'}>
          {submitStatus.message}
        </p>
      )}
    </form>
  );
};

export default PropertyForm;


