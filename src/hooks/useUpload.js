import { useState } from 'react';
import { compressImage } from '../utils/imageCompression';
import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const useUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (file) => {
    try {
      setLoading(true);
      setError(null);
      
      // Compress image
      const compressedFile = await compressImage(file);
      
      // Upload to Firebase Storage
      const storageRef = ref(storage, `properties/${Date.now()}-${file.name}`);
      const snapshot = await uploadBytes(storageRef, compressedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { uploadImage, loading, error };
};
