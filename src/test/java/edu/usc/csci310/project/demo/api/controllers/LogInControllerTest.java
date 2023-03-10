package edu.usc.csci310.project.demo.api.controllers;

import edu.usc.csci310.project.demo.api.requests.LogInRequest;
import edu.usc.csci310.project.demo.api.responses.LogInResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class LogInControllerTest {
    LogInController logInController = new LogInController();

    @Test
    void verifyLogIn() {
        LogInRequest request = new LogInRequest();
        request.setEmail("tommytrojan@usc.edu");
        request.setPassword("Password123");

        ResponseEntity<LogInResponse> returnedResponse = logInController.checkLogIn(request);

        assertNotNull(returnedResponse.getBody());
        assertTrue(returnedResponse.getBody().getData().startsWith("Valid"));
    }

    @Test
    void verifyIncorrectPassword() {
        LogInRequest request = new LogInRequest();
        request.setEmail("tommytrojan@usc.edu");
        request.setPassword("Password");

        ResponseEntity<LogInResponse> returnedResponse = logInController.checkLogIn(request);

        assertNotNull(returnedResponse.getBody());
        assertTrue(returnedResponse.getBody().getData().startsWith("Password does not match"));
    }
    @Test
    void verifyAccountExists() {
        LogInRequest request = new LogInRequest();
        request.setEmail("tommytroj@usc.edu");
        request.setPassword("Password");

        ResponseEntity<LogInResponse> returnedResponse = logInController.checkLogIn(request);

        assertNotNull(returnedResponse.getBody());
        assertTrue(returnedResponse.getBody().getData().startsWith("Email not found"));
    }
}
