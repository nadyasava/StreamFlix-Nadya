import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/RecommendedMovies.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const RecommendedMovies = ({ movie_id }) => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        const recommendedResponse = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/movie/${movie_id}/recommendations`,
          {
            params: { api_key: process.env.REACT_APP_TMDB_KEY },
          }
        );
        setRecommendedMovies(recommendedResponse.data.results);
      } catch (error) {
        console.error('Error fetching recommended movies:', error);
      }
    };

    fetchRecommendedMovies();
  }, [movie_id]);

  const truncateTitle = (title, maxLength) => {
    return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? recommendedMovies.length - 7 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= recommendedMovies.length - 7 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="recommended-movies">
      <h2 className='title'>Recommended Movies</h2>
      <div className="carousel-container">
        <button 
          className="carousel-button prev" 
          onClick={handlePrevClick}
          aria-label="Previous"
        >
          <FaChevronLeft />
        </button>
        <div className="recommended-movie-list">
          {recommendedMovies.slice(currentIndex, currentIndex + 6).map((movie) => (
            <div key={movie.id} className="movie-item">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : "/assets/poster_not_available.png"
                }
                alt={movie.title}
              />
              <p>{truncateTitle(movie.title, 15)}</p>
            </div>
          ))}
        </div>
        <button 
          className="carousel-button next" 
          onClick={handleNextClick}
          aria-label="Next"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default RecommendedMovies;