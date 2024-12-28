package com.example.demo.Services;

import com.example.demo.Exceptions.EmailAlreadyExistingException;
import com.example.demo.Exceptions.EmailIdNotFoundException;
import com.example.demo.Models.User;
import com.example.demo.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Value("${upload.directory}")
    private String profileDirectory;

    @Override
    public User addUser(User user) throws EmailAlreadyExistingException {
        if (userRepository.findByEmail(user.getEmail()).isEmpty()) {
            return userRepository.save(user);
        } else {
            throw new EmailAlreadyExistingException();
        }
    }

    @Override
    public User loginUser(String email, String password) throws EmailIdNotFoundException {
        return userRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password))
                .orElseThrow(EmailIdNotFoundException::new);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User changeUserProfilePicture(String email, String filename) {
        Optional<User> user = userRepository.findByEmail(email);
        User existingUser = user.get();
        String oldFilename = existingUser.getProfileImageFileName();
        if (oldFilename != null && !oldFilename.isEmpty()) {
            Path oldFilePath = Paths.get(profileDirectory, oldFilename);
            try {
                Files.deleteIfExists(oldFilePath);
            } catch (IOException e) {
                throw new RuntimeException("Failed to delete old profile image", e);
            }
        }
        existingUser.setProfileImageFileName(filename);
        return userRepository.save(existingUser);
    }

    @Override
    public User changePassword(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        User existingUser = user.get();
        existingUser.setPassword(password);
        return userRepository.save(existingUser);
    }

}


