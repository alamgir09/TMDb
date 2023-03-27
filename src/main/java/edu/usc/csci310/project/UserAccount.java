package edu.usc.csci310.project;

import java.util.ArrayList;

public class UserAccount {
    String firstName;
    String lastName;
    String password;
    String userID;
    ArrayList<Watchlist> watchlists;

    // setters
    public void setFirstName(String firstname) {
        this.firstName = firstname;
    }
    public void setLastName(String lastname) {
        this.lastName = lastname;
    }
    public void setUserID(String userid){this.userID = userid;}
    public void setPassword(String password) {
        this.password = password;
    }
    public void setWatchlist(ArrayList<Watchlist> watchlists){this.watchlists = watchlists;}

    // getters
    public String getPassword() {
        return password;
    }
    public String getUserID(){return userID;}
    public ArrayList<Watchlist> getWatchlist(){return watchlists;}

}
