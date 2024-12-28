import axios from 'axios';

async function fetchMovieList(url, pageNumber) {   
    try {
        const response = await axios.get(url, {
          params: { page: pageNumber }, 
        });
       return response;
    } catch (error) {
            console.error('Error fetching now playing movies:', error); 
    } 
}

export default fetchMovieList;