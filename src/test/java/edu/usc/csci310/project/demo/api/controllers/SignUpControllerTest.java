package edu.usc.csci310.project.demo.api.controllers;

import edu.usc.csci310.project.demo.api.requests.SignUpRequest;
import edu.usc.csci310.project.demo.api.responses.SignUpResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class SignUpControllerTest {
    SignUpController signUpController = new SignUpController();

    @Test
    void verifySignUpWithExistingUser() {
        SignUpRequest request = new SignUpRequest();
        request.setFirstName("tommy");
        request.setLastName("trojan");
        request.setUsername("tommyTrojan");
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
        StringBuilder randomUsername = new StringBuilder(7);

        for (int i = 0; i < 7; i++) {

            // generate a random number between
            // 0 to AlphaNumericString variable length
            int index
                    = (int)(AlphaNumericString.length()
                    * Math.random());

            // add Character one by one in end of sb
            randomUsername.append(AlphaNumericString
                    .charAt(index));
        }

        request.setUsername(String.valueOf(randomUsername));
        request.setPassword("Password123");

        ResponseEntity<SignUpResponse> returnedResponse = signUpController.checkSignUp(request);

        assertNotNull(returnedResponse.getBody());
    }

    @Test
    void verifySignUpGetters() {
        SignUpRequest request = new SignUpRequest();
        String firstName = "first_name";
        String lastName = "last_name";
        String userName = "username";
        String password = "password";

        request.setFirstName(firstName);
        request.setLastName(lastName);
        request.setUsername(userName);
        request.setPassword(password);


        assertEquals(request.getFirstName(), firstName);
        assertEquals(request.getLastName(), lastName);
        assertEquals(request.getUsername(), userName);
        assertEquals(request.getPassword(), password);

    }

}
