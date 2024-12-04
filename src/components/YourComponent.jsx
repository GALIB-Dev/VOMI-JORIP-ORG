import React, { useEffect } from 'react';

function YourComponent() {
  useEffect(() => {
    const worker = new Worker('/src/workers/heavy-computation.worker.js');
    
    worker.onerror = (error) => {
      console.error('Worker error:', error);
    };

    worker.postMessage({
      type: 'START_COMPUTATION',
      data: { /* your data */ }
    });

    worker.onmessage = (event) => {
      const { type, data, error } = event.data;
      
      if (error) {
        console.error('Worker processing error:', error);
        return;
      }

      switch (type) {
        case 'COMPUTATION_RESULT':
          console.log('Received result:', data);
          break;
        default:
          console.warn('Unknown message type:', type);
      }
    };

    return () => worker.terminate();
  }, []);
}

export default YourComponent; 