package com.example.demo.Controllers;

import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Getter
@RestController
@RequestMapping("/session")
@CrossOrigin(originPatterns = "*")
public class SessionController {
    private final Set<String> tokenStore = new HashSet<>();

    @PostMapping("/register")
    public ResponseEntity<String> registerSession(@RequestBody Map<String, String> tokenPayload) {
        String token = tokenPayload.get("token");
        if (token != null && !token.isEmpty()) {
            tokenStore.add(token);
            return ResponseEntity.ok("Token registered successfully");
        }
        return ResponseEntity.badRequest().body("Invalid token");
    }

    @PostMapping("/deregister")
    public ResponseEntity<String> deregisterSession(@RequestBody Map<String, String> tokenPayload) {
        String token = tokenPayload.get("token");
        if (token != null && !token.isEmpty()) {
            tokenStore.remove(token);
            System.out.println("Token deregistered");
            return ResponseEntity.ok("Token deregistered successfully");
        }
        return ResponseEntity.badRequest().body("Invalid token");
    }

}