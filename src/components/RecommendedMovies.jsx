import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/RecommendedMovies.css';

const RecommendedMovies = ({ movie_id }) => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);

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

  return (
    <div className="recommended-movies">
      <h2>Recommended Movies</h2>
      <div className="movie-list">
        {recommendedMovies.map((movie) => (
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
    </div>
  );
};

export default RecommendedMovies;