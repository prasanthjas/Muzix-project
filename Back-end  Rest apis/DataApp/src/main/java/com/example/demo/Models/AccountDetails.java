package com.example.demo.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "Accounts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountDetails {
    @Id
    private String username;
    private String email;
    private List<Watchlist> watchlists;
    private SubscriptionType subscriptionType;

    public AccountDetails(String username, String email) {
        this.username = username;
        this.email = email;
        this.watchlists = new ArrayList<>();
        this.subscriptionType = SubscriptionType.FREE;
    }
}
