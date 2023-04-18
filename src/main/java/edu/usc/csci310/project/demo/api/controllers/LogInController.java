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

import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@RestController
@RequestMapping("/api/login")
public class LogInController {
    @PostMapping
    public ResponseEntity<LogInResponse> checkLogIn(@RequestBody LogInRequest request) throws NoSuchAlgorithmException {

        CodecProvider pojoCodecProvider = PojoCodecProvider.builder().automatic(true).build();
        CodecRegistry pojoCodecRegistry = fromRegistries(getDefaultCodecRegistry(), fromProviders(pojoCodecProvider));

        LogInResponse response = new LogInResponse();

        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "mongodb+srv://kevindon:Trojan4life@team-4.mkypxav.mongodb.net/?retryWrites=true&w=majority";
        try (MongoClient mongoClient = MongoClients.create(uri)) {

            MongoDatabase database = mongoClient.getDatabase("Team4").withCodecRegistry(pojoCodecRegistry);
            MongoCollection<UserAccount> collection = database.getCollection("Users", UserAccount.class);

            UserAccount userAccount = collection.find(eq("username", request.getUsername())).first();

            JSONObject json = new JSONObject();

            // check if password match
            if(userAccount != null){

                String password = request.getPassword();
                String hashedPass;

                    MessageDigest digest = MessageDigest.getInstance("SHA-256");
                    byte[] hash = digest.digest(password.getBytes());

                    // Convert the byte array to a hex string
                    StringBuilder hexString = new StringBuilder();
                    for (byte b : hash) {
                        String hex = Integer.toHexString(0xff & b);
                        if (hex.length() == 1) hexString.append('0');
                        hexString.append(hex);
                    }

                    System.out.println("Original string: " + password);

                    hashedPass = hexString.toString();
                    System.out.println("SHA-256 hash: " + hashedPass);

                // password does not matchs
                if(!hashedPass.equals(userAccount.getPassword())){
                    json.put("Type", "Error");
                    json.put("Message", "Password does not match");
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