package com.example.demo.Services;

import com.example.demo.Configs.TmdbApiKey;
import info.movito.themoviedbapi.TmdbApi;
import info.movito.themoviedbapi.model.core.Genre;
import info.movito.themoviedbapi.model.core.Language;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class TmdbconfigService {

    private final TmdbApi api;

    public TmdbconfigService(TmdbApiKey apiKey) {
        this.api = new TmdbApi(apiKey.apiKey());

    }

    @Async
    public CompletableFuture<List<Genre>> getGenres() throws Exception {
        List<Genre> genres = api.getGenre().getMovieList(null);
        return CompletableFuture.completedFuture(genres);
    }

    @Async
    public CompletableFuture<List<Language>> getLanguages() throws Exception {
        List<Language> languages = api.getConfiguration().getLanguages();
        return CompletableFuture.completedFuture(languages);
    }
}
