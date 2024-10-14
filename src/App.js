import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar.js';
import Home from './Home.js';
import Services from './Services.js';
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
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} /> {/* Ensure this route is correct */}
          </Routes>
        </main>

        <Footer /> {/* Footer is static across all routes */}
      </div>
    </Router>
  );
}

export default App;
