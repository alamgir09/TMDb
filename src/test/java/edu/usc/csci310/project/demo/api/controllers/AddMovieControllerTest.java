package edu.usc.csci310.project.demo.api.controllers;

import edu.usc.csci310.project.Movie;
import edu.usc.csci310.project.demo.api.requests.AddMovieRequest;
import edu.usc.csci310.project.demo.api.responses.AddMovieResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertNotNull;

public class AddMovieControllerTest {
    AddMovieController addMovieController = new AddMovieController();

    @Test
    void verifyAddMovie() {
        AddMovieRequest request = new AddMovieRequest();
        request.setUserID("6423e5633b51581fb8d36210");
        request.setWatchlist("watchlist test");
        request.setMovie(new Movie("test title", "test url", "test release date", "test rating"));

        ResponseEntity<AddMovieResponse> returnedResponse = addMovieController.addMovie(request);

        assertNotNull(returnedResponse.getBody());
        System.out.println(returnedResponse.getBody().getData());
    }
}
