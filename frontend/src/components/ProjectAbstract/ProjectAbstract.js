import React, { useEffect, useState } from 'react';
import abstractsData from '../../assets/texts/abstracts.json';
import "./ProjectAbstract.css";
import logo from '../../assets/images/logo192.png';
import placeholder from '../../assets/images/placeholder.png';
import kanal from '../../assets/images/kanal-offen.svg';
import { getAllAbstracts } from '../../middleware/apiLogin';
import useSession from '../../middleware/session';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProjectAbstract = () => {
  const [abstracts, setAbstracts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Projects';
  }, []);

  // Assuming you are using the useSession hook to get the token
  const { token } = useSession();

  useEffect(() => {
    const loadAbstracts = async () => {
      // Check if the token is available
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getAllAbstracts(token);
        setAbstracts(data); // Assuming the response is an array of abstracts
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch abstracts. Please try again later.");
        setLoading(false);
      }
    };
    loadAbstracts();
  }, [token]); // Execute the effect whenever the token changes

  const placeholderImages = [placeholder, logo, logo, placeholder, placeholder]; // Placeholder images

  const slickSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "20%", // Adjust the padding to your preference
    nextArrow: null,
    prevArrow: null
  };

  return (
    <div className="carousel-container">
      <h1 className="text-3xl font-semibold text-center mb-6 primary-color">Projects</h1>
      {loading ? (
        <p>Loading abstracts...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        abstracts.map((abstract, index) => (
          <div key={index} className="carousel-item">
            <Slider {...slickSettings}>
              {(abstract.images && abstract.images.length > 0
                ? abstract.images
                : placeholderImages
              ).map((image, imgIndex) => (
                <div
                  key={imgIndex}
                  className={`relative ${imgIndex === 2 ? 'center-image slick-current' : 'side-image'}`}
                >
                  <div className="image-container">
                    <img
                      src={image}
                      alt={abstract.title}
                      className="h-screen w-full object-cover rounded-md mb-4"
                    />
                  </div>
                  <div className="absolute inset-0 bg-dark-color bg-opacity-40 rounded-md transition-opacity opacity-0 hover:opacity-100">
                    <div className="flex items-center justify-center h-full">
                      <button className="text-bright-color font-semibold">View Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
            <h2 className="text-lg font-semibold mb-2 primary-color">{abstract.title}</h2>
            <p className="text-gray-700">{abstract.body}</p>
            <button className="m-6 bg-dark-color p-4 text-white font-semibold rounded-md hover:bg-dark-color hover:text-bright-color transition duration-300 ease-in-out">
              Details
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectAbstract;
