import React, { useState } from 'react';
import './Footer.css';

export default function Footer() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <footer className="bg-dark-color text-white p-4 bottom-0 left-0 w-full">
      <div className="flex justify-between items-center">
        <div>
          <span>&copy; {new Date().getFullYear()} Your Company</span>
        </div>
        <div>
          <button
            onClick={togglePopup}
            className="mr-4 hover:underline focus:outline-none"
          >
            Impressum
          </button>
          <a
            href="mailto:lorenzo.florezfritschi@protonmail.com"
            className="hover:underline focus:outline-none"
          >
            lorenzo.florezfritschi@protonmail.com
          </a>
        </div>
      </div>
      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-opacity-80 bg-black flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow">
            <h2 className="text-black text-xl font-semibold mb-4">Impressum</h2>
            <p className="text-black">
              Contact me at:
              <br />
              Email: [Your Email Address]
              <br />
              Phone: [Your Phone Number]
              <br />
              Website: [Your Personal Website or Portfolio]
            </p>
            <button
              onClick={togglePopup}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
