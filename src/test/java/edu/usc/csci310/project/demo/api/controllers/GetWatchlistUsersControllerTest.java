package edu.usc.csci310.project.demo.api.controllers;

import edu.usc.csci310.project.demo.api.responses.GetWatchlistUsersResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertNotNull;

public class GetWatchlistUsersControllerTest {
    GetWatchlistUsersController getWatchlistUsersController = new GetWatchlistUsersController();

    @Test
    void verifyCreateWatchlist() {

        ResponseEntity<GetWatchlistUsersResponse> returnedResponse = getWatchlistUsersController.getWatchlistUsers();

        assertNotNull(returnedResponse.getBody());
        System.out.println(returnedResponse.getBody().getData());
        //assertEquals(returnedResponse.getBody().getData(), "Success");
    }
}
