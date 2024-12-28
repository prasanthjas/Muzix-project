import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton, Typography } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; 
import SignUpModal from './SignUpModal';
import { useAuth } from './AuthContext';

function HeroSection({loginStatus, movies}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;
  
  const [arrowColor, setArrowColor] = useState('white');
  const navigate = useNavigate(); 


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentSlide((currentSlide + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
  };

  const handleSlideClick = (id) => {
    navigate(`/movie/${id}`); 
  };

  return (
    <div style={{ position: 'relative', height: '600px', overflow: 'hidden' }}>
      
      {movies.length > 0 && movies.map((movie, index) => (
        <div 
          key={movie.id}
          onClick={() => handleSlideClick(movie.id)} 
          style={{
            height: '100%',
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdropPath})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            width: '100%',
            display: currentSlide === index ? 'block' : 'none', 
            cursor: 'pointer', 
            transition: 'transform 0.3s ease', 
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'; 
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'; 
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            zIndex: 1,
          }}></div>

          <div style={{
            position: 'absolute',
            top: '65%',  
            left: '5%', 
            width: '40%', 
            transform: 'translateY(-50%)',  
            color: 'white', 
            padding: '20px',
            maxWidth: '500px',  
            zIndex: 2 
          }}>
            <Typography variant="h4" component="h2" style={{ color: 'white' }}>{movie.original_title}</Typography>
            <Typography variant="h6" style={{ color: 'white' }}>{movie.tagline}</Typography>
            <Typography variant="body1" style={{ color: 'white' }}>{movie.overview}

              <Typography variant="body2" style={{ color: 'red', marginTop: '10px', cursor: 'pointer' }} 
                onClick={() => handleSlideClick(movie.id)}> More Details
              </Typography>

            </Typography>
            

            <div className="action-buttons" style={{ marginTop: '10px' }}>
            </div>
          </div>
        </div>
      ))}

      {!loginStatus && (
  <div style={{
      position: 'absolute',
      top: '50px',
      right: '40px',
      color: 'white',
      padding: '10px',
      borderRadius: '8px',
      textAlign: 'right',
    }}>
      <h2 style={{ margin: 0 }}>Unlimited movies, TV shows, and more.</h2><br/>
      <h1 style={{margin:1}}>Stream movies online</h1>
      <Typography style={{margin:'10px 30px 0 0'}}>
        <SignUpModal />  
      </Typography>
  </div>
)}


      <IconButton 
        onClick={handlePrev} 
        style={{ 
          position: 'absolute', 
          left: '10px', 
          top: '50%', 
          transform: 'translateY(-50%)',
          color: arrowColor,
        }}
        onMouseEnter={() => setArrowColor('yellow')} 
        onMouseLeave={() => setArrowColor('white')} 
      >
        <ArrowBack />
      </IconButton>
      <IconButton 
        onClick={handleNext} 
        style={{ 
          position: 'absolute', 
          right: '10px', 
          top: '50%', 
          transform: 'translateY(-50%)',
          color: arrowColor,
        }}
        onMouseEnter={() => setArrowColor('yellow')}
        onMouseLeave={() => setArrowColor('white')} 
      >
        <ArrowForward />
      </IconButton>

      <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex' }}>
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div
            key={index}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: currentSlide === index ? 'white' : 'gray',
              margin: '0 5px',
              cursor: 'pointer', 
              transition: 'background-color 0.3s', 
            }}
            onClick={() => setCurrentSlide(index)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'lightgray'; 
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = currentSlide === index ? 'white' : 'gray'; 
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
