import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container, Paper, Alert } from '@mui/material';

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            navigate('/home');
        } else {
            setError('Credenciales incorrectas. Inténtalo de nuevo.');
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
                    Inicia Sesión
                </Typography>
                <Typography 
                    variant="body1" 
                    gutterBottom 
                    sx={{ color: 'text.secondary', textAlign: 'center', mb: 3 }}
                >
                    Accede a tu cuenta y comienza a registrar tus películas favoritas.
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <Box 
                    component="form" 
                    onSubmit={handleLogin} 
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
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
                        Iniciar Sesión
                    </Button>
                </Box>
                <Typography 
                    variant="body2" 
                    sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}
                >
                    ¿No tienes una cuenta?{' '}
                    <Button 
                        onClick={() => navigate('/register')} 
                        variant="text" 
                        sx={{ color: 'primary.main', fontWeight: 600 }}
                    >
                        Regístrate
                    </Button>
                </Typography>
            </Paper>
        </Container>
    );
};

export default LoginPage;
