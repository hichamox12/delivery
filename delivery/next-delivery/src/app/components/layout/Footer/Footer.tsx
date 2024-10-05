import React from 'react';
import './Footer.css'; // Ensure this path is correct
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa'; // Import icons

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footerTop">
        <div className="footerLogo">
          <h2>Delivery Service</h2>
          <p>Accédez au centre d'aide</p>
        </div>
        <div className="footerSections">
          <div className="footerSection">
            <h4>Entreprise</h4>
            <ul>
              <li><a href="#">À propos</a></li>
              <li><a href="#">Nos services</a></li>
              <li><a href="#">Espace presse</a></li>
              <li><a href="#">Investisseurs</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Offres d'emploi</a></li>
            </ul>
          </div>
          <div className="footerSection">
            <h4>Produits</h4>
            <ul>
              <li><a href="#">Demander une livraison</a></li>
              <li><a href="#">Livrer</a></li>
              <li><a href="#">Commander un repas</a></li>
              <li><a href="#">Cartes-cadeaux</a></li>
            </ul>
          </div>
          <div className="footerSection">
            <h4>Citoyens du monde</h4>
            <ul>
              <li><a href="#">Sécurité</a></li>
              <li><a href="#">Diversité et inclusion</a></li>
              <li><a href="#">Développement durable</a></li>
            </ul>
          </div>
          <div className="footerSection">
            <h4>Déplacements</h4>
            <ul>
              <li><a href="#">Réservez</a></li>
              <li><a href="#">Aéroports</a></li>
              <li><a href="#">Villes</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footerBottom">
        <div className="socialMedia">
          <a href="#"><FaFacebook size={30} /></a>
          <a href="#"><FaTwitter size={30} /></a>
          <a href="#"><FaYoutube size={30} /></a>
        </div>
        <div className="storeButtons">
          {/* App Store icon */}
          <a href="#"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-qXxbrIgWgORGtONaNm-BpwDY6TtiZIR57w&s" alt="App Store" /></a>

          {/* Google Play icon (updated link) */}
          <a href="#"><img src="https://www.jcml-tx.org/ebook/get-it-on-google-play-badge.png/@@images/image.png" alt="Google Play" /></a>
        </div>
      </div>
      <div className="footerLanguageLocation">
        <span>Français (France)</span>
        <span>San Francisco Bay Area</span>
      </div>
    </footer>
  );
};

export default Footer;
