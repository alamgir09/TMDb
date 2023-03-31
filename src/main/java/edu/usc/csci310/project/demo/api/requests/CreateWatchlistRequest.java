package edu.usc.csci310.project.demo.api.requests;

public class CreateWatchlistRequest {
    private String watchlist;

    private String userID;

    private String type;

    public String getWatchlist(){return watchlist;}
    public String getUserID(){return userID;}
    public String getType(){return type;}

    public void setWatchlist(String watchlist){this.watchlist = watchlist;}
    public void setUserID(String userID){this.userID = userID;}
    public void setType(String type){this.type = type;}
}
