import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/RecommendedMovies.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import posterNotAvailable from "../assets/poster_not_available.png";

const RecommendedMovies = ({ movie_id }) => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

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
        setImageErrors({});
      } catch (error) {
        console.error("Error fetching recommended movies:", error);
      }
    };

    fetchRecommendedMovies();
  }, [movie_id]);

  const truncateTitle = (title, maxLength) => {
    return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? recommendedMovies.length - 6 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= recommendedMovies.length - 6 ? 0 : prevIndex + 1
    );
  };

  const handleImageError = (movieId) => {
    setImageErrors((prev) => ({
      ...prev,
      [movieId]: true,
    }));
  };

  return (
    <div className="recommended-movies">
      <h2 className="title">Recommended Movies</h2>
      {recommendedMovies.length === 0 ? (
        <div className="rec-error">
          No recommendations available for this movie.
        </div>
      ) : (
        <div className="carousel-container">
          <button
            className="carousel-button prev"
            onClick={handlePrevClick}
            aria-label="Previous"
            disabled={recommendedMovies.length <= 6}
          >
            <FaChevronLeft />
          </button>
          <div className="recommended-movie-list-wrapper">
            <div
              className="recommended-movie-list"
              style={{
                transform: `translateX(-${currentIndex * (100 / 6)}%)`,
              }}
            >
              {recommendedMovies.map((movie) => (
                <div key={movie.id} className="movie-item">
                  <img
                    src={
                      !imageErrors[movie.id] && movie.poster_path
                        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                        : posterNotAvailable
                    }
                    alt={movie.title}
                    onError={() => handleImageError(movie.id)}
                    loading="lazy"
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
            disabled={recommendedMovies.length <= 6}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default RecommendedMovies;
