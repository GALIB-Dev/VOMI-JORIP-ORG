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