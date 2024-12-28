package com.example.demo.Services;

import com.example.demo.Configs.TmdbApiKey;
import com.example.demo.Models.CMovie;
import info.movito.themoviedbapi.TmdbApi;
import info.movito.themoviedbapi.model.core.Movie;
import info.movito.themoviedbapi.model.movies.MovieDb;
import info.movito.themoviedbapi.tools.appendtoresponse.MovieAppendToResponse;
import info.movito.themoviedbapi.tools.builders.discover.DiscoverMovieParamBuilder;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class SearchService {

    private final TmdbApi api;

    public SearchService(TmdbApiKey apiKey) {
        this.api = new TmdbApi(apiKey.apiKey());
    }

    @Async
    public CompletableFuture<List<CMovie>> searchForMovie(String query, int page, String language, String year) throws Exception {
        List<Movie> movieResultsApi = api.getSearch().searchMovie(query, true, language, null, page, null, year).getResults();
        List<CMovie> movieResults = new ArrayList<>();

        for (Movie movie : movieResultsApi) {
            MovieDb movieDetails = api.getMovies().getDetails(movie.getId(), null, MovieAppendToResponse.VIDEOS);
            movieResults.add(CMovie.convertMovieDbToMovie(movieDetails));
        }
        return CompletableFuture.completedFuture(movieResults);
    }

    @Async
    public CompletableFuture<List<CMovie>> searchByGenre(String query,List<Integer> genres, Boolean orQuery, int page) throws Exception {
        DiscoverMovieParamBuilder paramBuilder = new DiscoverMovieParamBuilder();
        paramBuilder.withGenres(genres, orQuery).page(page);

        List<Movie> movieResultsApi = api.getDiscover().getMovie(paramBuilder).getResults();
        List<CMovie> movieResults = new ArrayList<>();

        for (Movie movie : movieResultsApi) {
            MovieDb movieDetails = api.getMovies().getDetails(movie.getId(), null, MovieAppendToResponse.VIDEOS);
            movieResults.add(CMovie.convertMovieDbToMovie(movieDetails));
        }
        return CompletableFuture.completedFuture(movieResults);
    }

}
