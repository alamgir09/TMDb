package edu.usc.csci310.project.demo.api.requests;

public class DeleteMovieRequest {
    private String watchlistFrom;

    private String watchlistTo;

    private String movieID;

    private String userID;

    public String getWatchlistFrom() {
        return watchlistFrom;
    }

    public String getWatchlistTo() {
        return watchlistTo;
    }

    public String getMovieID() {
        return movieID;
    }

    public String getUserID() {
        return userID;
    }


    public void setWatchlistFrom(String watchlist) {
        this.watchlistFrom = watchlist;
    }

    public void setWatchlistTo(String watchlist) {
        this.watchlistTo = watchlist;
    }

    public void setMovieID(String movieID) {
        this.movieID = movieID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

}
