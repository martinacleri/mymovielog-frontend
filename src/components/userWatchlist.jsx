import {
    Button,
    Box,
    Typography,
    AppBar,
    Toolbar,
    Container,
    Select,
    MenuItem,
  } from '@mui/material';
  import React, { useEffect, useState } from 'react';
  import { Link } from 'react-router-dom';
  import { getWatchlist, removeFromWatchlist, getDBGenres } from '../services/tmdbService';
  import AddLogModal from './addLogModal';
  import Sidebar from '../components/sideBar';
  
  const WatchlistList = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
  
    useEffect(() => {
      const fetchInitialData = async () => {
        try {
          const [watchlistMovies, availableGenres] = await Promise.all([
            getWatchlist(),
            getDBGenres(),
          ]);
          setMovies(watchlistMovies);
          setGenres(availableGenres);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchInitialData();
    }, []);
  
    const handleGenreChange = async (event) => {
      const genreId = event.target.value;
      setSelectedGenre(genreId);
  
      try {
        const filteredMovies = await getWatchlist(genreId);
        setMovies(filteredMovies);
      } catch (err) {
        setError(err.message);
      }
    };
  
    const handleOpenModal = (movie) => {
      setSelectedMovie(movie);
      setOpenModal(true);
    };
  
    const handleCloseModal = () => {
      setOpenModal(false);
      setSelectedMovie(null);
    };
  
    const handleRemoveFromWatchlist = async (movieId) => {
      try {
        await removeFromWatchlist(movieId);
        setMovies(movies.filter((movie) => movie.id !== movieId));
        alert('Película eliminada con éxito');
      } catch (error) {
        console.error('Error al eliminar de Ver Más Tarde:', error);
      }
    };
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  
    return (
      <Box sx={{ display: 'flex', backgroundColor: 'background.default', minHeight: '100vh' }}>
        {/* Sidebar */}
        <Sidebar />
  
        {/* Contenido principal */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* AppBar */}
          <AppBar position="sticky" sx={{ backgroundColor: 'primary.main' }}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, color: 'text.primary' }}>
                MyMovieLog
              </Typography>
              <Box>
                <Button color="inherit" component={Link} to="/home" sx={{ fontWeight: 'bold' }}>
                  Buscar Películas
                </Button>
                <Button color="inherit" component={Link} to="/watchlist" sx={{ fontWeight: 'bold' }}>
                  Ver Más Tarde
                </Button>
                <Button color="inherit" component={Link} to="/logs" sx={{ fontWeight: 'bold' }}>
                  Mis Logs
                </Button>
              </Box>
            </Toolbar>
          </AppBar>
  
          {/* Contenido de la lista */}
          <Container sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ color: 'text.primary', mb: 3 }}>
              Ver Más Tarde
            </Typography>
  
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                Filtrar por género:
                            </Typography>
                            <Select
                                value={selectedGenre}
                                onChange={handleGenreChange}
                                displayEmpty
                                sx={{
                                    backgroundColor: 'background.paper',
                                    borderRadius: '8px',
                                    minWidth: '200px',
                                }}
                            >
                                <MenuItem value="">Todos los géneros</MenuItem>
                                {genres.map((genre) => (
                                    <MenuItem key={genre.id} value={genre.id}>
                                        {genre.genreName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
  
            {movies.length === 0 ? (
              <Typography variant="h6" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                Aún no has guardado películas para ver más tarde.
              </Typography>
            ) : (
                <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)', // Siempre 4 columnas
                  gap: '16px', // Espaciado entre películas
                }}
              >
                {movies.map((movie) => (
                  <Box
                    key={movie.id}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      backgroundColor: 'background.paper',
                      borderRadius: '8px',
                      p: 2,
                    }}
                  >
                    <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>
                      {movie.title}
                    </Typography>
                    <img
                      src={`http://image.tmdb.org/t/p/w200${movie.poster}`}
                      alt={movie.title}
                      style={{ borderRadius: '8px', marginBottom: '1rem', width: '100%' }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenModal(movie)}
                      >
                        Añadir Log
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleRemoveFromWatchlist(movie.id)}
                      >
                        Eliminar
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Container>
  
          {/* Modal para añadir Log */}
          {selectedMovie && (
            <AddLogModal movie={selectedMovie} open={openModal} onClose={handleCloseModal} />
          )}
        </Box>
      </Box>
    );
  };
  
  export default WatchlistList;  