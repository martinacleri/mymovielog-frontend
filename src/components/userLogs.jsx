import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Select,
    MenuItem,
    Box,
    Button,
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
} from '@mui/material';
import Sidebar from '../components/sideBar';
import { getLogs, deleteLog, getDBGenres } from '../services/tmdbService';

const LogList = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');

    // Fetch de géneros y logs al cargar
    useEffect(() => {
        const fetchGenresAndLogs = async () => {
            try {
                const fetchedGenres = await getDBGenres();
                setGenres(fetchedGenres);

                const logsMovies = await getLogs();
                setMovies(logsMovies);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchGenresAndLogs();
    }, []);

    const handleGenreChange = async (event) => {
        const genreId = event.target.value;
        setSelectedGenre(genreId);

        try {
            const filteredLogs = await getLogs(genreId);
            setMovies(filteredLogs);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteLog = async (logId) => {
        try {
            await deleteLog(logId);
            setMovies(movies.filter((movie) => movie.log.id !== logId));
            alert('Log eliminado con éxito');
        } catch (err) {
            setError(err.message);
        }
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

                {/* Filtro y Resultados */}
                <Container sx={{ mt: 4 }}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" sx={{ mb: 3, color: 'text.primary' }}>
                            Tus Logs
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                    </Box>

                    {movies.length > 0 ? (
                        <Grid container spacing={3}>
                            {movies.map((movie) => (
                                <Grid item xs={12} key={movie.id}>
                                    <Card
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            p: 2,
                                            backgroundColor: 'background.paper',
                                            borderRadius: '8px',
                                        }}
                                    >
                                        {/* Imagen del póster */}
                                        <CardMedia
                                            component="img"
                                            image={
                                                movie.poster
                                                    ? `http://image.tmdb.org/t/p/w200${movie.poster}`
                                                    : 'https://via.placeholder.com/200x300?text=Sin+Imagen'
                                            }
                                            alt={movie.title}
                                            sx={{
                                                width: 120,
                                                height: 180,
                                                borderRadius: '8px',
                                                mr: 2,
                                            }}
                                        />

                                        {/* Contenido */}
                                        <CardContent sx={{ flex: 1 }}>
                                            <Typography
                                                variant="h6"
                                                sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}
                                            >
                                                {movie.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{ color: 'text.secondary', mb: 1 }}
                                            >
                                                <strong>Reseña:</strong> {movie.log.review}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{ color: 'text.secondary', mb: 2 }}
                                            >
                                                <strong>Valoración:</strong> {movie.log.rating}/5
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => handleDeleteLog(movie.log.id)}
                                            >
                                                Eliminar Log
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Typography
                            variant="h6"
                            sx={{ textAlign: 'center', color: 'text.secondary', mt: 4 }}
                        >
                            Aún no tienes películas registradas.
                        </Typography>
                    )}
                </Container>
            </Box>
        </Box>
    );
};

export default LogList;
