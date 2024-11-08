import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
import Blobs from "../components/Blobs";
import Hero from "../components/Hero";
import colors from "../styles/colors";
import "../styles/HomePage.css";

const HomePage = ({ ownedMovies }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pageParam = queryParams.get("page");
    if (pageParam) {
      setPage(Number(pageParam));
    }
  }, [location]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/movie/now_playing`,
          {
            params: {
              api_key: process.env.REACT_APP_TMDB_KEY,
              page: page,
              region: "ID",
            },
          }
        );
        
        const totalResults = response.data.results;
        setMovies(totalResults.slice(0, itemsPerPage));
        setTotalPages(response.data.total_pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  if (loading) {
    return (
      <div
        className="home-page"
        style={{ backgroundColor: colors.background, color: colors.textbody }}
      >
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="home-page"
        style={{ backgroundColor: colors.background, color: colors.textbody }}
      >
        <div>Error: {error}</div>
      </div>
    );
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);
    navigate(`/?page=${newPage}`);
  };

  const renderPagination = () => {
    const paginationButtons = [];
    if (page > 1) {
      paginationButtons.push(
        <button
          className="pagination-button prev-next-button"
          key="prev"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
      );
    }

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        paginationButtons.push(
          <button
            className={`pagination-button ${i === page ? "active" : ""}`}
            key={i}
            onClick={() => handlePageChange(i)}
            disabled={i === page}
          >
            {i}
          </button>
        );
      } else if (i === page - 2 || i === page + 2) {
        paginationButtons.push(<span key={`dots-${i}`}>...</span>);
      }
    }

    if (page < totalPages) {
      paginationButtons.push(
        <button
          className="pagination-button prev-next-button"
          key="next"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      );
    }

    return paginationButtons;
  };

  return (
    <div
      className="home-page"
      style={{ backgroundColor: colors.background, color: colors.textbody }}
    >
      <Hero />
      <Blobs />
      <h2 className="title" data-aos="zoom-out" style={{ color: colors.texttitle, marginTop: "1em"}}>
        Now Showing
      </h2>
      <div className="movie-list" data-aos="fade-up">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={{
              id: movie.id,
              title: movie.title,
              poster: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "assets/poster_not_available.png",
              rating: movie.vote_average,
              owned: ownedMovies.includes(Number(movie.id)),
            }}
          />
        ))}
      </div>
      <div
        className="pagination"
        style={{ textAlign: "center" }}
      >
        {renderPagination()}
      </div>
    </div>
  );
};

export default HomePage;
