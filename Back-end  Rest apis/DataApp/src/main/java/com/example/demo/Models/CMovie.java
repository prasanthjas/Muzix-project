package com.example.demo.Models;

import info.movito.themoviedbapi.model.core.Genre;
import info.movito.themoviedbapi.model.core.ProductionCountry;
import info.movito.themoviedbapi.model.core.video.Video;
import info.movito.themoviedbapi.model.movies.MovieDb;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CMovie {
    private int id;
    private String backdropPath;
    private List<String> genres;
    private List<String> trailers;
    private List<String> countries;
    private String original_language;
    private String original_title;
    private String overview;
    private String release_date;
    private int runtime;
    private double vote_average;
    private String status;
    private String posterPath;

    public static CMovie convertMovieDbToMovie(MovieDb movieDb) {
        CMovie movie = new CMovie();
        movie.setId(movieDb.getId());
        movie.setBackdropPath(movieDb.getBackdropPath());

        List<Genre> genres = movieDb.getGenres();
        List<String> genres_str = new ArrayList<>();

        for (Genre genre : genres) {
            genres_str.add(genre.getName());
        }

        movie.setGenres(genres_str);

        List<Video> videos = movieDb.getVideos().getResults();
        List<String> trailers = new ArrayList<>();

        for (Video video : videos) {
            if (video.getType().equals("Trailer") && video.getSite().equals("YouTube") && video.getOfficial()) {
                trailers.add(video.getKey());
            }
        }

        movie.setTrailers(trailers);

        List<ProductionCountry> prodCountries = movieDb.getProductionCountries();
        List<String> countries = new ArrayList<>();

        for (ProductionCountry country : prodCountries) {
            countries.add(country.getName());
        }

        movie.setCountries(countries);

        movie.setOriginal_language(movieDb.getOriginalLanguage());
        movie.setOriginal_title(movieDb.getOriginalTitle());
        movie.setOverview(movieDb.getOverview());
        movie.setRelease_date(movieDb.getReleaseDate());
        movie.setRuntime(movieDb.getRuntime());
        movie.setVote_average(movieDb.getVoteAverage());
        movie.setStatus(movieDb.getStatus());
        movie.setPosterPath(movieDb.getPosterPath());

        return movie;
    }
}

