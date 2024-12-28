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
public class MovieService {

    private final TmdbApi api;

    public MovieService(TmdbApiKey apiKey) {
        this.api = new TmdbApi(apiKey.apiKey());
    }

    @Async
    public CompletableFuture<CMovie> fetchMovieById(int id) throws TmdbException {
        return CompletableFuture.completedFuture(CMovie.convertMovieDbToMovie(api.getMovies().getDetails(id, "en-US", MovieAppendToResponse.VIDEOS)));
    }

    @Async
    public CompletableFuture<List<CMovie>> fetchSimilarMovies(int id, int page) throws TmdbException {
        List<Movie> similarMoviesApi = api.getMovies().getSimilar(id, "en-US", page).getResults();
        List<CMovie> similarMovies = new ArrayList<>();

        for (Movie movie : similarMoviesApi) {
            MovieDb movieDetails = api.getMovies().getDetails(movie.getId(), "en-US", MovieAppendToResponse.VIDEOS);
            similarMovies.add(CMovie.convertMovieDbToMovie(movieDetails));
        }
        return CompletableFuture.completedFuture(similarMovies);
    }
}
