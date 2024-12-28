package com.example.demo.Services;

import com.example.demo.Configs.TmdbApiKey;
import com.example.demo.Models.AccountDetails;
import com.example.demo.Models.CMovie;
import com.example.demo.Models.SubscriptionType;
import com.example.demo.Models.Watchlist;
import com.example.demo.Repositories.AccountRepository;
import info.movito.themoviedbapi.TmdbApi;
import info.movito.themoviedbapi.tools.TmdbException;
import info.movito.themoviedbapi.tools.appendtoresponse.MovieAppendToResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class AccountService {
    private final TmdbApi api;
    @Autowired
    private AccountRepository accountRepository;

    public AccountService(TmdbApiKey apiKey) {
        this.api = new TmdbApi(apiKey.apiKey());
    }

    public AccountDetails getAccountByUsername(String username) {
        return accountRepository.findByUsername(username);
    }

    @Transactional
    public AccountDetails addAccount(String username, String email) {
        if(accountRepository.existsByUsernameAndEmail(username, email)) {
            throw new IllegalArgumentException("Account already exists");
        }
        AccountDetails account = new AccountDetails(username, email);
        return accountRepository.save(account);
    }

    @Transactional
    public AccountDetails addWatchlist(String username, Watchlist watchlist) throws IllegalArgumentException {
        if (accountRepository.existsByUsernameAndWatchlists_Name(username, watchlist.getName())) {
            throw new IllegalArgumentException("Watchlist name must be unique.");
        }

        AccountDetails account = accountRepository.findByUsername(username);
        account.getWatchlists().add(watchlist);
        return accountRepository.save(account);
    }

    @Transactional
    public AccountDetails deleteWatchlist(String username, String watchlistName) {
        AccountDetails account = accountRepository.findByUsername(username);
        account.getWatchlists().removeIf(watchlist -> watchlist.getName().equals(watchlistName));
        return accountRepository.save(account);
    }

    @Transactional
    public AccountDetails addMovieToWatchlist(String username, String watchlistName, int id) throws TmdbException {
        AccountDetails account = accountRepository.findByUsername(username);
        CMovie movie = CMovie.convertMovieDbToMovie(api.getMovies().getDetails(id, null, MovieAppendToResponse.VIDEOS));
        for (Watchlist watchlist : account.getWatchlists()) {
            if (watchlist.getName().equals(watchlistName)) {
                watchlist.getMovies().add(movie);
                break;
            }
        }
        return accountRepository.save(account);
    }

    @Transactional
    public AccountDetails deleteMovieFromWatchlist(String username, String watchlistName, int id) {
        AccountDetails account = accountRepository.findByUsername(username);
        for (Watchlist watchlist : account.getWatchlists()) {
            if (watchlist.getName().equals(watchlistName)) {
                watchlist.getMovies().removeIf(m -> m.getId() == id);
                break;
            }
        }
        return accountRepository.save(account);
    }

    @Transactional
    public AccountDetails updateSubscriptionStatusToPaid(String username) {
        AccountDetails account = accountRepository.findByUsername(username);
        account.setSubscriptionType(SubscriptionType.PAID);
        return accountRepository.save(account);
    }

    @Transactional
    public AccountDetails cancelPaidSubscription(String username) {
        AccountDetails account = accountRepository.findByUsername(username);
        account.setSubscriptionType(SubscriptionType.FREE);
        account.getWatchlists().clear();
        return accountRepository.save(account);
    }
}
