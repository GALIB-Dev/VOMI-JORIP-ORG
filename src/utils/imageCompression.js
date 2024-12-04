import imageCompression from 'browser-image-compression';

export const compressImage = async (file) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };

  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
};

export const processImageWithWorker = (file) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('../workers/heavy-computation.worker.js', import.meta.url));
    
    // Create canvas and load image
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      worker.onmessage = (event) => {
        const processedImageData = event.data;
        ctx.putImageData(processedImageData, 0, 0);
        canvas.toBlob((blob) => {
          worker.terminate();
          resolve(blob);
        }, 'image/jpeg', 0.8);
      };

      worker.postMessage({
        type: 'image-processing',
        data: imageData
      }, [imageData.data.buffer]);
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};
