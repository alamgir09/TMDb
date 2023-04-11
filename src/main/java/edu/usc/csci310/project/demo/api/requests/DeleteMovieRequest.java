package edu.usc.csci310.project.demo.api.requests;

public class DeleteMovieRequest {
    private String watchlist;

    private String movieID;

    private String userID;

    public String getWatchlist() {
        return watchlist;
    }

    public String getMovieID() {
        return movieID;
    }

    public String getUserID() {
        return userID;
    }


    public void setWatchlist(String watchlist) {
        this.watchlist = watchlist;
    }

    public void setMovieID(String movieID) {
        this.movieID = movieID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

}
