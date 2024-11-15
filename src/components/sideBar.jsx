import { Button, List, ListItem, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getPopularMovies, addToWatchlist } from '../services/tmdbService';
import { useAuthContext } from '../context/authContext';
import AddLogModal from './addLogModal';

function Sidebar() {
  const [movies, setMovies] = useState([]);
  const { user } = useAuthContext();
  const [openModal, setOpenModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error al obtener películas populares:", error);
      }
    };
    fetchMovies();
  }, []);

  const handleAddToWatchlist = async (movie) => {
    try {
      if (user) {
        await addToWatchlist(movie);
        alert('Película agregada a Ver Más Tarde.');
      } else {
        alert('Por favor, inicia sesión para guardar películas.');
      }
    } catch (error) {
      console.error("Error al agregar a la lista de espera:", error);
      alert('Hubo un error al agregar la película. Intenta de nuevo más tarde.');
    }
  };

  const handleOpenModal = (movie) => {
    setSelectedMovie(movie);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedMovie(null);
  }

  return (
    <aside>
      <h3>Películas Populares</h3>
      <List>
        {movies.map((movie) => (
          <ListItem key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster}`}
              alt={movie.title}
            />
            <div>
              <ListItemText primary={movie.title} />
              <ListItemText primary={movie.genre} />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddToWatchlist(movie)}
              >
                Ver Más Tarde
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleOpenModal(movie)}
              >
                Añadir Log
              </Button>
            </div>
          </ListItem>
        ))}
      </List>
      {selectedMovie && (
        <AddLogModal
          movie={selectedMovie}
          open={openModal}
          onClose={handleCloseModal}/>
      )}
    </aside>
  );
}

export default Sidebar;