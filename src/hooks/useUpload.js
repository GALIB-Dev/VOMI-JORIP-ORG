import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';
import { toast } from 'react-toastify';

export const useUpload = () => {
  const uploadImage = async (file) => {
    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('শুধুমাত্র ছবি আপলোড করুন');
        return null;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('ছবির সাইজ ৫MB এর কম হতে হবে');
        return null;
      }

      // Create unique filename
      const fileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, `property-images/${fileName}`);

      // Upload file
      const snapshot = await uploadBytes(storageRef, file);
      console.log('Image uploaded successfully');

      // Get download URL
      const url = await getDownloadURL(snapshot.ref);
      console.log('Download URL:', url);

      return url;
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('ছবি আপলোড করতে সমস্যা হয়েছে');
      return null;
    }
  };

  return { uploadImage };
};
