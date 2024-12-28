import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../Components/MovieCard';
import { Button, CircularProgress } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { movieName } = useParams();
  const [searchParams] = useSearchParams();

  const selectedYear = searchParams.get('year');
  const selectedGenres = searchParams.get('genres') ? searchParams.get('genres').split(',').map(Number) : [];
  const orquery = searchParams.get("orQuery");

  const fetchSearchedMovies = async (pageNumber) => {
    try {
      let response;

      if (selectedGenres.length > 0) {
        const requestBody = {
          query: movieName,
          genres: selectedGenres,
          orQuery: orquery, 
          pageNumber: pageNumber,
        };

        console.log("Fetching with genres:", requestBody);
        response = await axios.post('http://localhost:8081/search/genres', requestBody);

      } else {
        const params = {
          query: movieName,
          page: pageNumber,
        };

        if (selectedYear) {
          params.year = selectedYear;
        }

        console.log("Fetching without genres:", params);
        response = await axios.get('http://localhost:8081/search', { params });
      }

      setMovies(response.data);
      setTotalPages(Math.ceil(response.data.length / 20)); // Adjust if necessary

    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchSearchedMovies(page);
  }, [page, movieName, selectedYear]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div style={{ backgroundColor: '#141414' }}>
      <div style={{ padding: '12px', marginLeft: '3cm', marginRight: '3cm', minHeight: '72vh' }}>
        <h1 style={{ color: 'white' }}>
          Showing results for "{movieName}"
          {selectedYear && ` in ${selectedYear}`}
        </h1>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <CircularProgress />
          </div>
        ) : movies.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '25px',
            }}
          >
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div style={{ color: 'white' }}>No movies found for "{movieName}"</div>
        )}

        {movies.length > 0 && (
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" onClick={handlePreviousPage} disabled={page === 1}>
              Previous
            </Button>
            <Button variant="contained" onClick={handleNextPage} disabled={page === totalPages}>
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
