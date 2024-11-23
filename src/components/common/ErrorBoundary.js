import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="error-container">
    <h2>কিছু সমস্যা হয়েছে!</h2>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>আবার চেষ্টা করুন</button>
  </div>
);

export const withErrorBoundary = (Component) => (props) => (
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onError={(error) => {
      toast.error('দুঃখিত! কিছু সমস্যা হয়েছে।');
      console.error('Error:', error);
    }}
    onReset={() => {
      // Reset the state here
      window.location.reload();
    }}
  >
    <Component {...props} />
  </ErrorBoundary>
); 
