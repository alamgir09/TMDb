package edu.usc.csci310.project;

import java.util.ArrayList;

public class Watchlist {
    String name;
    String type;
    ArrayList<Movie> movies = new ArrayList<Movie>();

    public String getName(){return name;}
    public String getType(){return type;}
    public ArrayList<Movie> getMovies(){return movies;}

    public void setName(String name){this.name = name;}
    public void setType(String type){this.type = type;}
    public void addMovies(Movie movie){movies.add(movie);}

    public Watchlist(String name, String type){
        this.name = name;
        this.type = type;
    }

    public Watchlist() {

    }
}
