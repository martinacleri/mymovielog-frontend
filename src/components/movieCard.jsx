import React from 'react';

function MovieCard({ movie, onReview }) {
    return (
        <div>
            <img 
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} 
                alt={movie.title} 
            />
            <div>
                <h4>{movie.title}</h4>
                <p>{movie.genre || "Género desconocido"}</p>
                <p>{movie.release_date}</p>
                <button onClick={() => onReview(movie)}>
                    Reseñar
                </button>
            </div>
        </div>
    );
}

export default MovieCard;