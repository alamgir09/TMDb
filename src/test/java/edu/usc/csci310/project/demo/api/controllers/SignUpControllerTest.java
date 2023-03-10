package edu.usc.csci310.project.demo.api.controllers;

import edu.usc.csci310.project.demo.api.requests.SignUpRequest;
import edu.usc.csci310.project.demo.api.responses.SignUpResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class SignUpControllerTest {
    SignUpController signUpController = new SignUpController();

    @Test
    void verifySignUpWithExistingUser() {
        SignUpRequest request = new SignUpRequest();
        request.setFirstName("tommy");
        request.setLastName("trojan");
        request.setEmail("tommytrojan@usc.edu");
        request.setPassword("Password123");

        ResponseEntity<SignUpResponse> returnedResponse = signUpController.checkSignUp(request);

        assertNotNull(returnedResponse.getBody());
        assertTrue(returnedResponse.getBody().getData().startsWith("User already exists"));
    }

    @Test
    void verifySignUp(){
        SignUpRequest request = new SignUpRequest();
        request.setFirstName("test");
        request.setLastName("testing");
        // create random email
        // choose a Character random from this String
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                + "0123456789"
                + "abcdefghijklmnopqrstuvxyz";

        // create StringBuffer size of AlphaNumericString
        StringBuilder randomEmail = new StringBuilder(7);

        for (int i = 0; i < 7; i++) {

            // generate a random number between
            // 0 to AlphaNumericString variable length
            int index
                    = (int)(AlphaNumericString.length()
                    * Math.random());

            // add Character one by one in end of sb
            randomEmail.append(AlphaNumericString
                    .charAt(index));
        }

        randomEmail.append("@usc.edu");

        request.setEmail(String.valueOf(randomEmail));
        request.setPassword("Password123");

        ResponseEntity<SignUpResponse> returnedResponse = signUpController.checkSignUp(request);

        assertNotNull(returnedResponse.getBody());
        assertTrue(returnedResponse.getBody().getData().startsWith("Success"));
    }

}
