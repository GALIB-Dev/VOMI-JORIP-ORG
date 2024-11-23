import React from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorFallback({ error }) {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <pre>{error.message}</pre>
      <button onClick={() => navigate('/')}>Go Home</button>
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  );
}

export default ErrorFallback; 