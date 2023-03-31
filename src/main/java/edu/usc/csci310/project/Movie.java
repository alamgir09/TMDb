package edu.usc.csci310.project;

public class Movie {
    String title;
    String imgURL;
    String releaseDate;
    String rating;

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

    public Movie(String title, String imgURL, String releaseDate, String rating) {
        this.title = title;
        this.imgURL = imgURL;
        this.releaseDate = releaseDate;
        this.rating = rating;
    }

    public Movie() {

    }
}
