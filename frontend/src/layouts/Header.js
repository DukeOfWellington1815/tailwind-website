import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AiFillHome,
  AiFillFolderOpen,
  AiFillMail,
  AiFillCode,
  AiFillGithub,
  AiFillLinkedin,
  AiFillLock,
  AiFillUnlock,
} from 'react-icons/ai';
import logo from '../assets/images/logo512.png';
import './Header.css';
import '../assets/styles/corporateDesign.css';
import useSession from '../middleware/session';
import Cookies from 'js-cookie';

export default function Header() {
  const navigate = useNavigate();
  const sessionCookie = Cookies.get('session');
  const [isOpen, setIsOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // Step 1: State variable for logout popup
  const buttonRef = useRef();
  const menuRef = useRef();
  const logoRef = useRef();

  const { logout, user } = useSession();

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

  const handleLogout = () => {
    // Step 2: Show the logout confirmation popup
    setShowLogoutPopup(true);
  };

  const confirmLogout = () => {
    // Perform logout actions here, and close the logout confirmation popup
    logout();
    setShowLogoutPopup(false);
  };

  return (
    <nav className="bg-black shadow border-0 p-4 flex sm:justify-center h-16 min-h-full" style={{ boxShadow: '-20px 0px 15px -3px rgba(0,0,0,0.1)' }}>
      <div className="w-full h-full flex justify-center items-center relative">

        <Link to="/">
          <img
            src={logo}
            ref={logoRef}
            className="App-logo monkeylogo absolute left-0 top-0"
            alt="logo"
            onClick={() => window.scrollTo(0, 0)} // Scroll to top when clicked
          />
        </Link>

        <button ref={buttonRef} onClick={() => setIsOpen(!isOpen)} className="bright-color absolute right-0 top-1/2 -translate-y-1/2 md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>

        {screenWidth >= 768 && (
          <div className="desktop-logout absolute top-1/2 right-4 transform -translate-y-1/2 font-display max-w-sm text-2xl font-bold leading-tight link link-underline link-underline-black">
            {sessionCookie && user ? (
              <button className="bright-color" onClick={handleLogout}>
                <div className="flex items-center">
                  <AiFillUnlock />
                  <span className="ml-2">Logout</span>
                </div>
              </button>
            ) : (
              <Link to="/login" className="bright-color">
                <div className="flex items-center">
                  <AiFillLock />
                  <span className="ml-2">Login</span>
                </div>
              </Link>
            )}
          </div>
        )}

        {screenWidth < 768 && (
          <div className="flex items-center space-x-4">
            {sessionCookie && user ? (
              <button
                className="link link-underline link-underline-black bright-color font-display max-w-sm text-xl font-bold leading-tight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bright-color focus:ring-white"
                onClick={handleLogout}
              >
                <div className="flex items-center">
                  <AiFillUnlock />
                  <span className="ml-2">
                    Logout
                  </span>
                </div>
              </button>
            ) : (
              <Link to="/login" className="link link-underline link-underline-black bright-color font-display max-w-sm text-xl font-bold leading-tight">
                <div className="flex items-center">
                  <AiFillLock />
                  <span className="ml-2">
                    Login
                  </span>
                </div>
              </Link>
            )}
          </div>
        )}

        {screenWidth < 768 && (
          <div ref={menuRef} className={`fixed mt-16 top-0 bottom-0 right-0 w-screen bg-black shadow-md p-4 space-y-4 transition-all duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
            <Link
              to="/"
              className="font-display max-w-sm text-xl font-bold bright-color leading-tight block text-center"
              onClick={() => { setIsOpen(false); window.scrollTo(0, 0) } }
            >
              <div className="flex items-center">
                <AiFillHome />
                <span className="ml-4 bright-color text-4xl link link-underline link-underline-black">
                  Home
                </span>
              </div>
            </Link>
            {[
              ['Dossier', '/dossier', <AiFillFolderOpen />],
              ['Contact', '/contact', <AiFillMail />],
            ].map(([title, url, icon], index) => (
              <Link
                key={index}
                to={url}
                className="font-display max-w-sm text-xl font-bold bright-color leading-tight block text-center"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  {icon}
                  <span className="ml-4 bright-color text-4xl link link-underline link-underline-black">
                    {title}
                  </span>
                </div>
              </Link>
            ))}

            <div className="flex justify-center items-end fixed bottom-10 left-0 right-0 space-x-4">
              <a href="https://github.com/DukeOfWellington1815" target="_blank" rel="noopener noreferrer" className="large-icon bright-color">
                <AiFillGithub />
              </a>
              <a href="https://www.linkedin.com/in/lorenzo-florez-fritschi/" target="_blank" rel="noopener noreferrer" className="large-icon bright-color">
                <AiFillLinkedin />
              </a>
            </div>
          </div>
        )}


        <div className="hidden md:flex space-x-16">
          {[
            ['Dossier', '/dossier'],
            ['Contact', '/contact'],
          ].map(([title, url], index) => (
            <Link key={index} to={url} className="font-display max-w-sm text-2xl font-bold leading-tight">
              <span className="link link-underline link-underline-black bright-color">
                {title}
              </span>
            </Link>
          ))}
        </div>

        {/* Step 3: Render the logout confirmation popup */}
        {showLogoutPopup && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-opacity-80 bg-black flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow">
              <p className="text-xl font-semibold">Are you sure you want to logout?</p>
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 mr-2 bg-gray-200 rounded"
                  onClick={() => setShowLogoutPopup(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={confirmLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </nav>
  );
}
