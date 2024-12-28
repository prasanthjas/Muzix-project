package com.example.demo.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@Service
public class DataAppService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${dataApp.add-account}")
    private String dataAppAddAccountUrl;

    @Value("${dataApp.register}")
    private String dataAppRegisterUrl;

    @Value("${dataApp.deregister}")
    private String dataAppDeRegisterUrl;

    public void registerSession(Map<String, String> jwtToken) {
        sendTokenToDataApp(jwtToken, dataAppRegisterUrl);
    }

    public void deregisterSession(Map<String, String> jwtToken) {
        sendTokenToDataApp(jwtToken, dataAppDeRegisterUrl);
    }

    private void sendTokenToDataApp(Map<String, String> jwtToken, String url) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, String>> request = new HttpEntity<>(jwtToken, headers);

            restTemplate.postForEntity(url, request, String.class);
            System.out.println("Token sent to external app.");
        } catch (Exception e) {
            System.out.println("Failed to send token to external app: " + e.getMessage());
        }
    }

    public void createNewAccountOnDataApp(String username, String email) {
        String url = UriComponentsBuilder.fromHttpUrl(dataAppAddAccountUrl)
                .queryParam("username", username)
                .queryParam("email", email)
                .toUriString();

        String response = restTemplate.getForObject(url, String.class);
    }
}
