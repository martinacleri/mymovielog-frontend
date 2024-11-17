import {Button} from '@mui/material';
import React, {useEffect, useState} from 'react';
import { getLogs, deleteLog } from '../services/tmdbService';

const LogList = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [logs, setLogs] = useState([]);

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

    const handleDeleteLog = async (logId) => {
        try {
            await deleteLog(logId);
            setLogs(logs.filter((movie) => movie.log.id !== logId));
            alert('Log eliminado con éxito');
        } catch (err) {
            setError(err.message);
        }
    }

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
                        <p><strong>Tu Reseña: </strong>{movie.log.review}</p>
                        <p><strong>Tu Calificación: </strong> {movie.log.rating}/5</p>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleDeleteLog(movie.log.id)}>Eliminar Log</Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LogList;