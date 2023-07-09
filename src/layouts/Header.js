import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/images/logo512.png';
import './Header.css';
import '../assets/styles/corporateDesign.css';
import { Link } from 'react-router-dom';
import {
  AiFillHome,
  AiFillFolderOpen,
  AiFillMail,
  AiFillCode,
  AiFillGithub,
  AiFillLinkedin,
  AiFillLock,
} from 'react-icons/ai';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const buttonRef = useRef();
  const menuRef = useRef();
  const logoRef = useRef();

  useEffect(() => {
    if (!logoRef.current) return;
    logoRef.current.addEventListener('mouseover', () => {
      logoRef.current.classList.remove('monkeylogo--spin');
      void logoRef.current.offsetWidth;
      logoRef.current.classList.add('monkeylogo--spin');
    });
  }, []);

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

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isOpen]);

  return (
    <nav className="bg-bright-color shadow border-0 p-4 flex sm:justify-center h-16 min-h-full" style={{ boxShadow: '-20px 0px 15px -3px rgba(0,0,0,0.1)' }}>
      <div className="w-full h-full flex justify-center items-center relative">

        <Link to="/">
          <img src={logo} ref={logoRef} className="App-logo monkeylogo absolute left-0 top-0" alt="logo" />
        </Link>

        <button ref={buttonRef} onClick={() => setIsOpen(!isOpen)} className="absolute right-0 top-1/2 -translate-y-1/2 md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>

        {screenWidth >= 768 && ( // Render login button for screen width 768px and above
          <Link to="/login" className="absolute top-1/2 right-4 transform -translate-y-1/2 font-display max-w-sm text-2xl font-bold leading-tight">
            <span className="link link-underline link-underline-black text-black">Login</span>
          </Link>
        )}

        {screenWidth < 768 && ( // Render side navigation for screen width below 768px
          <div ref={menuRef} className={`fixed mt-16 top-0 bottom-0 right-0 w-screen bg-bright-color shadow-md p-4 space-y-4 transition-all duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
            {[
              ['Home', '/', <AiFillHome />],
              ['Dossier', '/dossier', <AiFillFolderOpen />],
              ['Projects', '/projects', <AiFillCode />],
              ['Contact', '/contact', <AiFillMail />],
              ['Login', '/login', <AiFillLock />],
            ].map(([title, url, icon], index) => (
              <Link key={index} to={url} className="font-display max-w-sm text-xl font-bold dark-color leading-tight block text-center" onClick={() => setIsOpen(false)}>
                <div className="flex items-center">
                  {icon}
                  <span className="ml-4 text-dark text-4xl link link-underline link-underline-black">
                    {title}
                  </span>
                </div>
              </Link>
            ))}
            <div className="flex justify-center items-end fixed bottom-0 left-0 right-0 mb-2 space-x-4">
              <a href="https://youtube.com" target="new" className="large-icon dark-color">
                <AiFillGithub />
              </a>
              <a href="https://youtube.com" target="new" className="large-icon dark-color">
                <AiFillLinkedin />
              </a>
            </div>
          </div>
        )}

        <div className="hidden md:flex space-x-16">
          {[
            ['Home', '/'],
            ['Dossier', '/dossier'],
            ['Projects', '/projects'],
            ['Contact', '/contact'],
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
