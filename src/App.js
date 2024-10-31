import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; 
import NavBar from './NavBar.js';
import Home from './Home.js';
import Market from './market.js';
import PropertyForm from './PropertyForm.js';
import About from './About.js';
import Contact from './Contact.js';
import Footer from './Footer.js';
import Loading from './Loading.js';
import Office from './office.js';

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();  // this will work only inside Router

  // Show loading screen on route change
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 700); // Simulate loading time (1 second)

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div className="App">
      {loading && <Loading />} {/* Show loading screen when loading */}
      <NavBar /> {/* Navbar is static across all routes */}
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/office" element={<Office />} />
          <Route path="/PropertyForm" element={<PropertyForm />} /> {/* Corrected */}
        </Routes>
      </main>
      <Footer /> {/* Footer is static across all routes */}
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <Router> 
      <App />  {/* Wrap App component inside Router */}
    </Router>
  );
}
