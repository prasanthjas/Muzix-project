package com.example.demo.Services;

import com.example.demo.Exceptions.EmailAlreadyExistingException;
import com.example.demo.Exceptions.EmailIdNotFoundException;
import com.example.demo.Models.User;

import java.util.Optional;

public interface UserService {
    User addUser(User user) throws EmailAlreadyExistingException;

    User loginUser(String email, String password) throws EmailIdNotFoundException;

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String username);

    User changeUserProfilePicture(String email, String filename);

    User changePassword(String email, String password);
}
