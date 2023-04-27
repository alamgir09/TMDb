package edu.usc.csci310.project.demo.api.controllers;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import edu.usc.csci310.project.demo.api.requests.DeleteMovieRequest;
import edu.usc.csci310.project.demo.api.responses.DeleteMovieResponse;
import org.bson.Document;
import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;

import static com.mongodb.MongoClientSettings.getDefaultCodecRegistry;
import static com.mongodb.client.model.Filters.eq;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/deleteMovie")
public class DeleteMovieController {
    @PostMapping
    public ResponseEntity<DeleteMovieResponse> deleteMovie(@RequestBody DeleteMovieRequest request) {

        DeleteMovieResponse response = new DeleteMovieResponse();
        CodecProvider pojoCodecProvider = PojoCodecProvider.builder().automatic(true).build();
        CodecRegistry pojoCodecRegistry = fromRegistries(getDefaultCodecRegistry(), fromProviders(pojoCodecProvider));

        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "mongodb+srv://kevindon:Trojan4life@team-4.mkypxav.mongodb.net/?retryWrites=true&w=majority";
        try (MongoClient mongoClient = MongoClients.create(uri)) {

            MongoDatabase database = mongoClient.getDatabase("Team4").withCodecRegistry(pojoCodecRegistry);

            MongoCollection<Document> collection = database.getCollection("Users");

            // check if movie already exists
            Document query = collection.find(eq("userID", request.getUserID())).first();

            if (!request.getWatchlistTo().equals("null")) {
                // Get the watchlist array where name is from request
                List<Document> watchlist = collection.find(query)
                        .projection(Filters.elemMatch("watchlist", Filters.eq("name", request.getWatchlistTo())))
                        .into(new ArrayList<>())
                        .get(0)
                        .getList("watchlist", Document.class);

                System.out.println(request.getWatchlistTo());

                // Get the movies array from the watchlist
                List<Document> movies = watchlist.get(0).getList("movies", Document.class);

                // Print the movies
                for (Document m : movies) {
                    String id = m.getString("_id");
                    System.out.println(id);
                    if (id.equals(request.getMovieID())) {
                        response.setData("Movie already exists");
                        return ResponseEntity.ok().body(response);
                    }
                }
            }

            // Create a filter to match the document containing the watchlist you want to update
            Document filter = new Document("userID", request.getUserID())
                    .append("watchlist.name", request.getWatchlistFrom());

            // Create an update to remove the movie from the movies array
            Document update = new Document("$pull", new Document("watchlist.$.movies", new Document("_id", request.getMovieID())));

            // Update the document in the collection
            collection.updateOne(filter, update);

            response.setData("Success");

        }

        return ResponseEntity.ok().body(response);

    }

}
