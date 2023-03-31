package edu.usc.csci310.project.demo.api.controllers;

import com.google.gson.Gson;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Projections;
import edu.usc.csci310.project.UserAccount;
import edu.usc.csci310.project.Watchlist;
import edu.usc.csci310.project.demo.api.requests.GetWatchlistRequest;
import edu.usc.csci310.project.demo.api.responses.GetWatchlistResponse;
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

import java.util.List;

@RestController
@RequestMapping("/api/getWatchlist")
public class GetWatchlistController {

    @PostMapping
    public ResponseEntity<GetWatchlistResponse> handleGetWatchlist(@RequestBody GetWatchlistRequest request) {

        GetWatchlistResponse response = new GetWatchlistResponse();

        CodecProvider pojoCodecProvider = PojoCodecProvider.builder().automatic(true).build();
        CodecRegistry pojoCodecRegistry = fromRegistries(getDefaultCodecRegistry(), fromProviders(pojoCodecProvider));

        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "mongodb+srv://kevindon:Trojan4life@team-4.mkypxav.mongodb.net/?retryWrites=true&w=majority";
        try (MongoClient mongoClient = MongoClients.create(uri)) {

            MongoDatabase database = mongoClient.getDatabase("Team4").withCodecRegistry(pojoCodecRegistry);
            MongoCollection<Document> collection = database.getCollection("Users");

            Bson projectionFields = Projections.fields(
                    Projections.include("watchlist"),
                    Projections.excludeId());

            Document doc = collection.find(eq("userID", request.getUserID())).projection(projectionFields).first();

            if (doc == null) {
                System.out.println("No results found.");
                response.setData("No results found.");
            } else {
                Document docUser = collection.find(eq("userID", request.getUserID())).first();

                UserAccount user = collection.find(docUser, UserAccount.class).first();

                List<Watchlist> watchlists = user.getWatchlist();

                String gsonString = new Gson().toJson(watchlists);

                response.setData(gsonString);
                System.out.println(gsonString);
            }
        }

        return ResponseEntity.ok().body(response);

    }

}
