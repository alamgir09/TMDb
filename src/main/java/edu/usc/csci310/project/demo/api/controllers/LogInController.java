package edu.usc.csci310.project.demo.api.controllers;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import edu.usc.csci310.project.UserAccount;
import edu.usc.csci310.project.demo.api.requests.LogInRequest;
import edu.usc.csci310.project.demo.api.responses.LogInResponse;
import org.bson.Document;
import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import static com.mongodb.MongoClientSettings.getDefaultCodecRegistry;
import static com.mongodb.client.model.Filters.eq;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

import org.json.JSONObject;
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

            UserAccount userAccount = collection.find(eq("username", request.getUsername())).first();

            MongoCollection<Document> collectionAll = database.getCollection("Users");
            Document query = new Document("username", request.getUsername());
            Document user = collectionAll.find(query).first();

            JSONObject json = new JSONObject();

            // check if password match
            if(userAccount != null){ // if user exists

                //get the last time the user was locked out
                long timestamp = user.getLong("timestamp");

                //get the last time they failed
                long firstFailed = user.getLong("firstFailed");

                //we must get the attempts before the below logic...
                //this is because we may reset it to zero
                int attempts = user.getInteger("attempts", 0);

                long currentTime = (System.currentTimeMillis() / 1000);

                //if they are trying to login within 30 seconds of last being locked out...
                if (currentTime - timestamp < 30) {

                    //extend by 30 seconds from the current time again...
                    collection.updateOne(query, new Document("$set", new Document("timestamp", currentTime)));

                    //don't let them login
                    json.put("Type", "Error");
                    json.put("Message", "Too many failed attempts. Please retry in 30 seconds...");
                    response.setData(json.toString());
                    return ResponseEntity.ok().body(response);


                }
                //they are trying to login more than 30 seconds after they were locked out...
                //allow them to try, so reset the fields
                else if(attempts >= 3){
                    //reset the attempts to 0
                    collection.updateOne(query, new Document("$set", new Document("attempts", 0)));
                    //set the local attempts to 0
                    attempts = 0;
                    //reset the last lockout to 0 (system current time - 0 will obviously be greater than 30 lol)
                    collection.updateOne(query, new Document("$set", new Document("timestamp", (long)0)));
                }

                // password does not match
                if(!request.getPassword().equals(userAccount.getPassword())){

                    json.put("Type", "Error");
                    json.put("Message", "Password does not match");

                    //only increment the attempts if it is within 60 seconds of the initial failed attempt
                    //also only do this if you have FAILED BEFORE
                    if(attempts > 0 && (currentTime - firstFailed) <= 60) {
                        //increment the attempts
                        collection.updateOne(query, new Document("$set", new Document("attempts", attempts + 1)));
                        attempts++;
                    }
                    //otherwise... set the attempts to 1 and reset everything
                    else {
                        // set attempts to 1
                        collection.updateOne(query, new Document("$set", new Document("attempts", 1)));
                        attempts = 1;
                        // reset last failed
                        collection.updateOne(query, new Document("$set", new Document("firstFailed", currentTime)));
                    }

                    // check for 3 attempts, set timestamp
                    if (attempts >= 3) {
                        collection.updateOne(query, new Document("$set", new Document("timestamp", currentTime)));
                        json.put("Type", "Error");
                        json.put("Message", "Too many failed attempts. Please retry in 30 seconds...");
                        response.setData(json.toString());
                        return ResponseEntity.ok().body(response);
                    }

                }
                // password match (return userID)
                else{
                    json.put("Type", "Success");
                    json.put("userID", userAccount.getUserID());
                }
            }
            // username not found
            else {
                json.put("Type", "Error");
                json.put("Message", "Username not found");
            }
            response.setData(json.toString());
            System.out.println(json);
        }

        return ResponseEntity.ok().body(response);

    }

}