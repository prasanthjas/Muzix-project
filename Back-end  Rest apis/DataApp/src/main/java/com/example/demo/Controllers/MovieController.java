package com.example.demo.Controllers;

import com.example.demo.Models.CMovie;
import com.example.demo.Requests.MovieResponse;
import com.example.demo.Services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;


@RestController
@RequestMapping("/movie")
@CrossOrigin(originPatterns = "*")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/{id}")
    public ResponseEntity<MovieResponse> getMovieDetails(@PathVariable("id") int id) throws Exception {
        CompletableFuture<CMovie> movie = movieService.fetchMovieById(id);
        CompletableFuture<List<CMovie>> similarMovies = movieService.fetchSimilarMovies(id, 1);
        CompletableFuture.allOf(movie, similarMovies).join();

        CMovie movieDetails = movie.get();
        List<CMovie> similarMoviesList = similarMovies.get();

        if (movieDetails == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok(new MovieResponse(movieDetails, similarMoviesList));
    }

    @GetMapping("/{id}/similar")
    public ResponseEntity<List<CMovie>> getMoreSimilarMovies(@PathVariable("id") int id, @RequestParam("page") int page) throws Exception {
        CompletableFuture<List<CMovie>> similarMovies = movieService.fetchSimilarMovies(id, page);
        CompletableFuture.allOf(similarMovies).join();

        List<CMovie> similarMoviesList = similarMovies.get();
        if (similarMoviesList == null || similarMoviesList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok(similarMoviesList);
    }
}

