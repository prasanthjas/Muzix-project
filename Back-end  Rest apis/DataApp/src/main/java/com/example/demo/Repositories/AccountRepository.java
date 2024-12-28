package com.example.demo.Repositories;

import com.example.demo.Models.AccountDetails;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends MongoRepository<AccountDetails, String> {
    AccountDetails findByUsername(String username);
    boolean existsByUsernameAndEmail(String username, String email);
    boolean existsByUsernameAndWatchlists_Name(String username, String watchlistName);
}
