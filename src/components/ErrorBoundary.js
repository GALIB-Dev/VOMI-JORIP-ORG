import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      errorMessage: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { 
      hasError: true, 
      errorMessage: error?.toString() || 'An error occurred'
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '20px',
          margin: '20px',
          backgroundColor: '#fff5f5',
          border: '1px solid #dc3545',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h2 style={{
            color: '#dc3545',
            marginBottom: '15px'
          }}>
            Something went wrong
          </h2>
          <p style={{
            color: '#666',
            marginBottom: '20px'
          }}>
            {this.state.errorMessage}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 