import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useAuthContext } from '../context/authContext';
import { addLog } from '../services/tmdbService';
  
  function AddLogModal({ movie, open, onClose }) {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState('');
    const { user } = useAuthContext();
  
    const handleSubmit = async () => {
      if (user) {
        await addLog(movie, review, rating);
        alert('Log añadido exitosamente');
        onClose();
      } else {
        alert('Por favor, inicia sesión para añadir un log.');
      }
    };
  
    return (
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            width: 600,
            bgcolor: 'background.paper',
            p: 4,
            m: 'auto',
            mt: '10%',
            borderRadius: 2,
            boxShadow: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h6" component="h2" sx={{ color: 'text.primary', textAlign: 'center' }}>
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
            sx={{
              '& .MuiInputBase-root': { color: 'text.primary' },
              '& .MuiInputLabel-root': { color: 'text.secondary' },
            }}
          />
  
          <FormControl fullWidth>
            <InputLabel sx={{ color: 'text.secondary' }}>Valoración</InputLabel>
            <Select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              label="Valoración"
              sx={{
                '& .MuiInputBase-root': { color: 'text.primary' },
              }}
            >
              {[1, 2, 3, 4, 5].map((rate) => (
                <MenuItem key={rate} value={rate}>
                  {rate}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
  
          <Box sx={{ display: 'flex', justifyContent: 'center'}}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
            >
              Guardar Log
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  }
  
  export default AddLogModal;