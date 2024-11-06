import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "../styles/MovieCard.css";

const MovieCard = ({ movie, isOwned }) => {
  const navigate = useNavigate();

  // Function to create slug from movie title
  const createSlug = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  };

  // Function to determine price based on rating
  const getPriceByRating = (rating) => {
    if (rating >= 1 && rating <= 3) {
      return "Rp. 3.500";
    } else if (rating > 3 && rating <= 6) {
      return "Rp. 8.250";
    } else if (rating > 6 && rating <= 8) {
      return "Rp. 16.350";
    } else if (rating > 8 && rating <= 10) {
      return "Rp. 21.250";
    } else {
      return "N/A";
    }
  };

  const handleCardClick = () => {
    const slug = createSlug(movie.title);
    navigate(`/${movie.id}-${slug}`);
  };

  return (
    <div
      className="movie-card"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <img
        className="movie-card__poster"
        src={movie.poster}
        alt={movie.title}
      />
      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.title}</h3>
        <p className="movie-card__price">{getPriceByRating(movie.rating)}</p>
        <p
          className={`movie-card__owned ${movie.owned ? "owned" : "not-owned"}`}
        >
          {movie.owned ? (
            <>
              <FaCheckCircle className="status-icon" /> Owned
            </>
          ) : (
            <>
              <FaTimesCircle className="status-icon" /> Not Owned
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;