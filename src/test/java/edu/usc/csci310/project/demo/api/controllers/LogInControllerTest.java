package edu.usc.csci310.project.demo.api.controllers;

import edu.usc.csci310.project.demo.api.requests.LogInRequest;
import edu.usc.csci310.project.demo.api.responses.LogInResponse;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import java.security.NoSuchAlgorithmException;

import static org.junit.jupiter.api.Assertions.*;

public class LogInControllerTest {
    LogInController logInController = new LogInController();

    @Test
    void verifyLogIn() throws JSONException, NoSuchAlgorithmException {
        LogInRequest request = new LogInRequest();
        request.setUsername("tommyTrojan");
        request.setPassword("Password123");

        ResponseEntity<LogInResponse> returnedResponse = logInController.checkLogIn(request);

        assertNotNull(returnedResponse.getBody());
        JSONObject json = new JSONObject(returnedResponse.getBody().getData());
        assertEquals(json.get("Type"), "Success");
    }

    @Test
    void verifyIncorrectPassword() throws JSONException, NoSuchAlgorithmException {
        LogInRequest request = new LogInRequest();
        request.setUsername("tommyTrojan");
        request.setPassword("Password");

        ResponseEntity<LogInResponse> returnedResponse = logInController.checkLogIn(request);

        assertNotNull(returnedResponse.getBody());
        JSONObject json = new JSONObject(returnedResponse.getBody().getData());
        assertEquals(json.get("Type"), "Error");
        assertEquals(json.get("Message"), "Password does not match");
    }
    @Test
    void verifyAccountExists() throws JSONException, NoSuchAlgorithmException {
        LogInRequest request = new LogInRequest();
        request.setUsername("tommytroj@usc.edu");
        request.setPassword("Password");

        ResponseEntity<LogInResponse> returnedResponse = logInController.checkLogIn(request);

        assertNotNull(returnedResponse.getBody());
        JSONObject json = new JSONObject(returnedResponse.getBody().getData());
        assertEquals(json.get("Type"), "Error");
        assertEquals(json.get("Message"), "Username not found");
    }
}
