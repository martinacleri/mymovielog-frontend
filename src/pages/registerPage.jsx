import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/users/newUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            if (response.ok) {
                console.log("Registro exitoso");
                navigate('/login');
            } else {
                console.error("Error en el registro");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };

    return (
        <Container 
            maxWidth="sm" 
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: 'background.default',
            }}
        >
            <Paper 
                elevation={6} 
                sx={{
                    p: 4,
                    backgroundColor: 'background.paper',
                    borderRadius: 3,
                }}
            >
                <Typography 
                    variant="h4" 
                    gutterBottom 
                    sx={{ color: 'primary.main', fontWeight: 700, textAlign: 'center' }}
                >
                    ¡Regístrate en MyMovieLog!
                </Typography>
                <Typography 
                    variant="body1" 
                    gutterBottom 
                    sx={{ color: 'text.secondary', textAlign: 'center', mb: 3 }}
                >
                    Lleva un registro de tus películas favoritas y descubre más.
                </Typography>
                <Box 
                    component="form" 
                    onSubmit={handleRegister} 
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <TextField
                        label="Nombre de Usuario"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        InputLabelProps={{ style: { color: 'text.secondary' } }}
                    />
                    <TextField
                        label="Correo Electrónico"
                        type="email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        InputLabelProps={{ style: { color: 'text.secondary' } }}
                    />
                    <TextField
                        label="Contraseña"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        InputLabelProps={{ style: { color: 'text.secondary' } }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                            borderRadius: '25px',
                            padding: '10px',
                            fontWeight: 'bold',
                            background: 'linear-gradient(45deg, #8E2DE2, #4A00E0)',
                        }}
                    >
                        Registrarse
                    </Button>
                </Box>
                <Typography 
                    variant="body2" 
                    sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}
                >
                    ¿Ya tienes una cuenta?{' '}
                    <Button 
                        onClick={() => navigate('/login')} 
                        variant="text" 
                        sx={{ color: 'primary.main', fontWeight: 600 }}
                    >
                        Inicia Sesión
                    </Button>
                </Typography>
            </Paper>
        </Container>
    );
}

export default RegisterPage;
