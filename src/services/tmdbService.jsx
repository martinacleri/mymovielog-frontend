import axios from "axios";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Función para obtener los géneros
export const getGenres = async () => {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`);
  const data = await response.json();
  return data.genres; // Devuelve un array de objetos con id y nombre del género
};

export const searchMovies = async (query) => {
  const genres = await getGenres();
  const genreMap = {};
  genres.forEach(genre => {
    genreMap[genre.id] = genre.name;
  });

  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=es-ES`);
  const data = await response.json();

  const moviesWithGenres = data.results.map(movie => ({
    ...movie,
    genre: movie.genre_ids.map(id => genreMap[id]).join(', '),
    genre_ids: movie.genre_ids
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

  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES`);
  const data = await response.json();

  const moviesWithGenres = data.results.map(movie => ({
    id: movie.id,
    title: movie.title,
    releaseDate: movie.release_date,
    poster: movie.poster_path,
    synopsis: movie.overview,
    genre: movie.genre_ids.map(id => genreMap[id]).join(', '),
    genre_ids: movie.genre_ids
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

export const addLog = async (movie, review, rating) => {
  const token = localStorage.getItem('authToken');

  if(!token) {
    throw new Error("Token de autenticación no encontrado. Por favor, inicia sesión.");
  }

  const response = await axios.post(`http://localhost:3000/api/movies/${movie.id}/addLog`, {movie, review, rating},
  {headers: {Authorization: `Bearer ${token}`}});
  return response.data;
};

export const getWatchlist = async (genreId = '') => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    throw new Error("Token de autenticación no encontrado. Por favor, inicia sesión.");
  }

  const response = await axios.get(`http://localhost:3000/api/watchlists/getWatchlist`, {
    headers: {Authorization: `Bearer ${token}`},
    params: {genreId},
  });

  return response.data;
};

export const getDBGenres = async() => {
  const token = localStorage.getItem('authToken');
  const response = await axios.get(`http://localhost:3000/api/genres/getGenres`, {
    headers: {Authorization: `Bearer ${token}`},
  });
  return response.data;
};

export const getLogs = async (genreId = '') => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    throw new Error("Token de autenticación no encontrado. Por favor, inicia sesión.");
  }

  const response = await axios.get(`http://localhost:3000/api/logs/getLogs`, {
    headers: {Authorization: `Bearer ${token}`},
    params: {genreId},
  });

  return response.data;
}

export const removeFromWatchlist = async (movieId) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error("Token de autenticación no encontrado. Por favor, inicia sesión.");
  }

  const response = await axios.delete(`http://localhost:3000/api/watchlists/removeFromWatchlist`, {
    headers: {Authorization: `Bearer ${token}`},
    data: {movieId},
  });

  return response.data;
}

export const deleteLog = async (logId) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error("Token de autenticación no encontrado. Por favor, inicia sesión.");
  }

  const response = await axios.delete(`http://localhost:3000/api/logs/deleteLog`, {
    headers: {Authorization: `Bearer ${token}`},
    data: {logId},
  });

  return response.data;
}