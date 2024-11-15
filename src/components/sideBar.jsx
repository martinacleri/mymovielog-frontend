import { Button, Modal, Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel, List, ListItem, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getPopularMovies, addToWatchlist, addLog} from '../services/tmdbService';
import { useAuthContext } from '../context/authContext';

function AddLogModal({movie, open, onClose}) {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');
  const { user } = useAuthContext();

  const handleSubmit = async () => {
    if (user) {
      await addLog(movie, review, rating);
      alert('Log añadido exitosamente');
      onClose();
    } else {
      alert('Por favor, inicia sesión para añadir un log.')
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{width: 400, bgcolor: 'background.paper', p: 4, m: 'auto', mt: '10%', borderRadius: 2}}>
        <Typography variant="h6" component="h2" gutterBottom>
          Añadir Log
        </Typography>
        <TextField
          label="Reseña"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={review}
          onChange={(e) => setReview(e.target.value)}
          sx={{mb: 2}}/>
        <FormControl fullWidth sx={{mb:2}}>
          <InputLabel>Calificación</InputLabel>
          <Select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            label="Calificación">
            {[1,2,3,4,5].map((rate) => (
              <MenuItem key={rate} value={rate}>{rate}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
          Guardar Log
        </Button>
      </Box>
    </Modal>
  );
}

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