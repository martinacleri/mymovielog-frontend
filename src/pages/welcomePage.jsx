import React from 'react';
import { useNavigate } from 'react-router-dom';


function WelcomePage() {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div>
            <h1>Bienvenido a MyMovieLog</h1>
            <p>
                MyMovieLog te permite registrar y valorar las películas que has visto.
                Explora películas populares, guarda las que quieras ver más tarde y lleva un registro de todas tus reseñas y valoraciones.
            </p>
            <div>
                <button onClick={handleRegister}>Registrarse</button>
                <button onClick={handleLogin}>Iniciar Sesión</button>
            </div>
        </div>
    );
}

export default WelcomePage;