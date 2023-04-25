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
        request.setUserID("642617a23405041b9f616538");
        request.setWatchlist("Watchlist 1");

        ResponseEntity<GetMoviesResponse> returnedResponse = getMoviesController.handleGetMovies(request);

        assertNotNull(returnedResponse.getBody());

        System.out.println(returnedResponse.getBody().getData());
    }

    @Test
    void verifyNoMoviesFound() {
        GetMoviesRequest request = new GetMoviesRequest();
        request.setUserID("642617a23405041b9f616538");
        request.setWatchlist("invalid watchlist");

        ResponseEntity<GetMoviesResponse> returnedResponse = getMoviesController.handleGetMovies(request);

        assertEquals("No results found.", returnedResponse.getBody().getData());
        System.out.println(returnedResponse.getBody().getData());
    }

    @Test
    void verifyNoUserFound() {
        GetMoviesRequest request = new GetMoviesRequest();
        request.setUserID("642617a23405041b9f6160000");
        request.setWatchlist("invalid watchlist");

        ResponseEntity<GetMoviesResponse> returnedResponse = getMoviesController.handleGetMovies(request);

        assertEquals("No results found.", returnedResponse.getBody().getData());
        System.out.println(returnedResponse.getBody().getData());

    }
}
