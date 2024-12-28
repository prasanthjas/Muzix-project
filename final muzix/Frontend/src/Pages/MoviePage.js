import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, IconButton } from '@mui/material';
import MovieDetails from '../Components/MovieDetails';
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; 
import AddIcon from '@mui/icons-material/Add';
import './MovieView.css'; 
import ScrollableList from '../Components/ScrollableList';
import WatchlistPopup from '../Components/WatchlistPopup';
import { useAuth } from '../Components/AuthContext';

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [SimilarMovies, setSimilarMovies] = useState([])
  const [isPaidPlan, setIsPaidPlan] = useState(false); 
  const { currentUser, authToken } = useAuth();

  const fetchAccountDetails = async (username) => {
     try {
      const response = await axios.get(`http://localhost:8081/account`, {
        params: { username },
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      
      if(response.data.subscriptionType === "PAID") {
        setIsPaidPlan(true)
      }} catch (err) {
        console.log("not logged in")
      }
  };

  useEffect(() => {
    if (currentUser) {
      fetchAccountDetails(currentUser.username);
    }
  }, [currentUser]);
  

  
  const fetchSimilarMovies = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/movie/${id}/similar?page=1`);
      setSimilarMovies(response.data); 
    } catch (error) {
      console.error('Error fetching similar movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/movie/${id}`);
      console.log('Fetched movie details:', response.data);
      setMovie(response.data.movie);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  useEffect(() => {
    fetchSimilarMovies();
  })

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  };

  const handleCloseVideo = () => {
    setIsPlaying(false);
  
  };

  const onYouTubeIframeAPIReady = () => {
    const trailerId = movie?.trailers[0]; 
    console.log('Trailer ID:', trailerId); 
    if (trailerId) {
      const newPlayer = new window.YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: trailerId,
        playerVars: {
          autoplay: 1,
          controls: 1,
        },
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              handleCloseVideo();
            }
          },
        },
      });
      setPlayer(newPlayer);
    }
  };

  useEffect(() => {
    if (isPlaying && window.YT) {
      onYouTubeIframeAPIReady();
    }
  }, [isPlaying, movie]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>No movie details available.</div>;
  }

  return (
    <div className="movie-view">
      <div
        className="hero-section"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.posterPath})`,
        }}
      >
        <div className="overlay">
          {isPlaying ? (
            <div className="video-container">
              <button className="close-video" onClick={handleCloseVideo}>X</button>
              <div id="youtube-player"></div>
            </div>
          ) : (
            <>
              <Typography variant="h2" component="h1">{movie.original_title}</Typography>
              <div className="info-box">
                <Typography variant="body2" className="info-item">
                  ⭐ {movie.vote_average}
                </Typography>
                <span className="dot">• </span>
                    <div className="genres">
                      {movie.genres.map((genre, index) => (
                            <span key={index} className="genre-item">
                             {genre}
                           </span>
                         ))}
                  </div>
              </div>

              <Typography variant="h6">{movie.tagline}</Typography>
              <Typography variant="body1" className="description">{movie.overview}</Typography>
              
              <div className="action-buttons">
                <IconButton 
                  className="play-button"
                  onClick={handlePlayClick} 
                  sx={{ color: 'white', '&:hover': { color: '#f50057' } }} 
                >
                  <PlayArrowIcon fontSize="large" />
                </IconButton>
                {isPaidPlan && (<IconButton 
                  className="add-button"
                  onClick={() => setPopupOpen(true)} 
                  sx={{ color: 'white', '&:hover': { color: '#f50057' } }} 
                >
                  <AddIcon fontSize="large" />
                </IconButton>)}
              </div>
              
              <Typography 
                variant="body1" 
                className="more-details"
                onClick={handleOpen} 
                style={{ cursor: 'pointer' }} 
              >
                More Details
              </Typography>
            </>
          )}
        </div>
      </div>
      <MovieDetails open={open} onClose={handleClose} movie={movie} />
      <ScrollableList header={"Similar"} movies={SimilarMovies}/>
      <WatchlistPopup open={popupOpen} onClose={() => setPopupOpen(false)} movieId={id}/>
    </div>
  );
};

export default MoviePage;
