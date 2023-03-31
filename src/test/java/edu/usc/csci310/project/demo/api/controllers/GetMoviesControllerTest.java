package edu.usc.csci310.project.demo.api.controllers;

import edu.usc.csci310.project.demo.api.requests.GetMoviesRequest;
import edu.usc.csci310.project.demo.api.responses.GetMoviesResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class GetMoviesControllerTest {
    GetMoviesController getMoviesController = new GetMoviesController();

    @Test
    void verifyGetMovies() {
        GetMoviesRequest request = new GetMoviesRequest();
        request.setUserID("6423e5633b51581fb8d36210");
        request.setWatchlist("watchlist 1");

        ResponseEntity<GetMoviesResponse> returnedResponse = getMoviesController.handleGetMovies(request);

        assertNotNull(returnedResponse.getBody());

        System.out.println(returnedResponse.getBody().getData());
    }

    @Test
    void verifyNoMoviesFound() {
        GetMoviesRequest request = new GetMoviesRequest();
        request.setUserID("6423e5633b51581fb8d36210");
        request.setWatchlist("invalid watchlist");

        ResponseEntity<GetMoviesResponse> returnedResponse = getMoviesController.handleGetMovies(request);

        assertEquals("No results found.", returnedResponse.getBody().getData());
        // JSONObject json = new JSONObject(returnedResponse.getBody().getData());
        System.out.println(returnedResponse.getBody().getData());
    }
}
