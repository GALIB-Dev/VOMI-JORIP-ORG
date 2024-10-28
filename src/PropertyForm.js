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
      .then((response) => {
        // Check if response is OK
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Adjust based on your data structure
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
        <option value="চাষের জমি">চাষের জমি</option>
        <option value="বাণিজ্যিক জমি">বাণিজ্যিক জমি</option>
        <option value="বাণিজ্যিক এলাকা">বাণিজ্যিক এলাকা</option>
        <option value="পুকুর">পুকুর</option>
        <option value="বিল্ডিং">বিল্ডিং</option>
        <option value="বনের জমি">বনের জমি</option>
        <option value="নদীর পাশের জমি">নদীর পাশের জমি</option>
        <option value="চর জমি">চর জমি</option>
        <option value="বাড়ির আঙ্গিনা">বাড়ির আঙ্গিনা</option>
        <option value="গুদাম জমি">গুদাম জমি</option>
        <option value="গ্রাম্য জমি">গ্রাম্য জমি</option>
        <option value="বিল বা জলাভূমি">বিল বা জলাভূমি</option>
        <option value="চা বাগান">চা বাগান</option>
        <option value="মাছের খামার">মাছের খামার</option>
        <option value="বাঁশ বাগান">বাঁশ বাগান</option>
        <option value="জলাশয়">জলাশয়</option>
        <option value="ফলের বাগান">ফলের বাগান</option>
        <option value="শিক্ষা প্রতিষ্ঠান জমি">শিক্ষা প্রতিষ্ঠান জমি</option>
        <option value="কবরস্থান জমি">কবরস্থান জমি</option>
        <option value="উচ্চভূমি">উচ্চভূমি</option>
        <option value="খামার বাড়ি">খামার বাড়ি</option>
        <option value="সেচন জমি">সেচন জমি</option>
        <option value="পালিত বন">পালিত বন</option>
        <option value="কৃষি খামার জমি">কৃষি খামার জমি</option>
        <option value="পশুপালন খামার জমি">পশুপালন খামার জমি</option>
        <option value="ঝোপঝাড় জমি">ঝোপঝাড় জমি</option>
        <option value="ভিটেবাড়ি">ভিটেবাড়ি</option>
        <option value="কাঠের জমি">কাঠের জমি</option>
        <option value="সীমান্ত জমি">সীমান্ত জমি</option>
      </select>

      <label className="form-label">মূল্য:প্রতি একক(BDT)</label>
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="মূল্য লিখুন" className="form-input" />

      <label className="form-label">মালিকের নাম</label>
      <input type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} placeholder="মালিকের নাম লিখুন" className="form-input" />

      <label className="form-label">মালিকের ফোন নম্বর</label>
      <input type="tel" value={ownerPhone} onChange={(e) => setOwnerPhone(e.target.value)} placeholder="ফোন নম্বর লিখুন" className="form-input" />

      <label className="form-label">অবস্থান</label>
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="অবস্থান লিখুন" className="form-input" />

      <label className="form-label">অতিরিক্ত তথ্য (Optional)</label>
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
        <div className={`submit-status ${submitStatus.success ? 'success' : 'error'}`}>
          {submitStatus.message}
        </div>
      )}
    </form>
  );
};

export default PropertyForm;
