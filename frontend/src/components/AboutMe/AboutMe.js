import React from 'react';
import minicv from '../../assets/texts/minicv.json';
import aboutme from '../../assets/texts/aboutme.json';


export default function AboutMe() {
    return (
        <div className="flex">
            {/* About Me section */}
            <div className="flex-2/3 pr-24 max-w-4xl">
                <div className="articles">
                    {aboutme.articles.map((article, index) => (
                        <div key={index} className='mb-10'>
                            <p className='text-5xl'>{article}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mini CV section */}
            <div className="flex-1/3 text-xl max-w-xs">
                <h3 className="mb-4 primary-color">
                    education
                </h3>
                <div>
                    {minicv.experiences.map((experience, index) => (
                        <div key={index} className="">
                            <p>{experience.title}</p>
                            <span>{experience.year}</span>
                        </div>
                    ))}
                </div>
                <h3 className='mt-12 mb-4 primary-color'>
                    credits
                </h3>
                <div>
                    <p>Visual Inspiration - {minicv.credits.visualInspiration}</p>
                </div>
            </div>
        </div>
    );
}
