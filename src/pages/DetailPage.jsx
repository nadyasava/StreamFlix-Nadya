import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import backdropNotAvailable from "../assets/backdrop_not_available.jpg";
import Cast from "../components/Cast";
import Loader from "../components/Loader";
import "../styles/DetailPage.css";
import colors from "../styles/colors";
import { FaPlay } from "react-icons/fa";
import SimilarMovies from "../components/SimilarMovies";
import RecommendedMovies from "../components/RecommendedMovies";
import TrailerModal from "../components/TrailerModal";
import PurchaseModal from "../components/PurchaseModal";
import ConfirmationModal from "../components/ConfirmationModal";

const DetailPage = ({ balance, setBalance, onPurchase, ownedMovies = [] }) => {
  const { id } = useParams();
  const movie_id = id.split("-")[0]; // Mengambil ID dari format "id-slug"
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  // Check if the movie is owned
  const isOwned = ownedMovies.includes(Number(movie_id));

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const detailsResponse = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/movie/${movie_id}`,
          {
            params: { api_key: process.env.REACT_APP_TMDB_KEY },
          }
        );
        setMovieDetails(detailsResponse.data);
      } catch (error) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movie_id]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handlePurchase = () => {
    const price = getPriceByRating(movieDetails.vote_average);
    const numericPrice = parseInt(price.replace(/\D/g, ""), 10);

    if (balance >= numericPrice) {
      setBalance(balance - numericPrice);
      onPurchase(movie_id);
      setShowPurchaseModal(true);
    } else {
      alert("Insufficient balance!");
    }
  };

  const confirmPurchase = () => {
    setShowConfirmationModal(false);
    handlePurchase();
  };

  const openConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

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

  if (error) return <div className="error">{error}</div>;
  if (loading) return <Loader />;

  return (
    <div
      className="detail-page"
      style={{ backgroundColor: colors.background, color: colors.textbody }}
    >
      <div className="movie-hero" data-aos="fade-down">
        <img
          src={
            movieDetails.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`
              : backdropNotAvailable
          }
          alt={movieDetails.title}
          className="movie-hero-image" 
        />
        <div className="movie-hero-overlay">
          <h1 className="movie-title" data-aos="fade-right">{movieDetails.title}</h1>
        </div>
      </div>

      <div className="movie-poster-info">
        <div className="movie-poster" data-aos="fade-right" onClick={openModal}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
            className="movie-poster-image"
          />
          <div className="play-icon">
            <FaPlay />
          </div>
        </div>

        <div className="movie-info" data-aos="fade-left">
          <p className="movie-rating">
            Rating: ★ {movieDetails.vote_average.toFixed(1)} / 10
          </p>
          <p className="movie-duration">
            Duration: {movieDetails.runtime} minutes
          </p>
          <p className="movie-genres">
            Genres:{" "}
            {movieDetails.genres && movieDetails.genres.length > 0
              ? movieDetails.genres.map((genre) => genre.name).join(", ")
              : "N/A"}
          </p>
          <p className="movie-overview">{movieDetails.overview}</p>
          <p className="movie-availability">
            {isOwned ? "Owned" : "Available for Purchase"}
          </p>
          <button
            className="buy-button"
            onClick={
              isOwned ? () => setShowPurchaseModal(true) : openConfirmationModal
            }
            disabled={isOwned}
          >
            {isOwned ? "Owned" : "Buy Now"}
          </button>
        </div>
      </div>

      <div className="additional-info">
        <h2 className="title">Casts</h2>
        <Cast movie_id={movie_id} />
      </div>

      <SimilarMovies movie_id={movie_id} />
      <RecommendedMovies movie_id={movie_id} />

      <TrailerModal
        movie_id={movie_id}
        showModal={showModal}
        closeModal={closeModal}
      />

      <ConfirmationModal
        showModal={showConfirmationModal}
        onClose={closeConfirmationModal}
        onConfirm={confirmPurchase}
        movieTitle={movieDetails.title}
      />

      <PurchaseModal
        showModal={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        movieTitle={movieDetails.title}
        newBalance={balance}
      />
    </div>
  );
};

export default DetailPage;
