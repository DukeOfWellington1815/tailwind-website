import React, { useState, useEffect } from 'react';
import './Skills.css';
import SkillText from '../../assets/texts/skills.json';
import GradesText from '../../assets/texts/grades.json';

const skills = SkillText;
const grades = GradesText;

export default function SkillsPage() {
  const [visibleSkillIndexes, setVisibleSkillIndexes] = useState([]);
  const [visibleGradeIndexes, setVisibleGradeIndexes] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate visible skill indexes based on scroll position
      const skillsSection = document.getElementById('skills-section');
      if (skillsSection) {
        const skillsTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const currentIndex = Math.min(
          Math.floor((windowHeight * 0.75 - skillsTop) / 100),
          skills.length - 1
        );

        const newIndexes = Array.from({ length: currentIndex + 1 }, (_, index) => index);
        setVisibleSkillIndexes(newIndexes);
      }

      // Calculate visible grade indexes based on scroll position
      const gradesSection = document.getElementById('grades-section');
      if (gradesSection) {
        const gradesTop = gradesSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const currentIndex = Math.min(
          Math.floor((windowHeight * 0.75 - gradesTop) / 100),
          grades.category["Core Area"].length - 1
        );

        const newIndexes = Array.from({ length: currentIndex + 1 }, (_, index) => index);
        setVisibleGradeIndexes(newIndexes);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const gradeToProgressBarWidth = (grade) => {
    const gradeWidths = {
      1: '16.66%',
      2: '33.33%',
      3: '50%',
      4: '66.66%',
      5: '83.33%',
      6: '100%',
    };

    const lowerGrade = Math.floor(grade);
    const upperGrade = Math.ceil(grade);
    const lowerWidth = parseFloat(gradeWidths[lowerGrade]) || 0;
    const upperWidth = parseFloat(gradeWidths[upperGrade]) || 100;

    const fraction = grade % 1;
    const width = lowerWidth + fraction * (upperWidth - lowerWidth);

    return `${width}%`;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="md:text-5xl text-xl font-bold bright-color mb-4 uppercase">Academic Progress and Proficiency</h2>
      <div className="flex items-center justify-center">

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-64">
          <div id='skills-section' className="bright-color p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold text-blue-500 mb-4">Skills</h2>
            <div className="space-y-8">
              {skills.map((skillCategory, index) => (
                <div key={skillCategory.category}>
                  <h3 className="text-lg font-semibold mb-2 uppercase">{skillCategory.category}</h3>
                  <ul className="space-y-2">
                    {skillCategory.list.map((skill, skillIndex) => (
                      <li
                        key={skill.name}
                        className={`${visibleSkillIndexes.includes(skillIndex) ? 'fade-in' : 'hidden'
                          } transition-opacity duration-500 ease-in`}
                        style={{ animationDelay: `${skillIndex * 0.2}s` }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{skill.name}</span>
                          <div className="flex items-center space-x-2">
                            <div className="h-2 w-32 bg-gray-800 rounded-full">
                              <div
                                className="h-2 bg-blue-500   rounded-full"
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
          {/* Grades Section */}
          <div id='grades-section' className="bright-color p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4 fade-in-color">Grades</h2>
            <ul className="space-y-8">
              {Object.keys(grades.category).map((categoryKey) => (
                <div key={categoryKey} className='space-y-2'>
                  <h3 className="text-lg font-semibold mb-2 uppercase">{categoryKey}</h3>
                  {/* Check if the value is an array before mapping */}
                  {Array.isArray(grades.category[categoryKey]) ? (
                    grades.category[categoryKey].map((grade, gradeIndex) => (
                      <li
                        key={gradeIndex}
                        className={`${visibleGradeIndexes.includes(gradeIndex) ? 'fade-in' : 'hidden'
                          } transition-opacity duration-500 ease-in`}
                        style={{ animationDelay: `${gradeIndex * 0.2}s` }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{grade.subject}</span>
                          <div className="flex items-center space-x-2">
                            <span>{grade.grade}</span>
                            <div className="h-2 w-32 bg-gray-800 rounded-full">
                              <div
                                className="h-2 progress-filling rounded-full"
                                style={{ width: gradeToProgressBarWidth(grade.grade) }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    // Handle cases where the value is not an array (e.g., Average)
                    <li>
                      <div className="flex items-center justify-between">
                        <span>{categoryKey}</span>
                        <div className="flex items-center space-x-2">
                          <span>{grades.category[categoryKey].grade}</span>
                          <div className="h-2 w-32 bg-gray-800 rounded-full">
                            <div
                              className="h-2 progress-filling rounded-full"
                              style={{ width: gradeToProgressBarWidth(grades.category[categoryKey].grade) }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )}
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
