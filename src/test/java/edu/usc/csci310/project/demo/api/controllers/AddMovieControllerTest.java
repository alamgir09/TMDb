package edu.usc.csci310.project.demo.api.controllers;

import edu.usc.csci310.project.Movie;
import edu.usc.csci310.project.demo.api.requests.AddMovieRequest;
import edu.usc.csci310.project.demo.api.responses.AddMovieResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class AddMovieControllerTest {
    AddMovieController addMovieController = new AddMovieController();

    @Test
    void verifyAddMovie() {
        AddMovieRequest request = new AddMovieRequest();
        request.setUserID("6430c19cb1f4505a0619df69");
        request.setWatchlist("watchlist 2");

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

        request.setMovie(new Movie("test id", randomMovieTitle.toString(), "test url", "test release date", "test rating"));

        ResponseEntity<AddMovieResponse> returnedResponse = addMovieController.addMovie(request);

        assertNotNull(returnedResponse.getBody());
        System.out.println(returnedResponse.getBody().getData());
    }

    @Test
    void verifyAddMovieExists() {
        AddMovieRequest request = new AddMovieRequest();
        request.setUserID("6437499e7c0bb318ab942ace");
        request.setWatchlist("watchlist 1");


        request.setMovie(new Movie("test id", "Iron Will", "test url", "test release date", "test rating"));

        ResponseEntity<AddMovieResponse> returnedResponse = addMovieController.addMovie(request);

        assertNotNull(returnedResponse.getBody());
        assertEquals("Movie already exists", returnedResponse.getBody().getData());
        System.out.println(returnedResponse.getBody().getData());

    }
}
