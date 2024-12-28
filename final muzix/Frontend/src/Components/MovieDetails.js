import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Typography } from '@mui/material';
import { Slide } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const MovieDetails = ({ open, onClose, movie }) => {
  if (!movie) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      TransitionComponent={Transition}
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          position: 'absolute',
          right: 0,
          top: '2cm',
          bottom: '2cm',
          height: '40%',
          margin: 0,
        },
      }}
      hideBackdrop
    >
      <DialogTitle>
        <Typography variant="h4">{movie.title}</Typography>
        <Button onClick={onClose} style={{ position: 'absolute', right: 16, top: 16, color: '#f50057' }}>
          X
        </Button>
      </DialogTitle>
      <DialogContent>
        <table style={{ width: '100%', color: 'white' }}>
          <tbody>
            <tr>
              <td><strong>Release Date:</strong></td>
              <td>{movie.release_date}</td>
            </tr>
            <tr>
              <td><strong>Rating:</strong></td>
              <td>{movie.vote_average}</td>
            </tr>
            <tr>
              <td><strong>Overview:</strong></td>
              <td>{movie.overview}</td>
            </tr>
          </tbody>
        </table>
      </DialogContent>
    </Dialog>
  );
};

export default MovieDetails;
