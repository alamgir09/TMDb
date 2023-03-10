package edu.usc.csci310.project.demo.api.controllers;

import edu.usc.csci310.project.SpringBootAPI;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class SpringBootAPITest {
    SpringBootAPI springBootAPI = new SpringBootAPI();

    @Test
    void redirect() {
        String response = springBootAPI.redirect();

        assertEquals(response, "forward:/");
    }
}
