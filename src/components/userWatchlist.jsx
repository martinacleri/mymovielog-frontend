import React, {useEffect, useState} from 'react';
import { getWatchlist } from '../services/tmdbService';

const WatchlistList = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                const watchlistMovies = await getWatchlist();
                setMovies(watchlistMovies);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchWatchlist();
    }, []);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (movies.length === 0) {
        return <p>No tienes películas para ver más tarde.</p>;
    }

    return (
        <div>
            <h1>Tus Películas Para Ver Más Tarde</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h3>{movie.title}</h3>
                        <img src={`http://image.tmdb.org/t/p/w200${movie.poster}`} alt={movie.title} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WatchlistList;