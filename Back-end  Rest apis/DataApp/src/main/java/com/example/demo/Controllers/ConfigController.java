package com.example.demo.Controllers;

import com.example.demo.Requests.ConfigRequest;
import com.example.demo.Services.TmdbconfigService;
import info.movito.themoviedbapi.model.core.Genre;
import info.movito.themoviedbapi.model.core.Language;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("config")
@CrossOrigin(originPatterns = "*")
public class ConfigController {

    @Autowired
    private TmdbconfigService configService;

    @GetMapping
    public ResponseEntity<ConfigRequest> getConfig() throws Exception {
        CompletableFuture<List<Genre>> genres = configService.getGenres();
        CompletableFuture<List<Language>> languages = configService.getLanguages();
        CompletableFuture.allOf(genres, languages).join();

        ConfigRequest config = new ConfigRequest(genres.get(), languages.get());

        return ResponseEntity.ok(config);
    }
}
