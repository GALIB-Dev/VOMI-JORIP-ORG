// First, create the worker
const worker = new Worker(new URL('./workers/heavy-computation.worker.js', import.meta.url));

// Add event listener for receiving results
worker.onmessage = (event) => {
  const result = event.data;
  // Handle the result based on what you're doing
  console.log('Received result:', result);
};

// Example function to trigger image processing
function processImage() {
  const canvas = document.querySelector('canvas'); // Get your canvas element
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  worker.postMessage({
    type: 'image-processing',
    data: imageData
  }, [imageData.data.buffer]);
}

// Example function to trigger data analysis
function analyzeData() {
  const dataset = [1, 2, 3, 4, 5 /* ... your data ... */];
  
  worker.postMessage({
    type: 'data-analysis',
    data: dataset
  });
}

// Example function to trigger encryption
function encryptData() {
  const data = new Uint8Array([/* ... your data ... */]);
  
  worker.postMessage({
    type: 'encryption',
    data: data
  });
}