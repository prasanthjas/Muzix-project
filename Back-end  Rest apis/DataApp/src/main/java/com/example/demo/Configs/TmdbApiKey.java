package com.example.demo.Configs;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("tmdb")
public record TmdbApiKey(String apiKey) {
}
