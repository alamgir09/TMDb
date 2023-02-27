package edu.usc.csci310.project.demo.api.controllers;

import static org.junit.jupiter.api.Assertions.*;

import edu.usc.csci310.project.demo.api.controllers.PingPongController;
import edu.usc.csci310.project.demo.api.requests.PingPongRequest;
import edu.usc.csci310.project.demo.api.responses.PingPongResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

class PingPongControllerTest {

    PingPongController pingPongController = new PingPongController();

    @Test
    void playPingPong() {
        PingPongRequest request = new PingPongRequest();
        request.setParam0("Hello");

        ResponseEntity<PingPongResponse> returnedResponse = pingPongController.playPingPong(request);

        assertNotNull(returnedResponse.getBody());
        assertTrue(returnedResponse.getBody().getData().startsWith("Pong " + request.getParam0() + "."));
    }
}
