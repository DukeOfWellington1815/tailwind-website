import React, { useState } from 'react';
import './Footer.css';
import {
  AiFillGithub,
  AiFillLinkedin,
} from 'react-icons/ai';

export default function Footer() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <footer className="footer-container">
      <div className="footer-content ">
        <span>&copy; {new Date().getFullYear()} Lorenzo Flórez Fritschi</span>
        <div className="flex justify-center items-end left-0 right-0 space-x-4">
              <a href="https://github.com/DukeOfWellington1815" target="new" className="large-icon bright-color">
                <AiFillGithub />
              </a>
              <a href="https://in.com/in/lorenzo-florez-fritschi/" target="new" className="large-icon bright-color">
                <AiFillLinkedin />
              </a>
            </div>
        <div className="links">
          <button onClick={togglePopup} className="mr-4 hover:underline focus:outline-none">
            Imprint
          </button>
          <a href="mailto:lorenzo.florez.fritschi@protonmail.com" className="hover:underline focus:outline-none">
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
              <br />
              Email: <a href="mailto:lorenzo.florez.fritschi@protonmail.com" className="hover:underline focus:outline-none">lorenzo.florez.fritschi@protonmail.com</a>
              <br />
              Website: <a href="https://fatmonkee.com" className="hover:underline focus:outline-none">fatmonkee.com</a>
            </p>
            <button onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
    </footer>
  );
}
