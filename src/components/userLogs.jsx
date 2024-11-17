import React, {useEffect, useState} from 'react';
import { getLogs } from '../services/tmdbService';

const LogList = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const logsMovies = await getLogs();
                setMovies(logsMovies);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchLogs();
    }, []);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (movies.length === 0) {
        return <p>No tienes logs registrados.</p>;
    }

    return (
        <div>
            <h1>Tus Logs</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h3>{movie.title}</h3>
                        <img src={`http://image.tmdb.org/t/p/w200${movie.poster}`} alt={movie.title} />
                        <p><strong>Reseña: </strong>{movie.log.review}</p>
                        <p><strong>Calificación: </strong> {movie.log.rating}/5</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LogList;