import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MovieList from './MovieList';
import { Typography, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; 
import { useAuth } from './AuthContext';

const UserWatchlist = ({account}) => {
  const [watchlists, setWatchlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authToken } = useAuth()

  useEffect(() => {
    if (account && account.watchlists) {
      setWatchlists(account.watchlists);
      setLoading(false);
    }
  }, [account]);

  const handleDeleteWatchlist = async (watchlistName) => {
    try {
      await axios.get(`http://localhost:8081/account/delete-watchlist`, {
        params: { username: account.username, watchlistName },
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      setWatchlists((prevWatchlists) =>
        prevWatchlists.filter((watchlist) => watchlist.name !== watchlistName)
      );

      console.log(`Watchlist ${watchlistName} deleted`);
    } catch (error) {
      console.error('Error deleting watchlist:', error);
    }
  };

  const handleDeleteMovie = async (watchlistName, movieId) => {
    if (!account) return;

    try {
      await axios.get(`http://localhost:8081/account/delete-movie`, {
        params: { username: account.username, watchlistname: watchlistName, id: movieId },
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      setWatchlists((prevWatchlists) =>
        prevWatchlists.map((watchlist) => {
          if (watchlist.name === watchlistName) {
            return {
              ...watchlist,
              movies: watchlist.movies.filter((movie) => movie.id !== movieId),
            };
          }
          return watchlist;
        })
      );
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };


  return (
    <div style={{ padding: '10px', color: 'white', minHeight: '100vh' }}>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        watchlists.map((watchlist) => (
          <Paper key={watchlist.name} style={{ marginBottom: '10px', padding: '5px', backgroundColor: '#1c1b1b', minWidth: '75vw' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" style={{ color: 'white', margin: '0 0 10px 0' }}>
                {watchlist.name}
              </Typography>

              <IconButton
                onClick={() => handleDeleteWatchlist(watchlist.name)}
                style={{ color: 'white' }}
              >
                <DeleteIcon />
              </IconButton>
            </div>

            <Typography>
              <MovieList movies={watchlist.movies} loading={loading} onDelete={(movieId) => handleDeleteMovie(watchlist.name, movieId)}
                  showDelete={true} />
            </Typography>
          </Paper>
        ))
      )}
    </div>
  );
};

export default UserWatchlist;