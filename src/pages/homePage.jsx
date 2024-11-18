import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    TextField, 
    Box, 
    Button, 
    Grid, 
    Container 
} from '@mui/material';
import MovieCard from '../components/movieCard';
import Sidebar from '../components/sideBar';
import AddLogModal from '../components/addLogModal';
import MovieDescriptionModal from '../components/movieDescriptionModal'; // Nuevo modal
import { searchMovies, addToWatchlist } from '../services/tmdbService';
import { useAuthContext } from '../context/authContext';

function MovieSearch() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [openDescriptionModal, setOpenDescriptionModal] = useState(false); // Estado para modal de descripción
    const { user } = useAuthContext();

    // Efecto para buscar películas cuando cambia el query
    useEffect(() => {
        const fetchMovies = async () => {
            if (query) {
                const data = await searchMovies(query);
                setMovies(data.results || []);
                setHasSearched(true);
            } else {
                setMovies([]);
                setHasSearched(false);
            }
        };
        fetchMovies();
    }, [query]);

    const handleInputChange = (e) => setQuery(e.target.value);

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
        setOpenModal(true);
    };

    const handleCloseLogModal = () => {
        setOpenModal(false);
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
        <Box sx={{ display: 'flex', backgroundColor: 'background.default', minHeight: '100vh' }}>
            {/* Sidebar */}
            <Sidebar />

            {/* Contenido Principal */}
            <Box sx={{ flex: 1 }}>
                {/* Barra Superior */}
                <AppBar position="sticky" sx={{ backgroundColor: 'primary.main' }}>
                    <Toolbar>
                        <Typography 
                            variant="h6" 
                            sx={{ flexGrow: 1, fontWeight: 700, color: 'text.primary' }}
                        >
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

                {/* Campo de Búsqueda y Resultados */}
                <Container sx={{ mt: 4 }}>
                    <TextField
                        fullWidth
                        placeholder="Buscar películas..."
                        value={query}
                        onChange={handleInputChange}
                        sx={{
                            mb: 4,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px',
                                backgroundColor: 'background.paper',
                            },
                        }}
                    />
                    {movies.length > 0 ? (
                        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                            {movies.map((movie) => (
                                <Grid item xs={12} sm={6} md={4} lg={2.4} key={movie.id}>
                                    <MovieCard 
                                        movie={movie} 
                                        onAddToWatchlist={handleAddToWatchlist}
                                        onAddLog={() => handleOpenLogModal(movie)} 
                                        onPosterClick={() => handleOpenDescriptionModal(movie)} // Nueva acción
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        hasSearched && (
                            <Typography 
                                variant="h6" 
                                sx={{ textAlign: 'center', color: 'text.secondary', mt: 4 }}
                            >
                                No se encontraron películas.
                            </Typography>
                        )
                    )}
                </Container>

                {/* Modal para Agregar Log */}
                {selectedMovie && (
                    <AddLogModal
                        movie={selectedMovie}
                        open={openModal}
                        onClose={handleCloseLogModal}
                    />
                )}

                {/* Modal para Mostrar Descripción */}
                {selectedMovie && (
                    <MovieDescriptionModal
                        movie={selectedMovie}
                        open={openDescriptionModal}
                        onClose={handleCloseDescriptionModal}
                    />
                )}
            </Box>
        </Box>
    );
}

export default MovieSearch;