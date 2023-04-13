package edu.usc.csci310.project.demo.api.controllers;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.UpdateResult;
import edu.usc.csci310.project.demo.api.requests.EditWatchlistRequest;
import edu.usc.csci310.project.demo.api.responses.EditWatchlistResponse;
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
@RequestMapping("/api/editWatchlist")
public class EditWatchlistController {
    @PostMapping
    public ResponseEntity<EditWatchlistResponse> editWatchlist(@RequestBody EditWatchlistRequest request) {

        EditWatchlistResponse response = new EditWatchlistResponse();
        CodecProvider pojoCodecProvider = PojoCodecProvider.builder().automatic(true).build();
        CodecRegistry pojoCodecRegistry = fromRegistries(getDefaultCodecRegistry(), fromProviders(pojoCodecProvider));

        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "mongodb+srv://kevindon:Trojan4life@team-4.mkypxav.mongodb.net/?retryWrites=true&w=majority";
        try (MongoClient mongoClient = MongoClients.create(uri)) {

            MongoDatabase database = mongoClient.getDatabase("Team4").withCodecRegistry(pojoCodecRegistry);

            MongoCollection<Document> collection = database.getCollection("Users");

            if (request.getOperation().equals("edit")) {
                Bson filter = Filters.and(eq("userID", request.getUserID()), eq("watchlist.name", request.getWatchlistOld()));

                Bson updates = Updates.set("watchlist.$.name", request.getWatchlistNew());

                UpdateResult result = collection.updateOne(filter, updates);

                response.setData("Success");

            }
            if (request.getOperation().equals("delete")) {

                // Define the query condition that matches the element you want to remove
                Bson filter = Filters.and(eq("userID", request.getUserID()), eq("watchlist.name", request.getWatchlistOld()));

                // Define the update operation to remove the element with $pull operator
                Document update = new Document("$pull", new Document("watchlist", new Document("name", request.getWatchlistOld())));

                // Apply the update operation to the matching document(s)
                collection.updateOne(filter, update);

                response.setData("Success");
            }
            if (request.getOperation().equals("update")) {
                Bson filter = Filters.and(eq("userID", request.getUserID()), eq("watchlist.name", request.getWatchlistOld()));

                Bson updates = Updates.set("watchlist.$.type", request.getType());

                UpdateResult result = collection.updateOne(filter, updates);

                response.setData("Success");
            }


        }

        return ResponseEntity.ok().body(response);

    }

}
