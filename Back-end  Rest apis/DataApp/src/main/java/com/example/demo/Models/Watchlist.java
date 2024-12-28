package com.example.demo.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Watchlist {
    private String name;
    private List<CMovie> movies;

    public Watchlist(String name) {
        this.name = name;
        this.movies = new ArrayList<>();
    }
}
