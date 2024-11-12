import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MovieCard from '../components/movieCard';
import { searchMovies } from '../services/tmdbService';
import Sidebar from '../components/sideBar';

function MovieSearch() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const navigate = useNavigate();

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

    const handleReview = (movie) => {
        navigate(`/review/${movie.id}`);
    };

    return (
        <div>
            <Sidebar />
                <nav>
                    <Link to="/">Buscar Películas</Link>
                    <Link to="/watchlist">Ver Más Tarde</Link>
                    <Link to="/viewed">Mis Logs</Link>
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
                            onReview={handleReview} 
                        />
                    ))
                ) : (
                    hasSearched && <p>No se encontraron películas</p>
                )}
            </div>
        </div>
    );
}

export default MovieSearch;