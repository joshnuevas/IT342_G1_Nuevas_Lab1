package com.it342.backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    @GetMapping("/me")
    public String me() {
        return "Protected user info";
    }
}
