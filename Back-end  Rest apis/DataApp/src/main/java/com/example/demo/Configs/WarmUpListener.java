package com.example.demo.Configs;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class WarmUpListener {

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady() {
        RestTemplate restTemplate = new RestTemplate();
        try {
            restTemplate.getForObject("http://localhost:8081/home", String.class);
            System.out.println("Warm-up request completed");
        } catch (Exception e) {
            System.err.println("Warm-up failed: " + e.getMessage());
        }
    }
}

