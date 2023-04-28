package edu.usc.csci310.project.demo.api.controllers;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mongodb.client.*;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Projections;
import edu.usc.csci310.project.demo.api.responses.GetWatchlistUsersResponse;
import org.bson.Document;

import org.bson.conversions.Bson;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/getWatchlistUsers")
public class GetWatchlistUsersController {
    @PostMapping
    public ResponseEntity<GetWatchlistUsersResponse> getWatchlistUsers() {

        GetWatchlistUsersResponse response = new GetWatchlistUsersResponse();
//        CodecProvider pojoCodecProvider = PojoCodecProvider.builder().automatic(true).build();
//        CodecRegistry pojoCodecRegistry = fromRegistries(getDefaultCodecRegistry(), fromProviders(pojoCodecProvider));

        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "mongodb+srv://kevindon:Trojan4life@team-4.mkypxav.mongodb.net/?retryWrites=true&w=majority";
        try (MongoClient mongoClient = MongoClients.create(uri)) {

            MongoDatabase database = mongoClient.getDatabase("Team4");

            MongoCollection<Document> collection = database.getCollection("Users");

            // Creating a query
            Bson query = Filters.and(
                    Filters.eq("watchlist.type", "Public"),
                    Filters.exists("password")
            );

            // Retrieving documents
            MongoCursor<Document> cursor = collection.find(query)
                    .projection(Projections.excludeId()).projection(Projections.exclude("password"))
                    .iterator();

            // Creating a list to store documents
            List<Document> documents = new ArrayList<>();

            while (cursor.hasNext()) {
                Document document = cursor.next();
                documents.add(document);
            }

            // Converting the list of documents to a JSON string
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String json = gson.toJson(documents);


            // Close the connection
            mongoClient.close();
            response.setData(json);

        }

        return ResponseEntity.ok().body(response);

    }

}