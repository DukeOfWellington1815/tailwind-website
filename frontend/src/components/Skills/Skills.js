import React, { useState, useEffect } from 'react';
import './Skills.css';
import SkillText from '../../assets/texts/skills.json';

const skills = SkillText;

export default function SkillsPage() {
  const [visibleIndexes, setVisibleIndexes] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const skillsSection = document.getElementById('skills-section');
      if (skillsSection) {
        const skillsTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const currentIndex = Math.min(
          Math.floor((windowHeight * 0.75 - skillsTop) / 100), // Adjust 100 to a suitable value
          skills.length - 1
        );

        const newIndexes = Array.from({ length: currentIndex + 1 }, (_, index) => index);
        setVisibleIndexes(newIndexes);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div
        id="skills-section"
        className={`bg-white p-8 rounded shadow-md w-96`}
      >
        <h2 className="text-2xl font-bold mb-4">My Skills</h2>
        <div className="space-y-4">
          {skills.map((skillCategory, index) => (
            <div key={skillCategory.category}>
              <h3 className="text-lg font-semibold mb-2">{skillCategory.category}</h3>
              <ul className="space-y-2">
                {skillCategory.list.map((skill, skillIndex) => (
                  <li
                    key={skill.name}
                    className={`${
                      visibleIndexes.includes(skillIndex) ? 'fade-in' : 'hidden'
                    } transition-opacity duration-500 ease-in`}
                    style={{ animationDelay: `${skillIndex * 0.2}s` }} // Adjust the delay value as needed
                  >
                    <div className="flex items-center justify-between">
                      <span>{skill.name}</span>
                      <div className="flex items-center space-x-2">
                        <span>{skill.level}%</span>
                        <div className="h-2 w-32 bg-gray-300 rounded-full">
                          <div
                            className="h-2 bg-blue-500 rounded-full"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
