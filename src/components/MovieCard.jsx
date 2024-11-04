import React from 'react';
import '../styles/MovieCard.css';

const MovieCard = ({ movie }) => {
    // Function to determine price based on rating
    const getPriceByRating = (rating) => {
        if (rating >= 1 && rating <= 3) {
            return 'Rp. 3.500';
        } else if (rating > 3 && rating <= 6) {
            return 'Rp. 8.250';
        } else if (rating > 6 && rating <= 8) {
            return 'Rp. 16.350';
        } else if (rating > 8 && rating <= 10) {
            return 'Rp. 21.250';
        } else {
            return 'N/A';
        }
    };

    return (
        <div className="movie-card">
            <img className="movie-card__poster" src={movie.poster} alt={movie.title} />
            <div className="movie-card__info">
                <h3 className="movie-card__title">{movie.title}</h3>
                <p className="movie-card__price">{getPriceByRating(movie.rating)}</p>
                <p className="movie-card__owned">{movie.owned ? "Owned" : "Not Owned"}</p>
            </div>
        </div>
    );
};

export default MovieCard;
