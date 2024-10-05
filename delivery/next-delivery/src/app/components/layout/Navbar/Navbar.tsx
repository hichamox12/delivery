"use client";  // Add this line at the top

import React, { useState } from 'react';
import './Navbar.css';  // Import your custom CSS file
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing hamburger and close icons from react-icons

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left: Logo */}
        <div className="navbar-logo">Delivery service</div>

        {/* Center: Links */}
        <ul className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <li>Demander une livraison</li>
          <li>liverer</li>
          <li>À propos</li>
        </ul>

        {/* Right: Language, Help, Sign In, and Sign Up */}
        <div className="navbar-right">
          <span className="navbar-item">FR-FR</span>
          <span className="navbar-item">Aide</span>
          <span className="navbar-item">Connexion</span>
          <button className="signup-button">S'inscrire</button>
        </div>

        {/* Hamburger Icon */}
        <div className="hamburger-icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
