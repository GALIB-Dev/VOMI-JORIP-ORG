import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar.js';
import Home from './Home.js';
import Market from './market.js';
import PropertyForm from './PropertyForm.js';
import About from './About.js';
import Contact from './Contact.js';
import Footer from './Footer.js';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar /> {/* Navbar is static across all routes */}

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/market" element={<Market />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/PropertyForm" element={<PropertyForm />} /> {/* Changed from component to element */}
          </Routes>
        </main>

        <Footer /> {/* Footer is static across all routes */}
      </div>
    </Router>
  );
}

export default App;
