package edu.usc.csci310.project.demo.api.requests;

public class GetMoviesRequest {
    private String userID;
    private String watchlist;

    public String getUserID(){return userID;}
    public String getWatchlist(){return watchlist;}

    public void setUserID(String userid){userID = userid;}
    public void setWatchlist(String watchlist){this.watchlist = watchlist;}
}
