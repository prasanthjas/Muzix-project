import React, { useEffect, useState } from 'react';
import HeroSection from '../Components/HeroSection';
import ScrollableList from '../Components/ScrollableList';
import axios from 'axios';
import { useAuth } from '../Components/AuthContext';

function HomePage() {
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [error, setError] = useState(null);
    const { currentUser, authToken, isPaidPlan } = useAuth();
    const loginStatus = !!authToken;
    
      useEffect(() => {
        const getMovies = async () => {
          const result = await fetchMoviesForHomePage();
          if (result) {
            setUpcomingMovies(result.upcomingMovies)
            setNowPlayingMovies(result.nowPlayingMovies)
            setTopRatedMovies(result.topRatedMovies)
            setPopularMovies(result.popularMovies)
          } else {
            setError('Failed to fetch movies.');
          }
        };
    
        getMovies();
      }, []);

    return (
        <div>
        <HeroSection loginStatus={loginStatus} movies={topRatedMovies}/>
        <ScrollableList header= "Top Rated" route={"top-rated"} movies={topRatedMovies} />
        <ScrollableList header= "Upcoming" route={"upcoming"} movies={upcomingMovies} />
        {isPaidPlan && (<ScrollableList header= "Popular" route={"popular"} movies={popularMovies} />)}
        <ScrollableList header= "Now Playing" route={"now-playing"} movies={nowPlayingMovies} />
        </div>
    )
};


async function fetchMoviesForHomePage() {
  try {
    const response = await axios.get('http://localhost:8081/home');
    if (response.status === 200) {
      const packets = response.data.categoryPackets;

      if (!Array.isArray(packets) || packets.length === 0) {
        throw new Error('No category packets found in response.');
      }

      const nowPlayingMovies = [];
      const upcomingMovies = [];
      const popularMovies = [];
      const topRatedMovies = [];

      packets.forEach(packet => {
        if (packet.movies && Array.isArray(packet.movies)) {
          switch (packet.category) {
            case 'NOW_PLAYING':
              nowPlayingMovies.push(...packet.movies);
              break;
            case 'UPCOMING':
              upcomingMovies.push(...packet.movies);
              break;
            case 'POPULAR':
              popularMovies.push(...packet.movies);
              break;
            case 'TOP_RATED':
              topRatedMovies.push(...packet.movies);
              break;
            default:
              console.warn('Unknown category:', packet.category);
          }
        } else {
          console.warn('Movies not found or not an array in packet:', packet);
        }
      });

      return {
        nowPlayingMovies,
        upcomingMovies,
        popularMovies,
        topRatedMovies,
      };
    } else {
      throw new Error(`Failed to fetch data. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    return null; 
  }
}




export default HomePage;