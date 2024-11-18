import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';

function WelcomePage() {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 5 }}>
            {/* Título llamativo */}
            <Typography variant="h1" gutterBottom>
                MyMovieLog
            </Typography>

            {/* Descripción */}
            <Typography variant="body1" gutterBottom>
                Guarda y valora tus películas favoritas. Explora tendencias, crea listas y lleva tu propio registro personal.
            </Typography>

            {/* Botones */}
            <Box mt={4}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleRegister} 
                    sx={{ mx: 2 }}
                >
                    Registrarse
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleLogin} 
                    sx={{ mx: 2 }}
                >
                    Iniciar Sesión
                </Button>
            </Box>
        </Container>
    );
}

export default WelcomePage;
