import {Button} from '@mui/material';
import React, {useEffect, useState} from 'react';
import { getWatchlist, removeFromWatchlist } from '../services/tmdbService';
import AddLogModal from './addLogModal';

const WatchlistList = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

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

    const handleOpenModal = (movie) => {
        setSelectedMovie(movie);
        setOpenModal(true);
      };
    
      const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedMovie(null);
      }

    const handleRemoveFromWatchlist = async (movieId) => {
        try {
            await removeFromWatchlist(movieId);
            setMovies(movies.filter((movie) => movie.id !== movieId));
        } catch (error) {
            console.error("Error al eliminar de ver más tarde:", error);
        }
    }

    return (
        <div>
            <h1>Tus Películas Para Ver Más Tarde</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h3>{movie.title}</h3>
                        <img src={`http://image.tmdb.org/t/p/w200${movie.poster}`} alt={movie.title} />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleOpenModal(movie)}
                        > Añadir Log
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleRemoveFromWatchlist(movie.id)}
                        > Eliminar de Ver Más Tarde
                        </Button>
                    </li>
                ))}
            </ul>
            {selectedMovie && (
                <AddLogModal
                    movie={selectedMovie}
                    open={openModal}
                    onClose={handleCloseModal}/>
            )}
        </div>
    );
};

export default WatchlistList;