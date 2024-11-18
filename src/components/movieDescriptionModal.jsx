import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';

function MovieDescriptionModal({ movie, open, onClose }) {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >

                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
                    Sinopsis de {movie.title}
                </Typography>

                <Typography variant="body1" sx={{ mb: 4 }}>
                    {movie.overview || 'No hay descripción disponible.'}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                    <Button
                        onClick={onClose}
                        variant="contained"
                        color="primary"
                    >
                        Cerrar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default MovieDescriptionModal;