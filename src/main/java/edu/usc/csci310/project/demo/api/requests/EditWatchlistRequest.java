package edu.usc.csci310.project.demo.api.requests;

public class EditWatchlistRequest {
    private String watchlistOld;

    private String watchlistNew;

    private String userID;

    private String type;

    private String operation;

    public String getWatchlistOld() {
        return watchlistOld;
    }

    public String getWatchlistNew() {
        return watchlistNew;
    }

    public String getUserID() {
        return userID;
    }

    public String getType() {
        return type;
    }

    public String getOperation() {
        return operation;
    }

    public void setWatchlistOld(String watchlist) {
        this.watchlistOld = watchlist;
    }

    public void setWatchlistNew(String watchlist) {
        this.watchlistNew = watchlist;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }
}
