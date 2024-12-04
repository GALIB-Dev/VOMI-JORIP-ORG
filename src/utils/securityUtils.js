export const encryptSensitiveData = (data) => {
  const worker = new Worker(new URL('../workers/heavy-computation.worker.js', import.meta.url));
  
  return new Promise((resolve, reject) => {
    worker.onmessage = (event) => {
      worker.terminate();
      resolve(event.data);
    };

    worker.onerror = reject;

    worker.postMessage({
      type: 'encryption',
      data: new Uint8Array(data)
    });
  });
};

// Function to count and sum all four-letter words in a given text
export function sumFourLetterWords(text) {
    const words = text.split(/\s+/); // Split text into words
    let sum = 0;

    words.forEach(word => {
        if (word.length === 4) {
            sum += 1; // Increment sum for each four-letter word
        }
    });

    return sum; // Return the total count of four-letter words
}