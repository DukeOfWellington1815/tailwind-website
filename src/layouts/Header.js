import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/images/logo512.png';
import './Header.css';
import "../assets/styles/corporateDesign.css";
import { Link } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef();
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <nav className="bg-bright-color shadow border-0 p-4 flex sm:justify-center h-16 min-h-full">
      <div className="w-full h-full flex justify-center items-center relative">
        <img src={logo} className="App-logo monkeylogo absolute left-0 top-1/2 -translate-y-1/2" alt="logo" />
        <button ref={buttonRef} onClick={() => setIsOpen(!isOpen)} className="absolute right-0 top-1/2 -translate-y-1/2 md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
        <div ref={menuRef} className={`fixed top-0 bottom-0 right-0 w-64 bg-secondary-color shadow-md rounded-md p-4 space-y-4 transition-all duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
          {[
            ["Home", "/dashboard"],
            ["Dossier", "/dossier"],
            ["Projects", "/projects"],
            ["Contact", "/contact"],
          ].map(([title, url], index) => (
            <Link key={index} to={url} className="font-display max-w-sm text-xl font-bold leading-tight block text-center">
              <span className="text-dark">
                {title}
              </span>
            </Link>
          ))}
        </div>
        <div className="hidden md:flex space-x-16">
          {[
            ["Home", "/dashboard"],
            ["Dossier", "/dossier"],
            ["Projects", "/projects"],
            ["Contact", "/contact"],
          ].map(([title, url], index) => (
            <Link key={index} to={url} className="font-display max-w-sm text-2xl font-bold leading-tight">
              <span className="link link-underline link-underline-black text-black">
                {title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
