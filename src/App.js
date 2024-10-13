import React from "react";
import './App.css';
import NavBar from './NavBar';
import Home from './Home';
import Footer from './Footer'; // Assuming you have a Footer component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar /> {/* Navbar is static across all routes */}

        <main className="content">
          <Routes>
            {/* Home component displayed at root */}
            <Route path="/" element={<Home />} />
            
            {/* You can add more routes for other pages later */}
            {/* Example: <Route path="/about" element={<About />} /> */}
          </Routes>
        </main>

        <Footer /> {/* Footer is static across all routes */}
      </div>
    </Router>
  );
}

export default App;
