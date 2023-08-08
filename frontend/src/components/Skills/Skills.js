import React, { useState, useEffect } from 'react';
import './Skills.css'

const skills = [
  { category: 'Programming Languages', list: [
    { name: 'JavaScript', level: 90 },
    { name: 'Python', level: 80 },
    { name: 'Java', level: 70 },
    { name: 'C++', level: 60 }
  ]},
  { category: 'Web Development', list: [
    { name: 'HTML', level: 95 },
    { name: 'CSS', level: 85 },
    { name: 'React', level: 90 },
    { name: 'Node.js', level: 75 }
  ]},
  { category: 'Database', list: [
    { name: 'MySQL', level: 70 },
    { name: 'MongoDB', level: 65 }
  ]},
  { category: 'Version Control', list: [
    { name: 'Git', level: 85 },
    { name: 'GitHub', level: 80 }
  ]},
  { category: 'Other Skills', list: [
    { name: 'Problem Solving', level: 95 },
    { name: 'Data Structures', level: 90 },
    { name: 'Algorithms', level: 85 }
  ]}
];

export default function SkillsPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const skillsSection = document.getElementById('skills-section');
      if (skillsSection) {
        const skillsTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (skillsTop < windowHeight * 0.75) {
          setIsVisible(true);
        }
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
        className={`bg-white p-8 rounded shadow-md w-96 ${
          isVisible ? 'fade-in' : 'hidden'
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">My Skills</h2>
        <div className="space-y-4">
          {skills.map(skillCategory => (
            <div key={skillCategory.category}>
              <h3 className="text-lg font-semibold mb-2">{skillCategory.category}</h3>
              <ul className="space-y-2">
                {skillCategory.list.map(skill => (
                  <li key={skill.name}>
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