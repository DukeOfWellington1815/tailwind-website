import React, { useState } from 'react';
import './Footer.css';

export default function Footer() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <footer className="footer-container">
      <div className="footer-content bg-dark-color">
        <span>&copy; {new Date().getFullYear()} Your Company</span>
        <div className="links">
          <button onClick={togglePopup} className="mr-4 hover:underline focus:outline-none">
            Impressum
          </button>
          <a href="mailto:lorenzo.florezfritschi@protonmail.com" className="hover:underline focus:outline-none">
            lorenzo.florezfritschi@protonmail.com
          </a>
        </div>
      </div>
      {isPopupOpen && (
        <div className="footer-popup">
          <div className="popup-content">
            <h2 className="text-xl font-semibold mb-4">Impressum</h2>
            <p>
              Contact me at:
              <br />
              Email: [Your Email Address]
              <br />
              Phone: [Your Phone Number]
              <br />
              Website: [Your Personal Website or Portfolio]
            </p>
            <button onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
    </footer>
  );
}
