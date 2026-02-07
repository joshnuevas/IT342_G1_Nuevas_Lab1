package com.it342.backend.controller;

import com.it342.backend.model.User;
import com.it342.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public String register(@RequestBody User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
        return "User registered successfully";
    }

    @PostMapping("/login")
    public String login(@RequestBody User user){
        Optional<User> existing = userRepo.findByEmail(user.getEmail());
        if(existing.isEmpty()) return "User not found";

        if(passwordEncoder.matches(user.getPassword(), existing.get().getPassword())){
            return "Login successful";
        } else {
            return "Invalid credentials";
        }
    }
}
