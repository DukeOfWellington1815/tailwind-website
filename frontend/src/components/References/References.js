import React from 'react';
import ReferenceText from '../../assets/texts/references.json';

const References = () => {
  const references = ReferenceText.references;

  return (
    <div className="py-8 flex flex-col items-center">
      <h2 className="text-4xl bright-color font-semibold mb-4">References</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {references.map((reference, index) => (
          <div key={index} className=" p-4 rounded ">
            <h3 className="text-lg primary-color font-medium mb-2">{reference.name}</h3>
            {reference.title && <p className="bright-color mb-1">{reference.title}</p>}
            {reference.institution && <p className="bright-color mb-1">{reference.institution}</p>}
            {reference.company && <p className="bright-color mb-1">{reference.company}</p>}
            {reference.email && <p className="text-blue-500 mb-1"><a href={`mailto:${reference.email}`}>{reference.email}</a></p>}
            {reference.phone && (
              <p className="bright-color mb-1">
                <a href={`tel:${reference.phone.replace(/\D/g, '')}`}>{reference.phone}</a>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default References;
