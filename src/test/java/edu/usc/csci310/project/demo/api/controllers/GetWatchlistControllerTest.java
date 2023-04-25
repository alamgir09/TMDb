package edu.usc.csci310.project.demo.api.controllers;

import edu.usc.csci310.project.demo.api.requests.GetWatchlistRequest;
import edu.usc.csci310.project.demo.api.responses.GetWatchlistResponse;
import org.json.JSONException;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class GetWatchlistControllerTest {
    GetWatchlistController getWatchlistController = new GetWatchlistController();

    @Test
    void verifyGetWatchlist() throws JSONException {
        GetWatchlistRequest request = new GetWatchlistRequest();
        request.setUserID("642617a23405041b9f616538");

        ResponseEntity<GetWatchlistResponse> returnedResponse = getWatchlistController.handleGetWatchlist(request);

        assertNotNull(returnedResponse.getBody());
        System.out.println(returnedResponse.getBody().getData());
    }

    @Test
    void verifyNoWatchlist() {
        GetWatchlistRequest request = new GetWatchlistRequest();
        request.setUserID("6423e5633b515818d36210");

        ResponseEntity<GetWatchlistResponse> returnedResponse = getWatchlistController.handleGetWatchlist(request);

        assertEquals("No results found.", returnedResponse.getBody().getData());

        System.out.println(returnedResponse.getBody().getData());
    }
}
