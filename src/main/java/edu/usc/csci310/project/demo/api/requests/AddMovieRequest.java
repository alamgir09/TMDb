package edu.usc.csci310.project.demo.api.requests;

import edu.usc.csci310.project.Movie;

public class AddMovieRequest {
    private String watchlist;

    private String userID;

    private Movie movie;

    public String getWatchlist() {
        return watchlist;
    }

    public String getUserID() {
        return userID;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setWatchlist(String watchlist) {
        this.watchlist = watchlist;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }
}
