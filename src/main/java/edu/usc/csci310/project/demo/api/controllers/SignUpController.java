package edu.usc.csci310.project.demo.api.controllers;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.InsertOneResult;
import edu.usc.csci310.project.UserAccount;
import edu.usc.csci310.project.Watchlist;
import edu.usc.csci310.project.demo.api.requests.SignUpRequest;
import edu.usc.csci310.project.demo.api.responses.SignUpResponse;
import org.bson.Document;
import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import static com.mongodb.MongoClientSettings.getDefaultCodecRegistry;
import static com.mongodb.client.model.Filters.eq;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;


@RestController
@RequestMapping("/api/signup")
public class SignUpController {
    @PostMapping
    public ResponseEntity<SignUpResponse> checkSignUp(@RequestBody SignUpRequest request) {

        SignUpResponse response = new SignUpResponse();

        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "mongodb+srv://kevindon:Trojan4life@team-4.mkypxav.mongodb.net/?retryWrites=true&w=majority";
        try (MongoClient mongoClient = MongoClients.create(uri)) {

            MongoDatabase database = mongoClient.getDatabase("Team4");
            MongoCollection<Document> collection = database.getCollection("Users");

            System.out.println(request);

            // check if user already exists
            CodecProvider pojoCodecProvider = PojoCodecProvider.builder().automatic(true).build();
            CodecRegistry pojoCodecRegistry = fromRegistries(getDefaultCodecRegistry(), fromProviders(pojoCodecProvider));
            MongoDatabase databasePojo = mongoClient.getDatabase("Team4").withCodecRegistry(pojoCodecRegistry);
            MongoCollection<UserAccount> userCollection = databasePojo.getCollection("Users", UserAccount.class);
            UserAccount userAccount = userCollection.find(eq("username", request.getUsername())).first();
            if(userAccount != null){
                System.out.println("User already exists");
                response.setData("User already exists");
            }
            else{
                ObjectId userObjectID = new ObjectId();
                InsertOneResult result = collection.insertOne(new Document()
                        .append("_id", userObjectID)
                                .append("userID", userObjectID.toString())
                                .append("username", request.getUsername())
                        .append("firstName", request.getFirstName())
                        .append("lastName", request.getLastName())
                        .append("password", request.getPassword())
                                .append("watchlist", new ArrayList<Watchlist>())
                        );
                System.out.println("Success! Inserted document id: " + result.getInsertedId());
                response.setData(userObjectID.toString());
            }
            return ResponseEntity.ok().body(response);
        }
    }

}
