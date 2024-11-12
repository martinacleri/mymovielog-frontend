import axios from "axios";
const API_KEY = 'REACT_APP_TMDB_API_KEY';
const BASE_URL = 'https://api.themoviedb.org/3';

// Función para obtener los géneros
export const getGenres = async () => {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const data = await response.json();
  return data.genres; // Devuelve un array de objetos con id y nombre del género
};

export const searchMovies = async (query) => {
  const genres = await getGenres();
  const genreMap = {};
  genres.forEach(genre => {
    genreMap[genre.id] = genre.name;
  });

  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  const data = await response.json();

  const moviesWithGenres = data.results.map(movie => ({
    ...movie,
    genre: movie.genre_ids.map(id => genreMap[id]).join(', ')
  }));

  return { results: moviesWithGenres };
};

// Función para obtener las películas populares junto con sus géneros
export const getPopularMovies = async () => {
  const genres = await getGenres();

  const genreMap = {};
  genres.forEach(genre => {
    genreMap[genre.id] = genre.name;
  });

  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();

  const moviesWithGenres = data.results.map(movie => ({
    id: movie.id,
    title: movie.title,
    releaseDate: movie.release_date,
    poster: movie.poster_path,
    synopsis: movie.overview,
    genre: movie.genre_ids.map(id => genreMap[id]).join(', ')
  }));

  return { results: moviesWithGenres };
};

export const addToWatchlist = async (movie) => {
  const token = localStorage.getItem('authToken');

  if(!token) {
    throw new Error("Token de autenticación no encontrado. Por favor, inicia sesión.");
  }

  const response = await axios.post(`http://localhost:3000/api/movies/${movie.id}/addToWatchlist`, {movie},
  {headers: {Authorization: `Bearer ${token}`}});
  return response.data;
};