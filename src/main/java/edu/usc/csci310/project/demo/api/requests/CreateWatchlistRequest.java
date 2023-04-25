package edu.usc.csci310.project.demo.api.requests;

import edu.usc.csci310.project.Movie;

import java.util.ArrayList;

public class CreateWatchlistRequest {
    private String watchlist;

    private String userID;

    private String type;

    private ArrayList<Movie> movies;

    public String getWatchlist() {
        return watchlist;
    }

    public String getUserID() {
        return userID;
    }

    public String getType() {
        return type;
    }

    public ArrayList<Movie> getMovies() {
        return movies;
    }

    public void setWatchlist(String watchlist) {
        this.watchlist = watchlist;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setMovies(ArrayList<Movie> movies) {
        this.movies = movies;
    }
}
