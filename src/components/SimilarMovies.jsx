import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/SimilarMovies.css';

const SimilarMovies = ({ movie_id }) => {
  const [similarMovies, setSimilarMovies] = useState([]);

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
      } catch (error) {
        console.error('Error fetching similar movies:', error);
      }
    };

    fetchSimilarMovies();
  }, [movie_id]);

  const truncateTitle = (title, maxLength) => {
    return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
  };

  return (
    <div className="similar-movies"> 
      <h2 className='title' >Similar Movies</h2>
      <div className="movie-list">
        {similarMovies.map((movie) => (
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

export default SimilarMovies;
