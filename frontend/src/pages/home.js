import React, { useState, useEffect } from 'react';
import logo from '../assets/images/logo512.png';
import AareBern from '../components/AareBern/AareBern';
import Skills from '../components/Skills/Skills';
import AboutMe from '../components/AboutMe/AboutMe';
import ProjectAbstract from '../components/ProjectAbstract/ProjectAbstract';
import './home.css';

export default function HomePage() {
  const welcomeText = "I am Lorenzo, a young ambitious IT student. Welcome to my website!";
  const [typedMessage, setTypedMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    document.title = 'FatMonkee - Lorenzo';
  }, []);


  useEffect(() => {
    if (currentIndex < welcomeText.length) {
      const timeout = setTimeout(() => {
        setTypedMessage(typedMessage + welcomeText[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 60); // typing speed
      return () => clearTimeout(timeout);
    } else {
      setShowArrow(true);
    }
  }, [currentIndex, typedMessage]);

  return (
    <div className='flex flex-col items-center overflow-hidden'>
      <div className='welcome-section text-4xl md:text-7xl font-bold mt-5 bright-color max-w-7xl'>
        {typedMessage}
        {showArrow && (
          <a href="#about-me-section" className={`bright-color text-6xl mt-10 md:mt-32 animate-bounce`}>&#8595;</a>
        )}
      </div>

      <div id="about-me-section" className='pt-16 bright-color'>
        <AboutMe />
      </div>

      <div id="project-abstracts-section" className='pt-16'>
        <ProjectAbstract />
      </div>

      <div id="skills-section" className='pt-16'>
        <Skills />
      </div>
    </div>
  );
}
