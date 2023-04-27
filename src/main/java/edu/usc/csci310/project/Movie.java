package edu.usc.csci310.project;

public class Movie {
    String title;
    String imgURL;
    String releaseDate;
    String rating;
    String _id;

    public String getTitle() {
        return title;
    }

    public String getImgURL() {
        return imgURL;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public String getRating() {
        return rating;
    }

    public String getId() {
        return _id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setImgURL(String url) {
        imgURL = url;
    }

    public void setReleaseDate(String date) {
        releaseDate = date;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public void setId(String _id) {
        this._id = _id;
    }

    public Movie(String _id, String title, String imgURL, String releaseDate, String rating) {
        this._id = _id;
        this.title = title;
        this.imgURL = imgURL;
        this.releaseDate = releaseDate;
        this.rating = rating;
    }

    public Movie() {

    }
}
