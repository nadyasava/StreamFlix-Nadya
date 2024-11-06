import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import "../styles/Hero.css";

const Hero = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".hero-animate-slide-up");
    elements.forEach((element, index) => {
      element.style.animation = `slideUp 0.8s ease-out ${
        index * 0.2
      }s forwards`;
    });
  }, []);

  return (
    <div className="hero-flex-container hero-bkg__spotlight">
      <div className="hero-flex-item">
        <header className="hero-header">
          <div className="hero-animate-slide-up">
            <FontAwesomeIcon icon={faFilm} className="hero-icon" />
          </div>
          <h1 className="hero-animate-slide-up hero-text-shadow hero-title">
            StreamFlix
          </h1>
          <h2 className="hero-animate-slide-up hero-text-shadow hero-subtitle">
            Explore, Watch, and Own Your Favorites
          </h2>
          <p className="hero-animate-slide-up hero-text-shadow hero-description">
            Discover a vast collection of movies available for legal purchase
            and streaming. Watch and own your favorites with confidence.
          </p>
        </header>
      </div>
    </div>
  );
};

export default Hero;
