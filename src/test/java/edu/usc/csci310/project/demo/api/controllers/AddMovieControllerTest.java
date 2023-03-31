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

        // create movie
        // create watchlist
        // choose a Character random from this String
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                + "0123456789"
                + "abcdefghijklmnopqrstuvxyz";

        // create StringBuffer size of AlphaNumericString
        StringBuilder randomMovieTitle = new StringBuilder(5);

        for (int i = 0; i < 5; i++) {

            // generate a random number between
            // 0 to AlphaNumericString variable length
            int index
                    = (int) (AlphaNumericString.length()
                    * Math.random());

            // add Character one by one in end of sb
            randomMovieTitle.append(AlphaNumericString
                    .charAt(index));
        }

        request.setMovie(new Movie(randomMovieTitle.toString(), "test url", "test release date", "test rating"));

        ResponseEntity<AddMovieResponse> returnedResponse = addMovieController.addMovie(request);

        assertNotNull(returnedResponse.getBody());
        System.out.println(returnedResponse.getBody().getData());
    }
}
