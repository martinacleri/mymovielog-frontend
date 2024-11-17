import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import MovieCard from '../components/movieCard';
import { searchMovies, addToWatchlist } from '../services/tmdbService';
import Sidebar from '../components/sideBar';
import AddLogModal from '../components/addLogModal';
import { useAuthContext } from '../context/authContext';

function MovieSearch() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const { user } = useAuthContext();

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

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

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
      };

    return (
        <div>
            <Sidebar />
                <nav>
                    <Link to="/">Buscar Películas</Link>
                    <Link to="/watchlist">Ver Más Tarde</Link>
                    <Link to="/logs">Mis Logs</Link>
                </nav>
            <div>
                <input 
                    value={query} 
                    onChange={handleInputChange} 
                    placeholder="Buscar películas..." 
                />
            </div>
            <div>
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <MovieCard 
                            key={movie.id} 
                            movie={movie} 
                            onAddToWatchlist={handleAddToWatchlist}
                            onAddLog={() => handleOpenModal(movie)} 
                        />
                    ))
                ) : (
                    hasSearched && <p>No se encontraron películas</p>
                )}
            </div>
            {selectedMovie && (
                <AddLogModal
                movie={selectedMovie}
                open={openModal}
                onClose={handleCloseModal}/>
            )}
        </div>
    );
}

export default MovieSearch;