/* eslint-disable no-restricted-globals */

self.onmessage = (event) => {
  const { type, data } = event.data;  // Get operation type and input data
  
  let result;
  switch (type) {
    case 'image-processing':
      result = processImage(data);
      break;
    case 'data-analysis':
      result = analyzeDataSet(data);
      break;
    case 'encryption':
      result = encryptLargeData(data);
      break;
    default:
      result = { error: 'Unknown operation type' };
  }
  
  self.postMessage(result);
};

function processImage(imageData) {
  // Example: Apply image filters or transformations
  const pixels = imageData.data;
  for (let i = 0; i < pixels.length; i += 4) {
    // Apply grayscale filter
    const avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
    pixels[i] = avg;     // Red
    pixels[i + 1] = avg; // Green
    pixels[i + 2] = avg; // Blue
    // pixels[i + 3] is Alpha
  }
  return imageData;
}

function analyzeDataSet(data) {
  // Example: Complex statistical calculations
  const results = {
    mean: 0,
    standardDeviation: 0,
    correlations: []
  };
  
  // Calculate mean
  results.mean = data.reduce((sum, val) => sum + val, 0) / data.length;
  
  // Calculate standard deviation
  const squareDiffs = data.map(value => {
    const diff = value - results.mean;
    return diff * diff;
  });
  results.standardDeviation = Math.sqrt(
    squareDiffs.reduce((sum, val) => sum + val, 0) / data.length
  );
  
  return results;
}

function encryptLargeData(data) {
  // Example: Implement encryption algorithms
  const encrypted = [];
  const key = 123; // Use proper encryption key in real applications
  
  for (let i = 0; i < data.length; i++) {
    // Simple XOR encryption (use proper encryption in production!)
    encrypted.push(data[i] ^ key);
  }
  
  return encrypted;
} 