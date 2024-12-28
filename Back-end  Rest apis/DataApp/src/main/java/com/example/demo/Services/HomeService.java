package com.example.demo.Services;

import com.example.demo.Configs.TmdbApiKey;
import com.example.demo.Models.CMovie;
import info.movito.themoviedbapi.TmdbApi;
import info.movito.themoviedbapi.model.core.Movie;
import info.movito.themoviedbapi.model.movies.MovieDb;
import info.movito.themoviedbapi.tools.TmdbException;
import info.movito.themoviedbapi.tools.appendtoresponse.MovieAppendToResponse;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class HomeService {

    private final TmdbApi api;

    public HomeService(TmdbApiKey apiKey) {
        this.api = new TmdbApi(apiKey.apiKey());
    }

    @Async
    public CompletableFuture<List<CMovie>> fetchUpcoming(int page) throws TmdbException {
        List<Movie> upcomingApi = api.getMovieLists().getUpcoming(null, page, null).getResults();
        List<CMovie> upcomingMovies = new ArrayList<>();

        for (Movie movie : upcomingApi) {
            MovieDb movieDetails = api.getMovies().getDetails(movie.getId(), "en-US", MovieAppendToResponse.VIDEOS);
            upcomingMovies.add(CMovie.convertMovieDbToMovie(movieDetails));
        }

        return CompletableFuture.completedFuture(upcomingMovies);
    }

    @Async
    public CompletableFuture<List<CMovie>> fetchPopular(int page) throws TmdbException {
        List<Movie> popularApi = api.getMovieLists().getPopular(null, page, null).getResults();
        List<CMovie> popularMovies = new ArrayList<>();

        for (Movie movie : popularApi) {
            MovieDb movieDetails = api.getMovies().getDetails(movie.getId(), "en-US", MovieAppendToResponse.VIDEOS);
            popularMovies.add(CMovie.convertMovieDbToMovie(movieDetails));
        }

        return CompletableFuture.completedFuture(popularMovies);
    }

    @Async
    public CompletableFuture<List<CMovie>> fetchTopRated(int page) throws TmdbException {
        List<Movie> topRatedApi = api.getMovieLists().getTopRated(null, page, null).getResults();
        List<CMovie> topRatedMovies = new ArrayList<>();

        for (Movie movie : topRatedApi) {
            MovieDb movieDetails = api.getMovies().getDetails(movie.getId(), "en-US", MovieAppendToResponse.VIDEOS);
            topRatedMovies.add(CMovie.convertMovieDbToMovie(movieDetails));
        }

        return CompletableFuture.completedFuture(topRatedMovies);
    }

    @Async
    public CompletableFuture<List<CMovie>> fetchNowPlaying(int page) throws TmdbException {
        List<Movie> nowPlayingApi = api.getMovieLists().getTopRated(null, page, null).getResults();
        List<CMovie> nowPlayingMovies = new ArrayList<>();

        for (Movie movie : nowPlayingApi) {
            MovieDb movieDetails = api.getMovies().getDetails(movie.getId(), "en-US", MovieAppendToResponse.VIDEOS);
            nowPlayingMovies.add(CMovie.convertMovieDbToMovie(movieDetails));
        }

        return CompletableFuture.completedFuture(nowPlayingMovies);
    }
}
