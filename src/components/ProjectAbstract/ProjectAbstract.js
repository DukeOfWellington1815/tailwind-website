import React from 'react';
import abstractsData from '../../assets/texts/abstracts.json';
import "./ProjectAbstract.css";
import logo from '../../assets/images/logo192.png';
import kanal from '../../assets/images/kanal-offen.svg';
// Import other images as needed

const ProjectAbstract = () => {
  const abstracts = abstractsData.map((abstract, index) => {
    let image;
    switch (index) {
      case 0:
        image = logo;
        break;
      case 1:
        image = kanal;
        break;
      case 2:
        image = kanal;
        break;
      case 3:
        image = kanal;
        break;
      // Assign images to other articles as needed
      default:
        image = logo;
        break;
    }
    return { ...abstract, image };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {abstracts.map((abstract, index) => (
        <div key={index} className="bg-bright-color rounded-lg p-6 shadow-md">
          <div className="relative">
            {abstract.image && (
              <img
                src={abstract.image}
                alt={abstract.title}
                className="h-40 w-full object-cover rounded-md mb-4"
              />
            )}
            <div className="absolute inset-0 bg-dark-color bg-opacity-40 rounded-md transition-opacity opacity-0 hover:opacity-100">
              <div className="flex items-center justify-center h-full">
                <button className="text-bright-color font-semibold">View Details</button>
              </div>
            </div>
          </div>
          <h2 className="text-lg font-semibold mb-2 primary-color">{abstract.title}</h2>
          <p className="text-gray-700">{abstract.body}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectAbstract;
