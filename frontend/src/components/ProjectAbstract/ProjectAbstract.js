import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useSession from '../../middleware/session';
import { getAllAbstracts } from '../../middleware/apiLogin';
import placeholder from '../../assets/images/placeholder.png';
import logo1 from '../../assets/images/logo192.png';
import logo2 from '../../assets/images/logo512.png';
import "./ProjectAbstract.css";
import "../../assets/styles/corporateDesign.css";

import projectData from "../../assets/texts/projectData.json";

import imagebc1 from "../../assets/images/bc/image1.jpg";
import imagebc2 from "../../assets/images/bc/image2.jpg";
import imagebc3 from "../../assets/images/bc/image3.jpg";
import imagebc4 from "../../assets/images/bc/image4.png";

import imagebb1 from "../../assets/images/bb/image1.jpg";
import imagebb2 from "../../assets/images/bb/image2.jpg";
import imagebb3 from "../../assets/images/bb/image3.jpg";
import imagebb4 from "../../assets/images/bb/image4.jpg";
import imagebb5 from "../../assets/images/bb/image5.jpg";
import imagebb6 from "../../assets/images/bb/image6.jpg";

import imagepotw1 from "../../assets/images/potw/image1.png";
import imagepotw2 from "../../assets/images/potw/image2.png";
import imagepotw3 from "../../assets/images/potw/image3.png";
import imagepotw4 from "../../assets/images/potw/image4.png";
import imagepotw5 from "../../assets/images/potw/image5.png";
import imagepotw6 from "../../assets/images/potw/image6.png";

import imagesc1 from "../../assets/images/sc/image1.png";
import imagesc2 from "../../assets/images/sc/image2.png";
import imagesc3 from "../../assets/images/sc/image3.png";
import imagesc4 from "../../assets/images/sc/image4.png";
import imagesc5 from "../../assets/images/sc/image5.png";

export default function ProjectAbstract() {
  const [abstracts, setAbstracts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleIndexes, setVisibleIndexes] = useState([]);

  useEffect(() => {
    document.title = 'Projects';
  }, []);

  const { token } = useSession();

  useEffect(() => {
    document.title = 'Projects';

    if (token) {
      const loadAbstracts = async () => {
        try {
          const data = await getAllAbstracts(token);

          if (data.length === 0) {
            setAbstracts(projectData); // Use local data if API response is empty
          } else {
            const parsedData = data.map(item => ({
              ...item,
              imagepaths: JSON.parse(item.imagepaths),
              collaborators: JSON.parse(item.collaborators)
            }));

            setAbstracts(parsedData);
          }
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch abstracts. Please try again later.");
          setLoading(false);
        }
      };
      loadAbstracts();
    } else {
      setAbstracts(projectData); // Use local data if no token
      setLoading(false);
    }
  }, [token]);

  const placeholderImages = [placeholder, placeholder, placeholder, placeholder, placeholder];

  const slickSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "15%",
    nextArrow: null,
    prevArrow: null,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (currentSlide, nextSlide) => {
      const slider = document.querySelector(".slick-slider");
      slider.querySelectorAll(".slick-slide").forEach((slide, index) => {
        slide.classList.remove("center-image", "side-image");
        if (index === nextSlide) {
          slide.classList.add("center-image");
        } else {
          slide.classList.add("side-image");
        }
      });
    },
  };

  const handleScroll = () => {
    const abstractSections = document.querySelectorAll(".carousel-item");
    if (abstractSections) {
      abstractSections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        if (isVisible) {
          if (!visibleIndexes.includes(index)) {
            setVisibleIndexes(prevIndexes => [...prevIndexes, index]);
          }
        } else {
          setVisibleIndexes(prevIndexes => prevIndexes.filter(i => i !== index));
        }
      });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [abstracts]);

  const projectImages = {
    "BreadCrumb": [imagebc1, imagebc2, imagebc3, imagebc4],    
    "BadiBuddy": [imagebb1, imagebb2, imagebb3, imagebb4, imagebb5, imagebb6],
    "PRESIDENTS OF THE WORLD": [imagepotw1, imagepotw2, imagepotw3, imagepotw4, imagepotw5, imagepotw6],
    "Saab Classics": [imagesc1, imagesc2, imagesc3, imagesc4, imagesc5],
    "RPS (rock paper scissors)": [logo1, placeholder, placeholder, logo2, logo1, placeholder],

    // Add more project titles and their image arrays as needed
  };

  return (
    <div className="carousel-container">
      {loading ? (
        <p>Loading abstracts...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        abstracts.map((abstract, index) => {
          const isVisible = visibleIndexes.includes(index);
          const imagesForProject = projectImages[abstract.title] || placeholderImages;

          return (
            <div
              key={index}
              className={`carousel-item my-64 ${isVisible ? 'fade-in' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`text-7xl font-bold mt-16 mb-4 bright-color uppercase mx-32 content ${isVisible ? 'visible' : ''}`}>
                <h2>{abstract.title}– <br />{abstract.slogan}</h2>
                <hr />
              </div>

              <Slider {...slickSettings}>
                {imagesForProject.map((image, imgIndex) => (
                  <div key={imgIndex} className="relative image-container">
                    <img
                      src={image}
                      alt={abstract.title}
                      className={`h-screen w-full object-contain rounded-md mx-auto content ${isVisible ? ' visible' : ''}`}
                    />
                  </div>
                ))}
              </Slider>

              <div className={`flex flex-col items-center mx-64 mt-10 content ${isVisible ? 'visible' : ''}`}>
                <div className="flex flex-row">
                  <div className="flex-1/3 text-xl max-w-md">
                    <div className="flex flex-col">
                      <div className="w-full">
                        <table className="table bright-color text-2xl">
                          <tbody>
                            <tr className="flex">
                              <td className="pr-2">Year:</td>
                              <td className="tetriary-color">{abstract.year}</td>
                            </tr>
                            <tr className="flex">
                              <td className="pr-2">Type:</td>
                              <td className="primary-color">{abstract.type}</td>
                            </tr>
                            <tr className="flex">
                              <td className="pr-2">Role:</td>
                              <td className="secondary-color">{abstract.own_role}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="flex-2/3 max-w-4xl ml-60">
                    <p className={`bright-color text-4xl ${isVisible ? 'fade-in visible' : ''}`}>{abstract.body}</p>
                    <div className={`flex items-center justify-end mt-4 ${isVisible ? 'fade-in visible' : ''}`}>
                      <a href={`/abstract/${abstract.id}`} className={`dark-color bg-primary-color px-4 py-2 rounded-md hover:opacity-80 ${isVisible ? 'fade-in visible' : ''}`}>
                        Read More
                      </a>
                    </div>
                    <div className={`mt-10 ${isVisible ? 'fade-in visible' : ''}`}>
                      <p className={`bright-color text-md ${isVisible ? 'fade-in visible' : ''}`}>
                        {abstract.collaborators &&
                          abstract.collaborators.map((roleWithPeople, collaboratorIndex) => (
                            <span key={collaboratorIndex}>
                              <span className="text-gray-500 uppercase font-semibold">{roleWithPeople.role}:</span>{" "}
                              {roleWithPeople.people.map((collaborator, personIndex) => (
                                <React.Fragment key={personIndex}>
                                  <a
                                    href={collaborator.website_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="uppercase"
                                  >
                                    {collaborator.name}
                                  </a>
                                  {personIndex !== roleWithPeople.people.length - 1 && ", "}
                                </React.Fragment>
                              ))}
                              {collaboratorIndex !== abstract.collaborators.length - 1 && " "}
                            </span>
                          ))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );

}
