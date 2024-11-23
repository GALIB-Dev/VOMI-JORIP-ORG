import Compressor from 'compressorjs';

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const optimizeImage = async (file, options = {}) => {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('ফাইল সাইজ ৫ এমবি-এর বেশি হতে পারবে না');
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    throw new Error('শুধুমাত্র JPG, PNG এবং WEBP ফরম্যাট গ্রহণযোগ্য');
  }

  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.8,
      maxWidth: 1920,
      maxHeight: 1080,
      convertSize: 1000000,
      success: resolve,
      error: reject,
      ...options
    });
  });
};

export const generateCroppedImage = async (imgRef, crop) => {
  if (!crop || !imgRef) return null;

  const canvas = document.createElement('canvas');
  const scaleX = imgRef.naturalWidth / imgRef.width;
  const scaleY = imgRef.naturalHeight / imgRef.height;
  
  canvas.width = crop.width;
  canvas.height = crop.height;
  
  const ctx = canvas.getContext('2d');
  ctx.drawImage(
    imgRef,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', 0.9);
  });
};

export const CROP_PRESETS = {
  FREE: { aspect: null, title: 'ফ্রি সাইজ' },
  SQUARE: { aspect: 1, title: 'বর্গাকার' },
  LANDSCAPE: { aspect: 16 / 9, title: 'ল্যান্ডস্কেপ' },
  PORTRAIT: { aspect: 3 / 4, title: 'পোর্ট্রেট' }
}; 