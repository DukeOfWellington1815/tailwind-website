import React, { useEffect, useState } from 'react';
import abstractsData from '../../assets/texts/abstracts.json';
import "./ProjectAbstract.css";
import logo from '../../assets/images/logo192.png';
import kanal from '../../assets/images/kanal-offen.svg';
import { getAllAbstracts } from '../../middleware/apiLogin';
import useSession from '../../middleware/session';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// Import other images as needed

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

  return (
    <div className="carousel-container">
      <Carousel showStatus={false} showThumbs={false}>
        {loading ? (
          <p>Loading abstracts...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          abstracts.map((abstract, index) => (
            <div key={index} className="carousel-item">
              <div className="bg-bright-color rounded-lg p-6 shadow-md">
                <div className="relative">
                  {abstract.image ? (
                    <img
                      src={abstract.image}
                      alt={abstract.title}
                      className="h-40 w-full object-contain rounded-md mb-4"
                    />
                  ) : (
                    <img
                      src={logo} // Replace with your desired placeholder image source
                      alt="Placeholder"
                      className="h-40 w-full object-contain rounded-md mb-4"
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
                <button className="mt-6 bg-dark-color p-4 text-white font-semibold rounded-md hover:bg-dark-color hover:text-bright-color transition duration-300 ease-in-out">
                  Details
                </button>
              </div>

            </div>
          ))
        )}
      </Carousel>
    </div>
  );
};

export default ProjectAbstract;
