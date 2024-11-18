import { Button, List, ListItem, ListItemText, Box, Typography, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getPopularMovies, addToWatchlist } from '../services/tmdbService';
import { useAuthContext } from '../context/authContext';
import AddLogModal from './addLogModal';

function Sidebar() {
  const [movies, setMovies] = useState([]);
  const { user } = useAuthContext();
  const [openLogModal, setOpenLogModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);

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

  const handleOpenLogModal = (movie) => {
    setSelectedMovie(movie);
    setOpenLogModal(true);
  };

  const handleCloseLogModal = () => {
    setOpenLogModal(false);
    setSelectedMovie(null);
  };

  const handleOpenDescriptionModal = (movie) => {
    setSelectedMovie(movie);
    setOpenDescriptionModal(true);
  };

  const handleCloseDescriptionModal = () => {
    setOpenDescriptionModal(false);
    setSelectedMovie(null);
  };

  return (
    <Box
      component="aside"
      sx={{
        width: '300px',
        backgroundColor: 'background.paper',
        padding: 2,
        boxShadow: 1,
        borderRadius: '8px',
        overflowY: 'auto',
        maxHeight: '100vh',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2, textAlign: 'center' }}>
        Películas Populares
      </Typography>
      <List>
        {movies.map((movie) => (
          <ListItem
            key={movie.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: 0.5,
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster}`}
              alt={movie.title}
              style={{
                borderRadius: '8px',
                width: '75%',
                objectFit: 'cover',
                marginBottom: '8px',
                cursor: 'pointer',
              }}
              onClick={() => handleOpenDescriptionModal(movie)}
            />
            <ListItemText
              primary={movie.title}
              primaryTypographyProps={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
              secondary={movie.genre}
              secondaryTypographyProps={{
                textAlign: 'center',
                fontSize: '12px',
                color: 'text.secondary',
              }}
              sx={{ marginBottom: '8px' }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Button
                sx={{ marginBottom: 0.5 }}
                variant="contained"
                size="small"
                color="primary"
                onClick={() => handleAddToWatchlist(movie)}
              >
                Ver Más Tarde
              </Button>
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={() => handleOpenLogModal(movie)}
              >
                Añadir Log
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>

      {/* Modal para añadir log */}
      {selectedMovie && (
        <AddLogModal
          movie={selectedMovie}
          open={openLogModal}
          onClose={handleCloseLogModal}
        />
      )}

      {/* Modal para mostrar descripción */}
      {selectedMovie && (
        <Modal
          open={openDescriptionModal}
          onClose={handleCloseDescriptionModal}
          aria-labelledby="movie-description-title"
          aria-describedby="movie-description-content"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              maxWidth: '600px',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: '8px',
            }}
          >
            <Typography id="movie-description-title" variant="h6" sx={{ marginBottom: 2 }}>
              Sinopsis de {selectedMovie.title}
            </Typography>
            <Typography id="movie-description-content" variant="body1">
              {selectedMovie.synopsis || 'Descripción no disponible.'}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
              <Button variant="contained" onClick={handleCloseDescriptionModal}>
                Cerrar
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </Box>
  );
}

export default Sidebar;
