package edu.usc.csci310.project.demo.api.controllers;

import edu.usc.csci310.project.demo.api.requests.DeleteMovieRequest;
import edu.usc.csci310.project.demo.api.responses.DeleteMovieResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertNotNull;

public class DeleteMovieControllerTest {
    DeleteMovieController deleteMovieController = new DeleteMovieController();

    @Test
    void verifyDeleteMovie() {
        DeleteMovieRequest request = new DeleteMovieRequest();
        request.setUserID("6430c19cb1f4505a0619df69");
        request.setWatchlistFrom("watchlist 2");
        request.setWatchlistTo("null");
        request.setMovieID("658009");

        ResponseEntity<DeleteMovieResponse> returnedResponse = deleteMovieController.deleteMovie(request);

        assertNotNull(returnedResponse.getBody());
        System.out.println(returnedResponse.getBody().getData());
    }

    @Test
    void verifyDoesNotDeleteMovie() {
        DeleteMovieRequest request = new DeleteMovieRequest();
        request.setUserID("6430c19cb1f4505a0619df69");
        request.setWatchlistFrom("watchlist 2");
        request.setWatchlistTo("Watchlist 3");
        request.setMovieID("10138");

        ResponseEntity<DeleteMovieResponse> returnedResponse = deleteMovieController.deleteMovie(request);

        assertNotNull(returnedResponse.getBody());
        System.out.println(returnedResponse.getBody().getData());
    }

    @Test
    void verifyDeleteMovieExists() {
        DeleteMovieRequest request = new DeleteMovieRequest();
        request.setUserID("6430c19cb1f4505a0619df69");
        request.setWatchlistFrom("watchlist 2");
        request.setWatchlistTo("Watchlist 3");
        request.setMovieID("111111");

        ResponseEntity<DeleteMovieResponse> returnedResponse = deleteMovieController.deleteMovie(request);

        assertNotNull(returnedResponse.getBody());
        System.out.println(returnedResponse.getBody().getData());
    }
}
