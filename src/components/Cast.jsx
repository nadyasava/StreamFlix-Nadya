import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Cast.css';
import defaultImage from '../assets/cast_not_available.png';

const Cast = ({ movie_id }) => {
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCast = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/movie/${movie_id}/credits`,
                    {
                        params: { api_key: process.env.REACT_APP_TMDB_KEY },
                    }
                );
                setCast(response.data.cast);
            } catch (error) {
                setError("Failed to fetch cast details.");
            } finally {
                setLoading(false);
            }
        };

        fetchCast();
    }, [movie_id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    if (cast.length === 0) {
        return <div className="cast-error">No cast information available for this movie.</div>;
    }

    return (
        <div className="cast-list">
            {cast.slice(0, 5).map((member) => (
                <div className="cast-image" key={member.id}>
                    <img
                        src={member.profile_path 
                            ? `https://image.tmdb.org/t/p/w200${member.profile_path}` 
                            : defaultImage}
                        alt={member.name || "No Image Available"}
                    />
                    <div className="cast-name">{member.name}</div>
                    <div className="cast-character">{member.character}</div>
                </div>
            ))}
        </div>
    );
};

export default Cast;
