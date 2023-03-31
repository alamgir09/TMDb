package edu.usc.csci310.project.demo.api.controllers;


import com.google.gson.Gson;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import edu.usc.csci310.project.Movie;
import edu.usc.csci310.project.UserAccount;
import edu.usc.csci310.project.Watchlist;
import edu.usc.csci310.project.demo.api.requests.GetMoviesRequest;
import edu.usc.csci310.project.demo.api.responses.GetMoviesResponse;
import org.bson.Document;
import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;

import static com.mongodb.MongoClientSettings.getDefaultCodecRegistry;
import static com.mongodb.client.model.Projections.include;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

import org.bson.conversions.Bson;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/getMovies")
public class GetMoviesController {

    @PostMapping
    public ResponseEntity<GetMoviesResponse> handleGetMovies(@RequestBody GetMoviesRequest request) {

        GetMoviesResponse response = new GetMoviesResponse();

        CodecProvider pojoCodecProvider = PojoCodecProvider.builder().automatic(true).build();
        CodecRegistry pojoCodecRegistry = fromRegistries(getDefaultCodecRegistry(), fromProviders(pojoCodecProvider));

        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "mongodb+srv://kevindon:Trojan4life@team-4.mkypxav.mongodb.net/?retryWrites=true&w=majority";
        try (MongoClient mongoClient = MongoClients.create(uri)) {

            MongoDatabase database = mongoClient.getDatabase("Team4").withCodecRegistry(pojoCodecRegistry);
            MongoCollection<Document> collection = database.getCollection("Users");

            Bson filter = Filters.and(Filters.eq("userID", request.getUserID()), Filters.eq("watchlist.name", request.getWatchlist()));

            // Document doc = collection.find(filter).first();

            UserAccount user = collection.find(filter, UserAccount.class).first();

            if (user == null) {
                System.out.println("No results found.");
                response.setData("No results found.");
            } else {

                List<Watchlist> watchlists = user.getWatchlist();

                // go through watchlist and get movies from watchlist
                List<Movie> movies = new ArrayList<>();

                for (Watchlist w : watchlists) {
                    if (w.getName().equals(request.getWatchlist())) {
                        movies = w.getMovies();
                    }
                }

                String gsonString = new Gson().toJson(movies);

                response.setData(gsonString);
                System.out.println(gsonString);
            }
        }

        return ResponseEntity.ok().body(response);

    }

}
