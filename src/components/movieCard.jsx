import { Box, Button, Typography } from "@mui/material";
import React from "react";

function MovieCard({ movie, onAddToWatchlist, onAddLog, onPosterClick }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "background.paper",
        borderRadius: "8px",
        p: 2,
      }}
    >

      <Typography variant="h6" sx={{ color: "text.primary", mb: 1 }}>
        {movie.title}
      </Typography>

      <img
        src={
          movie.poster_path
            ? 'https://image.tmdb.org/t/p/w200/${movie.poster_path}'
            : 'https://via.placeholder.com/200x300?text=Sin+Imagen'
        }
        alt={movie.title}
        style={{
          borderRadius: "8px",
          marginBottom: "1rem",
          width: "100%",
          cursor: "pointer",
        }}
        onClick={() => onPosterClick(movie)}
      />

      <Typography
        variant="body2"
        sx={{ color: "text.secondary", mb: 1, fontStyle: "italic" }}
      >
        {movie.genre || "Género desconocido"}
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontSize: "12px", mb: 2 }}
      >
        Fecha de estreno: {movie.release_date || "No disponible"}
      </Typography>

      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}
      >
        <Button variant="contained" color="primary" onClick={() => onAddLog(movie)}>
          Añadir Log
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onAddToWatchlist(movie)}
        >
          Ver Más Tarde
        </Button>
      </Box>
    </Box>
  );
}

export default MovieCard;