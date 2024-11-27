import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>কিছু একটা ভুল হয়েছে</h2>
          <button onClick={() => window.location.reload()}>
            পুনরায় লোড করুন
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 