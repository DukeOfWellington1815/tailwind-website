import React, { useState, useEffect } from 'react';
import logo from '../assets/images/logo512.png';
import AareBern from '../components/AareBern/AareBern';
import Skills from '../components/Skills/Skills';
import AboutMe from '../components/AboutMe/AboutMe';
import ProjectAbstract from '../components/ProjectAbstract/ProjectAbstract';
import './home.css';

export default function HomePage() {
  const welcomeText = "I'm Lorenzo, a young ambitious IT student. Welcome to my website!";
  const [typedMessage, setTypedMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    if (currentIndex < welcomeText.length) {
      const timeout = setTimeout(() => {
        setTypedMessage(typedMessage + welcomeText[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 75); // typing speed
      return () => clearTimeout(timeout);
    } else {
      setShowArrow(true);
    }
  }, [currentIndex, typedMessage]);

  return (
    <div className='flex flex-col items-center overflow-hidden'>
      <div className='welcome-section text-4xl md:text-7xl font-bold mt-5 bright-color max-w-7xl'>
        {typedMessage}
        {showArrow && <div className={`bright-color text-4xl mt-10 md:mt-32 animate-bounce`}>&#8595;</div>}
      </div>

      <div className='my-5 bright-color'>
        <AboutMe />
      </div>

      <div className='flex justify-center w-screen h-screen'>
        <div className='flex items-center justify-center w-full h-full p-5'>
          <img src={logo} alt='logo' className='rounded-full max-w-full max-h-full' />
        </div>
      </div>

      <div className='my-5'>
        <ProjectAbstract />
      </div>

      <div className='my-5'>
        <Skills />
      </div>
    </div>
  );
}
