import React, { useState } from 'react';
import MovieList from './MovieList';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ScrollableList = ({route, header, movies}) => { 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ padding: '10px', textAlign: 'left', backgroundColor: "#141414"}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: 'white', margin: '0 0 10px 0' }}>
          {header}
        </h2>
        <Button 
          variant="contained" 
          onClick={() => navigate(`/${route}`)} 
          style={{ backgroundColor: '#f50057', color: 'white' }} 
        >
          More
        </Button>
      </div>
      <MovieList movies={movies} loading={loading} />
    </div>
  );
};

export default ScrollableList; 
