package com.example.demo.Controllers;

import com.example.demo.Models.CMovie;
import com.example.demo.Requests.HomeCategory;
import com.example.demo.Requests.HomeCategoryPacket;
import com.example.demo.Requests.HomeResponse;
import com.example.demo.Services.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/home")
@CrossOrigin(originPatterns = "*")
public class HomeController {

    @Autowired
    private HomeService homeService;

    @GetMapping
    public ResponseEntity<HomeResponse> getMoviesForHomePage() throws Exception {
        CompletableFuture<List<CMovie>> upcomingMovies = homeService.fetchUpcoming(1);
        CompletableFuture<List<CMovie>> nowPlayingMovies = homeService.fetchNowPlaying(1);
        CompletableFuture<List<CMovie>> popularMovies = homeService.fetchPopular(1);
        CompletableFuture<List<CMovie>> topRatedMovies = homeService.fetchTopRated(1);

        CompletableFuture.allOf(upcomingMovies, nowPlayingMovies, popularMovies, topRatedMovies).join();

        HomeCategoryPacket nowPlaying = new HomeCategoryPacket(HomeCategory.NOW_PLAYING, nowPlayingMovies.get());
        HomeCategoryPacket upcoming = new HomeCategoryPacket(HomeCategory.UPCOMING, upcomingMovies.get());
        HomeCategoryPacket popular = new HomeCategoryPacket(HomeCategory.POPULAR, popularMovies.get());
        HomeCategoryPacket topRated = new HomeCategoryPacket(HomeCategory.TOP_RATED, topRatedMovies.get());

        List<HomeCategoryPacket> packets = new ArrayList<>();
        packets.add(nowPlaying);
        packets.add(upcoming);
        packets.add(popular);
        packets.add(topRated);

        return ResponseEntity.ok(new HomeResponse(packets));
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<CMovie>> getUpcomingMovies(@RequestParam(value = "page") int page) throws Exception {
        CompletableFuture<List<CMovie>> upcomingMovies = homeService.fetchUpcoming(page);
        CompletableFuture.allOf(upcomingMovies).join();
        return ResponseEntity.ok(upcomingMovies.get());
    }

    @GetMapping("/top-rated")
    public ResponseEntity<List<CMovie>> getTopRated(@RequestParam(value = "page") int page) throws Exception {
        CompletableFuture<List<CMovie>> topRatedMovies = homeService.fetchTopRated(page);
        CompletableFuture.allOf(topRatedMovies).join();
        return ResponseEntity.ok(topRatedMovies.get());
    }

    @GetMapping("/popular")
    public ResponseEntity<List<CMovie>> getPopular(@RequestParam(value = "page") int page) throws Exception {
        CompletableFuture<List<CMovie>> popularMovies = homeService.fetchPopular(page);
        CompletableFuture.allOf(popularMovies).join();
        return ResponseEntity.ok(popularMovies.get());
    }

    @GetMapping("/now-playing")
    public ResponseEntity<List<CMovie>> getNowPlaying(@RequestParam(value = "page") int page) throws Exception {
        CompletableFuture<List<CMovie>> nowPlayingMovies = homeService.fetchNowPlaying(page);
        CompletableFuture.allOf(nowPlayingMovies).join();
        return ResponseEntity.ok(nowPlayingMovies.get());
    }
}


