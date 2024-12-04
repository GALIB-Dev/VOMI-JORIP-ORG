import { useEffect, useCallback } from 'react';

function HeavyComputation() {
  useEffect(() => {
    const worker = new Worker(new URL('../workers/heavy-computation.worker.js', import.meta.url));
    
    worker.onmessage = (event) => {
      const result = event.data;
      // Handle the result
      console.log('Received result:', result);
    };

    // Cleanup
    return () => worker.terminate();
  }, []);

  const handleImageProcess = useCallback(() => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    worker.postMessage({
      type: 'image-processing',
      data: imageData
    }, [imageData.data.buffer]);
  }, []);

  return (
    <div>
      <button onClick={handleImageProcess}>Process Image</button>
      {/* Add other UI elements as needed */}
    </div>
  );
}

export default HeavyComputation; 