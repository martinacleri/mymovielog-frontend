// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#8E2DE2', // Morado vibrante
        },
        secondary: {
            main: '#4A00E0', // Azul oscuro
        },
        background: {
            default: '#0D0D0D', // Fondo negro puro
            paper: '#1C1C1C', // Contenedores ligeramente más claros
        },
        text: {
            primary: '#FFFFFF', // Texto blanco
            secondary: '#A6A6A6', // Gris claro
        },
    },
    typography: {
        fontFamily: 'Poppins', // Fuente minimalista y moderna
        h1: {
            fontSize: '3.2rem',
            fontWeight: 800,
            color: '#8E2DE2', // Morado vibrante
        },
        h3: {
            fontSize: '1.6rem',
            fontWeight: 600,
            color: '#FFFFFF',
        },
        body1: {
            fontSize: '1rem',
            color: '#A6A6A6',
        },
        button: {
            fontWeight: 700,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '25px', // Más redondeado
                    padding: '10px 30px', 
                    textTransform: 'none',
                },
                containedPrimary: {
                    background: 'linear-gradient(45deg, #8E2DE2, #4A00E0)', // Gradiente de morado a azul
                    color: '#FFFFFF',
                },
                outlinedPrimary: {
                    borderColor: '#8E2DE2',
                    color: '#8E2DE2',
                },
            },
        },
    },
});

export default theme;