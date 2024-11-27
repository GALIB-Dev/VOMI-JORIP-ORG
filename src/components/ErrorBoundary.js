import React from 'react';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="error-container">
      <h2>কিছু একটা ভুল হয়েছে</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>আবার চেষ্টা করুন</button>
    </div>
  );
};

export default ErrorFallback; 