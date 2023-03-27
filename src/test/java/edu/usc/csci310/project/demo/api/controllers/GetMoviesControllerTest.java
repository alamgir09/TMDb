package edu.usc.csci310.project.demo.api.controllers;

import edu.usc.csci310.project.demo.api.requests.GetMoviesRequest;
import edu.usc.csci310.project.demo.api.responses.GetMoviesResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertNotNull;

public class GetMoviesControllerTest {
    GetMoviesController getMoviesController = new GetMoviesController();

    @Test
    void verifyGetMovies() {
        GetMoviesRequest request = new GetMoviesRequest();
        request.setUserID("641e53712027c440ac7d9edc");
        request.setWatchlist("hi");

        ResponseEntity<GetMoviesResponse> returnedResponse = getMoviesController.handleGetMovies(request);

        assertNotNull(returnedResponse.getBody());
        // JSONObject json = new JSONObject(returnedResponse.getBody().getData());
        System.out.println(returnedResponse.getBody().getData());
    }
}
