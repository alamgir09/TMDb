package edu.usc.csci310.project.demo.api.controllers;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.UpdateResult;
import edu.usc.csci310.project.Movie;
import edu.usc.csci310.project.UserAccount;
import edu.usc.csci310.project.Watchlist;
import edu.usc.csci310.project.demo.api.requests.CreateWatchlistRequest;
import edu.usc.csci310.project.demo.api.responses.CreateWatchlistResponse;
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

import java.util.ArrayList;

@RestController
@RequestMapping("/api/createWatchlist")
public class CreateWatchlistController {
    @PostMapping
    public ResponseEntity<CreateWatchlistResponse> createWatchlist(@RequestBody CreateWatchlistRequest request) {

        CreateWatchlistResponse response = new CreateWatchlistResponse();
        CodecProvider pojoCodecProvider = PojoCodecProvider.builder().automatic(true).build();
        CodecRegistry pojoCodecRegistry = fromRegistries(getDefaultCodecRegistry(), fromProviders(pojoCodecProvider));

        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "mongodb+srv://kevindon:Trojan4life@team-4.mkypxav.mongodb.net/?retryWrites=true&w=majority";
        try (MongoClient mongoClient = MongoClients.create(uri)) {

            MongoDatabase database = mongoClient.getDatabase("Team4").withCodecRegistry(pojoCodecRegistry);

            MongoCollection<Document> collection = database.getCollection("Users");

            //Document doc = collection.find(eq("userID", request.getUserID())).first();
            UserAccount user = collection.withDocumentClass(UserAccount.class).find(eq("userID", request.getUserID())).first();

            if (user == null) {
                System.out.println("User does not exist");
                response.setData("User does not exist");
                return ResponseEntity.ok().body(response);
            }

            //UserAccount user = collection.find(doc, UserAccount.class).first();

            //assert user != null;
            ArrayList<Watchlist> watchlists = user.getWatchlist();

            // check if watchlist already exists
            for (Watchlist w : watchlists) {
                if (w.getName().equals(request.getWatchlist())) {
                    System.out.println("Watchlist already exists");
                    response.setData("Watchlist already exists");
                    return ResponseEntity.ok().body(response);
                }
            }

            Document query = new Document().append("userID", request.getUserID());

            Watchlist watchlist = new Watchlist(request.getWatchlist(), request.getType());

            ArrayList<Movie> movies = request.getMovies();


            for (Movie m : movies) {
                System.out.println("id: " + m.getId());
                System.out.println("title: " + m.getTitle());
            }

            watchlist.setMovies(request.getMovies());

            Bson updates = Updates.addToSet("watchlist", watchlist);

            UpdateResult result = collection.updateOne(query, updates);
            System.out.println("Added " + request.getWatchlist() + " to watchlist");
            response.setData("Success");

            return ResponseEntity.ok().body(response);
        }
    }

}
