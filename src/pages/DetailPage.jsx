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

const DetailPage = () => {
  const { movie_id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

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

  if (error) return <div className="error">{error}</div>;
  if (loading) return <Loader />;

  return (
    <div
      className="detail-page"
      style={{ backgroundColor: colors.background, color: colors.textbody }}
    >
      <div className="movie-hero">
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
          <h1 className="movie-title">{movieDetails.title}</h1>
        </div>
      </div>

      <div className="movie-poster-info">
        <div className="movie-poster" onClick={openModal}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
            className="movie-poster-image"
          />
          <div className="play-icon">
            <FaPlay />
          </div>
        </div>

        <div className="movie-info">
          <p className="movie-rating">
            Rating: ★ {movieDetails.vote_average.toFixed(1)} / 10
          </p>
          <p className="movie-duration">
            Duration: {movieDetails.runtime} minutes
          </p>
          <p className="movie-overview">{movieDetails.overview}</p>
          <p className="movie-availability">Available for Purchase</p>
          <button className="buy-button">Buy Now</button>
        </div>
      </div>

      <div className="additional-info">
        <h2>Casts</h2>
        <Cast movie_id={movie_id} />
      </div>

      <SimilarMovies movie_id={movie_id} />
      <RecommendedMovies movie_id={movie_id} />

      <TrailerModal
        movie_id={movie_id}
        showModal={showModal}
        closeModal={closeModal}
      />
    </div>
  );
};

export default DetailPage;
