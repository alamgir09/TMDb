package edu.usc.csci310.project.demo.api.controllers;

import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.UpdateResult;
import edu.usc.csci310.project.Movie;
import edu.usc.csci310.project.demo.api.requests.AddMovieRequest;
import edu.usc.csci310.project.demo.api.responses.AddMovieResponse;
import org.bson.Document;
import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;

import static com.mongodb.MongoClientSettings.getDefaultCodecRegistry;
import static com.mongodb.client.model.Filters.eq;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

import org.bson.conversions.Bson;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/addMovie")
public class AddMovieController {
    @PostMapping
    public ResponseEntity<AddMovieResponse> addMovie(@RequestBody AddMovieRequest request) {

        AddMovieResponse response = new AddMovieResponse();
        CodecProvider pojoCodecProvider = PojoCodecProvider.builder().automatic(true).build();
        CodecRegistry pojoCodecRegistry = fromRegistries(getDefaultCodecRegistry(), fromProviders(pojoCodecProvider));

        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "mongodb+srv://kevindon:Trojan4life@team-4.mkypxav.mongodb.net/?retryWrites=true&w=majority";
        try (MongoClient mongoClient = MongoClients.create(uri)) {

            MongoDatabase database = mongoClient.getDatabase("Team4").withCodecRegistry(pojoCodecRegistry);

            MongoCollection<Document> collection = database.getCollection("Users");

            Bson filter = Filters.and(eq("userID", request.getUserID()), eq("watchlist.name", request.getWatchlist()));

            Bson updates = Updates.addToSet("watchlist.$.movies", request.getMovie());

            UpdateResult result = collection.updateOne(filter, updates);
            System.out.println("Added movie: " + request.getMovie() + " to watchlist");
            response.setData("Success");

        }

        return ResponseEntity.ok().body(response);

    }

}
