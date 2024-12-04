import { useEffect } from 'react';
import { debounce } from 'lodash';

function ScrollComponent() {
  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollPosition = window.scrollY;
      console.log('Scroll position:', scrollPosition);
      
      // Example scroll handling logic
      if (scrollPosition > 100) {
        // Do something when scrolled past 100px
      }
    }, 150);

    window.addEventListener('scroll', handleScroll);
    return () => {
      handleScroll.cancel(); // Clean up debounce
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
} 