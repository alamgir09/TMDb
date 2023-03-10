package edu.usc.csci310.project.demo.api.controllers;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import edu.usc.csci310.project.UserAccount;
import edu.usc.csci310.project.demo.api.requests.LogInRequest;
import edu.usc.csci310.project.demo.api.responses.LogInResponse;
import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import static com.mongodb.MongoClientSettings.getDefaultCodecRegistry;
import static com.mongodb.client.model.Filters.eq;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/login")
public class LogInController {
    @PostMapping
    public ResponseEntity<LogInResponse> checkLogIn(@RequestBody LogInRequest request) {

        CodecProvider pojoCodecProvider = PojoCodecProvider.builder().automatic(true).build();
        CodecRegistry pojoCodecRegistry = fromRegistries(getDefaultCodecRegistry(), fromProviders(pojoCodecProvider));

        LogInResponse response = new LogInResponse();

        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "mongodb+srv://kevindon:Trojan4life@team-4.mkypxav.mongodb.net/?retryWrites=true&w=majority";
        try (MongoClient mongoClient = MongoClients.create(uri)) {

            MongoDatabase database = mongoClient.getDatabase("Team4").withCodecRegistry(pojoCodecRegistry);
            MongoCollection<UserAccount> collection = database.getCollection("Users", UserAccount.class);

            UserAccount userAccount = collection.find(eq("email", request.getEmail())).first();

            // check if password match
            if(userAccount != null){
                // password does not match
                if(!request.getPassword().equals(userAccount.getPassword())){
                    response.setData("Password does not match");
                }
                // password match (login is valid)
                else{
                    response.setData("Valid");
                }
            }
            // no email found
            else {
                response.setData("Email not found");
            }
        }

        return ResponseEntity.ok().body(response);

    }

}