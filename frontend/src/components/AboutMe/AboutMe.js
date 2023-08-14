import React, { useState, useEffect } from 'react';
import minicv from '../../assets/texts/minicv.json';
import aboutme from '../../assets/texts/aboutme.json';
import logo from '../../assets/images/logo512.png';
import './AboutMe.css';

export default function AboutMe() {
  const [visibleIndexes, setVisibleIndexes] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const aboutMeSection = document.getElementById('about-me-section');
      if (aboutMeSection) {
        const aboutMeTop = aboutMeSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const currentIndex = Math.min(
          Math.floor((windowHeight * 0.75 - aboutMeTop) / 100), // Adjust 100 to a suitable value
          aboutme.articles.length - 1
        );

        const newIndexes = Array.from({ length: currentIndex + 1 }, (_, index) => index);
        setVisibleIndexes(newIndexes);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check visibility on initial load

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="mx-4 flex flex-col md:flex-row">
      {/* About Me section */}
      <div
        id="about-me-section"
        className="md:w-2/3 pr-4 md:pr-24 max-w-4xl"
      >
        <div className="articles">
          {aboutme.articles.map((article, index) => (
            <div
              key={index}
              className={`mb-4 md:mb-10 ${visibleIndexes.includes(index) ? 'fade-in' : ''
                } transition-opacity duration-500 ease-in`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <p className={`text-xl md:text-5xl ${visibleIndexes.includes(index) ? 'visible' : ''}`}>{article}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mini CV section */}
      <div className="w-full md:w-1/3 text-base md:text-xl max-w-md md:max-w-xs mt-4 md:mt-0">
        <h3 className="mb-2 md:mb-4 primary-color">education</h3>
        <div>
          {minicv.education.map((experience, index) => (
            <div
              key={index}
              className={`${visibleIndexes.includes(index) ? 'fade-in' : ''
                } transition-opacity duration-500 ease-in uppercase`}
              style={{ animationDelay: `${(index + aboutme.articles.length) * 0.2}s` }}
            >
              <p className={`mt-4 ${visibleIndexes.includes(index) ? 'visible' : ''}`}>{experience.title}</p>
              <span className={`${visibleIndexes.includes(index) ? 'visible' : ''}`}>{experience.year}</span>
            </div>
          ))}
        </div>
        <h3 className='mt-4 md:mt-32 mb-2 md:mb-4 primary-color'>
          volunteer work
        </h3>
        <div>
          {minicv.vwork.map((experience, index) => (
            <div
              key={index}
              className={`${visibleIndexes.includes(index) ? 'fade-in' : ''
                } transition-opacity duration-500 ease-in`}
              style={{ animationDelay: `${(index + aboutme.articles.length + minicv.education.length) * 0.2}s` }}
            >
              <p className={`${visibleIndexes.includes(index) ? 'visible' : ''}`}>{experience.title}</p>
              <span className={`${visibleIndexes.includes(index) ? 'visible' : ''}`}>{experience.year}</span>
            </div>
          ))}
        </div>
        <h3 className='mt-4 md:mt-32 mb-2 md:mb-4 primary-color'>
          credits
        </h3>
        <div className={`${visibleIndexes.includes(0) ? 'fade-in' : ''
          } transition-opacity duration-500 ease-in ${visibleIndexes.includes(0) ? 'visible' : ''}`}>
          <p>visual inspiration - <a href={minicv.credits.url} target='_blank' rel='noopener noreferrer'>{minicv.credits.visualInspiration}</a></p>
          <div className='mt-24 flex justify-center lg:justify-start'>
            <img src={logo} alt='logo' className='rounded-full max-w-[75%]' />
          </div>
        </div>
      </div>
    </div>
  );

}
