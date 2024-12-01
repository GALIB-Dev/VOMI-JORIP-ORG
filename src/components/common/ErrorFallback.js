import React from 'react';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div style={{
      padding: '2rem',
      margin: '2rem auto',
      maxWidth: '600px',
      backgroundColor: '#fff5f5',
      border: '1px solid #dc3545',
      borderRadius: '8px',
      textAlign: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ 
        color: '#dc3545', 
        marginBottom: '1rem',
        fontSize: '1.5rem',
        fontFamily: 'SolaimanLipi, Arial, sans-serif'
      }}>
        দুঃখিত! কিছু একটা সমস্যা হয়েছে
      </h2>
      <p style={{ 
        color: '#666', 
        marginBottom: '1.5rem',
        lineHeight: '1.5',
        fontFamily: 'SolaimanLipi, Arial, sans-serif'
      }}>
        {error?.toString() === '[object Object]' 
          ? 'সিস্টেমে একটি ত্রুটি ঘটেছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।'
          : error?.toString() || 'অপ্রত্যাশিত ত্রুটি ঘটেছে। পুনরায় চেষ্টা করুন।'}
      </p>
      {resetErrorBoundary && (
        <button
          onClick={resetErrorBoundary}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontFamily: 'SolaimanLipi, Arial, sans-serif',
            transition: 'background-color 0.3s ease',
            boxShadow: '0 2px 4px rgba(220,53,69,0.2)'
          }}
          onMouseOver={e => e.target.style.backgroundColor = '#c82333'}
          onMouseOut={e => e.target.style.backgroundColor = '#dc3545'}
        >
          আবার চেষ্টা করুন
        </button>
      )}
    </div>
  );
};

export default ErrorFallback;