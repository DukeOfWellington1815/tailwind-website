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
        <span>&copy; {new Date().getFullYear()} Lorenzo Flórez Fritschi</span>
        <div className="links">
          <button onClick={togglePopup} className="mr-4 hover:underline focus:outline-none">
            Imprint
          </button>
          <a href="mailto:lorenzo.florezfritschi@protonmail.com" className="hover:underline focus:outline-none">
            lorenzo.florez.fritschi@protonmail.com
          </a>
        </div>
      </div>
      {isPopupOpen && (
        <div className="footer-popup">
          <div className="popup-content">
            <h2 className="text-xl font-semibold mb-4">Imprint</h2>
            <p>
              Contact me at:
              <br />
              Email: lorenzo.florez.fritschi@protonmail.com
              <br />
              Phone: +41 764411255
              <br />
              Website: fatmonkee.com
            </p>
            <button onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
    </footer>
  );
}
