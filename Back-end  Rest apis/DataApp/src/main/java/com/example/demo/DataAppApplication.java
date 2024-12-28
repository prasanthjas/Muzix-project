package com.example.demo;

import com.example.demo.Configs.TmdbApiKey;
import info.movito.themoviedbapi.tools.TmdbException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;


@SpringBootApplication
@EnableConfigurationProperties(TmdbApiKey.class)
public class DataAppApplication {

    public static void main(String[] args) throws TmdbException {
        SpringApplication.run(DataAppApplication.class, args);
    }

}
