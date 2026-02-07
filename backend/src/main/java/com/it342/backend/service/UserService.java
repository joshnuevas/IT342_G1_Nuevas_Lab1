package com.it342.backend.service;

import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.it342.backend.dto.LoginRequest;
import com.it342.backend.dto.RegisterRequest;
import com.it342.backend.model.User;
import com.it342.backend.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepo;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepo,
                       BCryptPasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public String register(RegisterRequest request) {

        if (userRepo.findByEmail(request.email).isPresent()) {
            return "Email already exists";
        }

        User user = new User();
        user.setUsername(request.username);
        user.setEmail(request.email);
        user.setPassword(passwordEncoder.encode(request.password));
        user.setPhone(request.phone);
        user.setAddress(request.address);

        userRepo.save(user);
        return "User registered successfully";
    }

    public String login(LoginRequest request) {

        Optional<User> existing = userRepo.findByEmail(request.email);
        if (existing.isEmpty()) return "User not found";

        if (passwordEncoder.matches(request.password, existing.get().getPassword())) {
            return "Login successful";
        }
        return "Invalid credentials";
    }
}
