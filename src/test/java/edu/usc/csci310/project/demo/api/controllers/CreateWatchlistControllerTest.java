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
        request.setUserID("641e53712027c440ac7d9edc");
        request.setWatchlist("sad movies2");
        request.setType("public");

        ResponseEntity<CreateWatchlistResponse> returnedResponse = createWatchlistController.createWatchlist(request);

        assertNotNull(returnedResponse.getBody());
        assertEquals(returnedResponse.getBody().getData(), "Watchlist already exists");

    }

    @Test
    void verifyCreateWatchlist() throws JSONException {
        CreateWatchlistRequest request = new CreateWatchlistRequest();
        request.setUserID("641e53712027c440ac7d9edc");

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
        request.setType("public");

        ResponseEntity<CreateWatchlistResponse> returnedResponse = createWatchlistController.createWatchlist(request);

        assertNotNull(returnedResponse.getBody());
        assertEquals(returnedResponse.getBody().getData(), "Success");
    }
}
