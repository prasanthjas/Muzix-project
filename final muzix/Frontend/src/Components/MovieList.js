import React, { useRef, useState } from 'react';
import MovieCard from './MovieCard';
import { IconButton } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';

function MovieList({ movies, loading, onDelete}) {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef(null);
  const containerHeight = onDelete ? '150px' : '300px';

  const scroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '10px',
        height: containerHeight,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          height: '100%',
          paddingRight: '10px',
          scrollbarWidth: 'none',
          '-ms-overflow-style': 'none',
        }}
      >
        {movies.length > 0 ? (
          movies.map(movie => (
            <div key={movie.id} style={{ marginRight: '10px' }}>
              <MovieCard movie={movie} {...(onDelete ? { onDelete } : {})} /> 
            </div>
          ))
        ) : (
          <div>No movies available.</div>
        )}
        {loading && <div style={{ marginRight: '10px' }}>Loading...</div>}
      </div>

      {isHovered && movies.length > 0 && (
        <>
          <IconButton
            onClick={() => scroll(-300)}
            style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
          >
            <ArrowBack />
          </IconButton>
          <IconButton
            onClick={() => scroll(300)}
            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
          >
            <ArrowForward />
          </IconButton>
        </>
      )}
    </div>
  );
}

export default MovieList;
