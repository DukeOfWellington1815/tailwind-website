import React, { useState, useEffect } from 'react';
import minicv from '../../assets/texts/minicv.json';
import aboutme from '../../assets/texts/aboutme.json';
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
    <div className="flex">
      {/* About Me section */}
      <div
        id="about-me-section"
        className="flex-2/3 pr-24 max-w-4xl"
      >
        <div className="articles">
          {aboutme.articles.map((article, index) => (
            <div
              key={index}
              className={`mb-10 ${
                visibleIndexes.includes(index) ? 'fade-in' : ''
              } transition-opacity duration-500 ease-in`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <p className={`text-5xl ${visibleIndexes.includes(index) ? 'visible' : ''}`}>{article}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mini CV section */}
      <div className="flex-1/3 text-xl max-w-xs">
        <h3 className="mb-4 primary-color">education</h3>
        <div>
          {minicv.education.map((experience, index) => (
            <div
              key={index}
              className={`${
                visibleIndexes.includes(index) ? 'fade-in' : ''
              } transition-opacity duration-500 ease-in`}
              style={{ animationDelay: `${(index + aboutme.articles.length) * 0.2}s` }}
            >
              <p className={`${visibleIndexes.includes(index) ? 'visible' : ''}`}>{experience.title}</p>
              <span className={`${visibleIndexes.includes(index) ? 'visible' : ''}`}>{experience.year}</span>
            </div>
          ))}
        </div>
        <h3 className='mt-32 mb-4 primary-color'>
          volounteer work
        </h3>
        <div>
          {minicv.vwork.map((experience, index) => (
            <div
              key={index}
              className={`${
                visibleIndexes.includes(index) ? 'fade-in' : ''
              } transition-opacity duration-500 ease-in`}
              style={{ animationDelay: `${(index + aboutme.articles.length + minicv.education.length) * 0.2}s` }}
            >
              <p className={`${visibleIndexes.includes(index) ? 'visible' : ''}`}>{experience.title}</p>
              <span className={`${visibleIndexes.includes(index) ? 'visible' : ''}`}>{experience.year}</span>
            </div>
          ))}
        </div>
        <h3 className='mt-32 mb-4 primary-color'>
          credits
        </h3>
        <div className={`${
          visibleIndexes.includes(0) ? 'fade-in' : ''
        } transition-opacity duration-500 ease-in ${visibleIndexes.includes(0) ? 'visible' : ''}`}>
          <p>Visual Inspiration - {minicv.credits.visualInspiration}</p>
        </div>
      </div>
    </div>
  );
}
