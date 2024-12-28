package com.example.demo.Controllers;

import com.example.demo.Models.CMovie;
import com.example.demo.Requests.GenreFilterRequest;
import com.example.demo.Services.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/search")
@CrossOrigin(originPatterns = "*")
public class SearchController {

    @Autowired
    private SearchService searchService;

    @GetMapping
    public ResponseEntity<List<CMovie>> searchForMovie(@RequestParam(value = "query") String query,
                                                       @RequestParam(value = "page", defaultValue = "1") int page,
                                                       @RequestParam(value = "language", defaultValue = "en-US", required = false) String language,
                                                       @RequestParam(value = "year", required = false) String year) throws Exception {
        CompletableFuture<List<CMovie>> movies = searchService.searchForMovie(query, page, language, year);
        CompletableFuture.allOf(movies).join();

        return ResponseEntity.ok(movies.get());
    }

    @PostMapping("/genres")
    public ResponseEntity<List<CMovie>> searchByGenres(@RequestBody GenreFilterRequest genreFilterRequest) throws Exception {
        String query = genreFilterRequest.getQuery();
        List<Integer> genres = genreFilterRequest.getGenres();
        Boolean orQuery = genreFilterRequest.getOrQuery();
        int page = genreFilterRequest.getPageNumber();

        CompletableFuture<List<CMovie>> movies = searchService.searchByGenre(query, genres, orQuery, page);
        CompletableFuture.allOf(movies).join();
        System.out.println(movies.get());

        return ResponseEntity.ok(movies.get());
    }

    @GetMapping("/genre/{id}")
    public ResponseEntity<List<CMovie>> searchForGenre(@PathVariable("id") int id, @RequestParam("page") int page) throws Exception {
        List<Integer> genre = new ArrayList<>();
        genre.add(id);

        CompletableFuture<List<CMovie>> movies = searchService.searchByGenre("",genre, false, page);
        CompletableFuture.allOf(movies).join();

        return ResponseEntity.ok(movies.get());
    }
}
