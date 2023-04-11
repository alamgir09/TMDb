package edu.usc.csci310.project.demo.api.controllers;

import edu.usc.csci310.project.demo.api.requests.CreateWatchlistRequest;
import edu.usc.csci310.project.demo.api.requests.EditWatchlistRequest;
import edu.usc.csci310.project.demo.api.responses.EditWatchlistResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class EditWatchlistControllerTest {
    EditWatchlistController editWatchlistController = new EditWatchlistController();
    CreateWatchlistController createWatchlistController = new CreateWatchlistController();

    @Test
    void verifyEditWatchlistName() {

        // create watchlist
        CreateWatchlistRequest createRequest = new CreateWatchlistRequest();
        createRequest.setUserID("64266002aa425f3c58eb9644");
        createRequest.setWatchlist("watchlist old");
        createRequest.setType("Private");

        createWatchlistController.createWatchlist(createRequest);

        // edit watchlist
        EditWatchlistRequest editRequest = new EditWatchlistRequest();
        editRequest.setUserID("64266002aa425f3c58eb9644");
        editRequest.setWatchlistOld("watchlist old");
        editRequest.setWatchlistNew("watchlist edited");
        editRequest.setOperation("edit");

        ResponseEntity<EditWatchlistResponse> returnedResponse = editWatchlistController.editWatchlist(editRequest);

        assertNotNull(returnedResponse.getBody());
        assertEquals(returnedResponse.getBody().getData(), "Success");

    }

    @Test
    void verifyEditWatchlistDelete() {
        EditWatchlistRequest request = new EditWatchlistRequest();
        request.setUserID("64266002aa425f3c58eb9644");
        request.setWatchlistOld("watchlist edited");
        request.setOperation("delete");

        ResponseEntity<EditWatchlistResponse> returnedResponse = editWatchlistController.editWatchlist(request);

        assertNotNull(returnedResponse.getBody());
        assertEquals(returnedResponse.getBody().getData(), "Success");

    }
}
