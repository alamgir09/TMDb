package edu.usc.csci310.project.demo.api.controllers;

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
        request.setUserID("641e53712027c440ac7d9edc");
        request.setWatchlist("hi");
        request.setMovie("new movie");

        ResponseEntity<AddMovieResponse> returnedResponse = addMovieController.addMovie(request);

        assertNotNull(returnedResponse.getBody());
        System.out.println(returnedResponse.getBody().getData());
    }
}
