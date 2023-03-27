package edu.usc.csci310.project.demo.api.requests;

public class AddMovieRequest {
    private String watchlist;

    private String userID;

    private String movie;

    public String getWatchlist(){return watchlist;}
    public String getUserID(){return userID;}
    public String getMovie(){return movie;}

    public void setWatchlist(String watchlist){this.watchlist = watchlist;}
    public void setUserID(String userID){this.userID = userID;}
    public void setMovie(String movie){this.movie = movie;}
}
