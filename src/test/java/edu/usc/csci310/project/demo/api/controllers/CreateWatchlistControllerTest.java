package edu.usc.csci310.project.demo.api.controllers;

import edu.usc.csci310.project.Movie;
import edu.usc.csci310.project.demo.api.requests.CreateWatchlistRequest;
import edu.usc.csci310.project.demo.api.responses.CreateWatchlistResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class CreateWatchlistControllerTest {
    CreateWatchlistController createWatchlistController = new CreateWatchlistController();

    @Test
    void verifyCreateWatchlistAlreadyExists() {
        CreateWatchlistRequest request = new CreateWatchlistRequest();
        request.setUserID("64266002aa425f3c58eb9644");
        request.setWatchlist("existing watchlist");
        request.setType("Private");
        request.setMovies(new ArrayList<>());

        ResponseEntity<CreateWatchlistResponse> returnedResponse = createWatchlistController.createWatchlist(request);

        assertNotNull(returnedResponse.getBody());
        assertEquals(returnedResponse.getBody().getData(), "Watchlist already exists");

    }

    @Test
    void verifyUserDoesNotExist() {
        CreateWatchlistRequest request = new CreateWatchlistRequest();
        request.setUserID("6423e5633b51581d36210");
        request.setWatchlist("existing watchlist");
        request.setType("Private");

        ResponseEntity<CreateWatchlistResponse> returnedResponse = createWatchlistController.createWatchlist(request);

        assertNotNull(returnedResponse.getBody());
        assertEquals(returnedResponse.getBody().getData(), "User does not exist");

    }

    @Test
    void verifyCreateWatchlist() {
        CreateWatchlistRequest request = new CreateWatchlistRequest();
        request.setUserID("64266002aa425f3c58eb9644");

        // create watchlist
        // choose a Character random from this String
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                + "0123456789"
                + "abcdefghijklmnopqrstuvxyz";

        // create StringBuffer size of AlphaNumericString
        StringBuilder randomWatchlist = new StringBuilder(5);

        for (int i = 0; i < 7; i++) {

            // generate a random number between
            // 0 to AlphaNumericString variable length
            int index
                    = (int) (AlphaNumericString.length()
                    * Math.random());

            // add Character one by one in end of sb
            randomWatchlist.append(AlphaNumericString
                    .charAt(index));
        }

        request.setWatchlist(randomWatchlist.toString());
        request.setType("Private");
        // create movies
        ArrayList<Movie> movies = new ArrayList<>();
        Movie movie1 = new Movie("id1", "title1", "imgURL1", "release", "7");
        Movie movie2 = new Movie("id2", "title2", "imgURL2", "release", "7");
        Movie movie3 = new Movie("id3", "title3", "imgURL3", "release", "7");
        movies.add(movie1);
        movies.add(movie2);
        movies.add(movie3);
        request.setMovies(movies);

        ResponseEntity<CreateWatchlistResponse> returnedResponse = createWatchlistController.createWatchlist(request);

        assertNotNull(returnedResponse.getBody());
        assertEquals(returnedResponse.getBody().getData(), "Success");
    }
}
