package edu.usc.csci310.project.demo.api.controllers;

import edu.usc.csci310.project.demo.api.requests.GetWatchlistRequest;
import edu.usc.csci310.project.demo.api.responses.GetWatchlistResponse;
import org.json.JSONException;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertNotNull;

public class GetWatchlistControllerTest {
    GetWatchlistController getWatchlistController = new GetWatchlistController();

    @Test
    void verifyGetWatchlist() throws JSONException {
        GetWatchlistRequest request = new GetWatchlistRequest();
        request.setUserID("6423e5633b51581fb8d36210");

        ResponseEntity<GetWatchlistResponse> returnedResponse = getWatchlistController.handleGetWatchlist(request);

        assertNotNull(returnedResponse.getBody());
        // JSONObject json = new JSONObject(returnedResponse.getBody().getData());
        System.out.println(returnedResponse.getBody().getData());
    }
}
