import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/SimilarMovies.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import posterNotAvailable from '../assets/poster_not_available.png';

const SimilarMovies = ({ movie_id }) => {
  const [similarMovies, setSimilarMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const similarResponse = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/movie/${movie_id}/similar`,
          {
            params: { api_key: process.env.REACT_APP_TMDB_KEY },
          }
        );
        setSimilarMovies(similarResponse.data.results);
        setImageErrors({});
      } catch (error) {
        console.error('Error fetching similar movies:', error);
      }
    };

    fetchSimilarMovies();
  }, [movie_id]);

  const truncateTitle = (title, maxLength) => {
    return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
  };

  const handlePrevClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? similarMovies.length - 7 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNextClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex >= similarMovies.length - 7 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleImageError = (movieId) => {
    setImageErrors(prev => ({
      ...prev,
      [movieId]: true
    }));
  };

  const translateValue = `-${currentIndex * (100 / 6)}%`;

  return (
    <div className="similar-movies"> 
      <h2 className='title'>Similar Movies</h2>
      <div className="carousel-container">
        <button 
          className="carousel-button prev" 
          onClick={handlePrevClick}
          aria-label="Previous"
          disabled={isAnimating}
        >
          <FaChevronLeft />
        </button>
        <div className="similar-movie-list-wrapper">
          <div 
            className="similar-movie-list"
            style={{
              transform: `translateX(${translateValue})`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            {similarMovies.map((movie) => (
              <div key={movie.id} className="movie-item">
                <img
                  src={
                    !imageErrors[movie.id] && movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : posterNotAvailable
                  }
                  alt={movie.title}
                  onError={() => handleImageError(movie.id)}
                />
                <p>{truncateTitle(movie.title, 15)}</p>
              </div>
            ))}
          </div>
        </div>
        <button 
          className="carousel-button next" 
          onClick={handleNextClick}
          aria-label="Next"
          disabled={isAnimating}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default SimilarMovies;