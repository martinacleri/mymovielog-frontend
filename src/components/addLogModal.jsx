import { Button, Modal, Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import React, { useState } from 'react';
import { addLog} from '../services/tmdbService';
import { useAuthContext } from '../context/authContext';

function AddLogModal({movie, open, onClose}) {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState('');
    const { user } = useAuthContext();
  
    const handleSubmit = async () => {
      if (user) {
        await addLog(movie, review, rating);
        alert('Log añadido exitosamente');
        onClose();
      } else {
        alert('Por favor, inicia sesión para añadir un log.')
      }
    };
  
    return (
      <Modal open={open} onClose={onClose}>
        <Box sx={{width: 400, bgcolor: 'background.paper', p: 4, m: 'auto', mt: '10%', borderRadius: 2}}>
          <Typography variant="h6" component="h2" gutterBottom>
            Añadir Log para {movie.title}
          </Typography>
          <TextField
            label="Reseña"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={review}
            onChange={(e) => setReview(e.target.value)}
            sx={{mb: 2}}/>
          <FormControl fullWidth sx={{mb:2}}>
            <InputLabel>Calificación</InputLabel>
            <Select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              label="Calificación">
              {[1,2,3,4,5].map((rate) => (
                <MenuItem key={rate} value={rate}>{rate}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
            Guardar Log
          </Button>
        </Box>
      </Modal>
    );
  }

export default AddLogModal;