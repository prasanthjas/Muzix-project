package com.example.demo.Requests;

import info.movito.themoviedbapi.model.core.Genre;
import info.movito.themoviedbapi.model.core.Language;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConfigRequest {
    List<Genre> genres;
    List<Language> languages;
}
