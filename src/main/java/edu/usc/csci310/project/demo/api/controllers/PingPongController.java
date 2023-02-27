package edu.usc.csci310.project.demo.api.controllers;

import edu.usc.csci310.project.demo.api.requests.PingPongRequest;
import edu.usc.csci310.project.demo.api.responses.PingPongResponse;
import java.time.Instant;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ping")
public class PingPongController {

    @PostMapping
    public ResponseEntity<PingPongResponse> playPingPong(@RequestBody PingPongRequest request) {
        PingPongResponse response = new PingPongResponse();
        response.setData("Pong " + request.getParam0() + ". Received at " + Instant.now() + ".");
        return ResponseEntity.ok().body(response);
    }
}
