import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useSession from '../../middleware/session';
import { getAllAbstracts } from '../../middleware/apiLogin';
import placeholder from '../../assets/images/placeholder.png';
import imagePlaceholder from '../../assets/images/placeholder.png';
import "./ProjectAbstract.css"; // If needed
import "../../assets/styles/corporateDesign.css"; // Make sure to adjust the path if needed

const ProjectAbstract = () => {
  const [abstracts, setAbstracts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Projects';
  }, []);

  const { token } = useSession();

  useEffect(() => {
    const loadAbstracts = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getAllAbstracts(token);

        // Parse the imagepaths and collaborators JSON strings into arrays
        const parsedData = data.map(item => ({
          ...item,
          imagepaths: JSON.parse(item.imagepaths),
          collaborators: JSON.parse(item.collaborators)
        }));

        setAbstracts(parsedData);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch abstracts. Please try again later.");
        setLoading(false);
      }
    };
    loadAbstracts();
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
      // Use Slick's setActiveSlide method to apply appropriate classes
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

  return (
    <div className="carousel-container">
      {loading ? (
        <p>Loading abstracts...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        abstracts.map((abstract, index) => (
          <div key={index} className="carousel-item my-64">
            <div className='text-7xl font-bold mt-16 mb-4 bright-color uppercase mx-32'>
              <h2>{abstract.title}– <br />{abstract.slogan}</h2>
              <hr></hr>
            </div>

            <Slider {...slickSettings}>
              {abstract.imagepaths && abstract.imagepaths.length > 0 ? (
                abstract.imagepaths.map((image, imgIndex) => (
                  <div key={imgIndex} className="relative image-container">
                    <img
                      src={image}
                      alt={abstract.title}
                      className="h-screen w-full object-cover rounded-md mx-auto"
                    />
                  </div>
                ))
              ) : (
                placeholderImages.map((image, imgIndex) => (
                  <div key={imgIndex} className="relative image-container">
                    <img
                      src={image}
                      alt="Placeholder"
                      className="h-screen w-full object-cover rounded-md mx-auto"
                    />
                  </div>
                ))
              )}
            </Slider>

            <div className="flex flex-col items-center mt-10">
              <div className="flex flex-row">
                <div className="flex-1/3 text-xl max-w-md pr-24">
                  <div className="flex flex-col">
                    <div className="w-full">
                      <table className="table bright-color text-2xl">
                        <tbody>
                          <tr>
                            <td className="pr-2">Year:</td>
                            <td className="tetriary-color">{abstract.year}</td>
                          </tr>
                          <tr>
                            <td className="pr-2">Type:</td>
                            <td className="primary-color">{abstract.type}</td>
                          </tr>
                          <tr>
                            <td className="pr-2">Role:</td>
                            <td className="secondary-color">{abstract.own_role}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="flex-2/3 max-w-2xl ml-60">
                  <p className="bright-color text-4xl">{abstract.body}</p>
                  <div className="flex items-center justify-end mt-4">
                    <a href={`/abstract/${abstract.id}`} className="dark-color bg-primary-color px-4 py-2 rounded-md hover:opacity-80">
                      Read More
                    </a>
                  </div>
                  <div className="mt-10">
                    <p className="bright-color text-md">
                      {abstract.collaborators &&
                        abstract.collaborators.map((collaborator, collaboratorIndex) => (
                          <span key={collaboratorIndex}>
                            <span className="text-gray-500 uppercase">{collaborator.role}</span>{" "}
                            <a
                              href={collaborator.website_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="uppercase"
                            >
                              {collaborator.name}
                            </a>
                            {collaboratorIndex !== abstract.collaborators.length - 1 && ", "}
                          </span>
                        ))}
                    </p>
                  </div>
                </div>


              </div>
            </div>


          </div>
        ))
      )}
    </div>
  );
};

export default ProjectAbstract;
