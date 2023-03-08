package edu.usc.csci310.project.demo.api.controllers;

import edu.usc.csci310.project.demo.api.requests.LogInRequest;
import edu.usc.csci310.project.demo.api.responses.LogInResponse;
import java.time.Instant;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
public class LogInController {
    @PostMapping
    public ResponseEntity<LogInResponse> checkLogIn(@RequestBody LogInRequest request) {
        LogInResponse response = new LogInResponse();
        response.setData("Username: " + request.getEmail() + " Password: " + request.getPassword() + " - Received at " + Instant.now() + ".");
        System.out.println("Email is " + request.getEmail());
        System.out.println("Password is " + request.getPassword());
        return ResponseEntity.ok().body(response);
    }
}
