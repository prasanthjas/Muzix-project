import React, { useEffect, useState } from 'react';
import MovieCard from '../Components/MovieCard'; 
import { Button } from '@mui/material';
import fetchMovieList from '../Components/MovieListFetcher';
import getPageDetails from '../Components/PageType';

const ListPage = ({pagetype, genre, genreName}) => { 
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const pageDetails = pagetype ? getPageDetails(pagetype) : null;

  const fetchMovies = async(pageNumber) => {
    try {
      let response;
      if (pagetype) {
        response = await fetchMovieList(pageDetails.url, pageNumber);
      } else if (genre) {
        response = await fetchMovieList(`http://localhost:8081/search/genre/${genre}`, pageNumber);
      }
      console.log(response.data)
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (genre || pagetype) {
      fetchMovies(page);  
    }
  }, [page, genre, pagetype]); 
  

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div style={{ backgroundColor: '#141414', minHeight: '100vh'}}>
    <div style={{ padding: '12px', marginLeft:'3cm', marginRight:'3cm', backgroundColor: "#141414"}}>
      {pageDetails ? <h1 style={{ color: 'white' }}>{pageDetails.header}</h1> : <h1 style={{ color: 'white' }}>{genreName}</h1>} 
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '25px'
        }}>
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          variant="contained" 
          onClick={handlePreviousPage} 
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button 
          variant="contained" 
          onClick={handleNextPage} 
          disabled={page === 100}
        >
          Next
        </Button>
      </div>
    </div>
    </div>
  );
};

export default ListPage; 



