import React, { useEffect } from 'react';

function LayoutComponent() {
  const updateElementHeights = () => {
    const elements = document.querySelectorAll('.target-elements');
    
    // Batch read
    const heights = Array.from(elements).map(el => el.offsetHeight);
    
    // Batch write
    elements.forEach((el, i) => {
      el.style.height = `${heights[i] + 10}px`;
    });
  };

  useEffect(() => {
    // Initial update
    updateElementHeights();

    // Add resize listener
    window.addEventListener('resize', updateElementHeights);

    // Cleanup
    return () => window.removeEventListener('resize', updateElementHeights);
  }, []);
} 