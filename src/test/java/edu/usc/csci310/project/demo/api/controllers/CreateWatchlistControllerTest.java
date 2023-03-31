package edu.usc.csci310.project.demo.api.controllers;

import edu.usc.csci310.project.demo.api.requests.CreateWatchlistRequest;
import edu.usc.csci310.project.demo.api.responses.CreateWatchlistResponse;
import org.json.JSONException;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class CreateWatchlistControllerTest {
    CreateWatchlistController createWatchlistController = new CreateWatchlistController();

    @Test
    void verifyCreateWatchlistAlreadyExists() throws JSONException {
        CreateWatchlistRequest request = new CreateWatchlistRequest();
        request.setUserID("6423e5633b51581fb8d36210");
        request.setWatchlist("existing watchlist");
        request.setType("Private");

        ResponseEntity<CreateWatchlistResponse> returnedResponse = createWatchlistController.createWatchlist(request);

        assertNotNull(returnedResponse.getBody());
        assertEquals(returnedResponse.getBody().getData(), "Watchlist already exists");

    }

    @Test
    void verifyUserDoesNotExist() throws JSONException {
        CreateWatchlistRequest request = new CreateWatchlistRequest();
        request.setUserID("6423e5633b51581d36210");
        request.setWatchlist("existing watchlist");
        request.setType("Private");

        ResponseEntity<CreateWatchlistResponse> returnedResponse = createWatchlistController.createWatchlist(request);

        assertNotNull(returnedResponse.getBody());
        assertEquals(returnedResponse.getBody().getData(), "User does not exist");

    }

    @Test
    void verifyCreateWatchlist() throws JSONException {
        CreateWatchlistRequest request = new CreateWatchlistRequest();
        request.setUserID("6423e5633b51581fb8d36210");

        // create watchlist
        // choose a Character random from this String
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                + "0123456789"
                + "abcdefghijklmnopqrstuvxyz";

        // create StringBuffer size of AlphaNumericString
        StringBuilder randomWatchlist = new StringBuilder(5);

        for (int i = 0; i < 7; i++) {

            // generate a random number between
            // 0 to AlphaNumericString variable length
            int index
                    = (int) (AlphaNumericString.length()
                    * Math.random());

            // add Character one by one in end of sb
            randomWatchlist.append(AlphaNumericString
                    .charAt(index));
        }

        request.setWatchlist(randomWatchlist.toString());
        request.setType("Private");

        ResponseEntity<CreateWatchlistResponse> returnedResponse = createWatchlistController.createWatchlist(request);

        assertNotNull(returnedResponse.getBody());
        assertEquals(returnedResponse.getBody().getData(), "Success");
    }
}
