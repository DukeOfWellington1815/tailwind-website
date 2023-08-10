import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useSession from '../../middleware/session';
import { getAllAbstracts } from '../../middleware/apiLogin';
import placeholder from '../../assets/images/placeholder.png';
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
        setAbstracts(data);
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
    centerPadding: "20%",
    nextArrow: null,
    prevArrow: null,
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
      <h1 className="text-3xl font-semibold text-center mb-6 primary-color">Projects</h1>
      {loading ? (
        <p>Loading abstracts...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        abstracts.map((abstract, index) => (
          <div key={index} className="carousel-item">
            <Slider {...slickSettings}>
              {abstract.images && abstract.images.length > 0 ? (
                abstract.images.map((image, imgIndex) => (
                  <div key={imgIndex} className="relative image-container">
                    <img
                      src={image}
                      alt={abstract.title}
                      className="h-screen w-full object-cover rounded-md mb-4 mx-auto"
                    />
                  </div>
                ))
              ) : (
                placeholderImages.map((image, imgIndex) => (
                  <div key={imgIndex} className="relative image-container">
                    <img
                      src={image}
                      alt="Placeholder"
                      className="h-screen w-full object-cover rounded-md mb-4 mx-auto"
                    />
                  </div>
                ))
              )}
            </Slider>
            <h2 className="text-lg font-semibold mb-2 primary-color">{abstract.title}</h2>
            <p className="text-gray-700">{abstract.body}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectAbstract;
