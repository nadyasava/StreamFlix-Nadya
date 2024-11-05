// TrailerModal.jsx
import React, { useState, useEffect } from 'react';
import '../styles/TrailerModal.css';

const TrailerModal = ({ movie_id, showModal, closeModal }) => {
  const [trailerUrl, setTrailerUrl] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      if (movie_id) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/movie/${movie_id}?api_key=${process.env.REACT_APP_TMDB_KEY}&append_to_response=videos`
          );
          const data = await response.json();
          const trailerKey = data.videos.results.find(
            (video) => video.type === 'Trailer'
          )?.key;
          setTrailerUrl(
            trailerKey ? `https://www.youtube.com/embed/${trailerKey}` : null
          );
        } catch (error) {
          console.error('Failed to fetch trailer:', error);
        }
      }
    };

    if (showModal) {
      fetchTrailer();
    }
  }, [movie_id, showModal]);

  if (!showModal) return null;

  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={closeModal}>
          &times;
        </span>
        {trailerUrl && (
          <iframe
            className="youtube-trailer"
            src={trailerUrl}
            title="YouTube Trailer"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default TrailerModal;