import React, { useState, useEffect } from "react";
// import {Component} from 'react';
import CollageRow from "./CollageRow.jsx";
import "../styles/collage.css";

function Collage({movieIDList}) {

  console.log("COLLAGE");
  console.log(movieIDList);

  //IMPORTANT: these 2 arrays line up perfectly

  //store the image urls
  const [imageURLs, setImageURLs] = useState([]);

  //also keep track of the corresponding movie id
  const [movieIDs, setMovieIDs] = useState([]);

  //get the image urls from the movie ids
  async function getImageURLs() {

    var urls = [];
    var ids = [];

    //for each movie id, do an api call to get the images, on success add a certain amount of those images to the image url array
    for (var i = 0; i < movieIDList.length; i++) {
      //get the id
      var id = movieIDList[i];

      //get the number of movies
      var numMovies = movieIDList.length;

      //default one per image
      var numImages = 1;

      //if there are less than 10 movies... do some math
      if (numMovies < 10) {
        numImages = getNumImages(numMovies);
      }

      var url = "https://api.themoviedb.org/3/movie/" + id + "/images?api_key=528c625029ff80e41b72cc37a0c389af"

      console.log(numImages);

      try {
        let response = await fetch(url);
        let json = await response.json();

        //get the backdrops
        var backdrops = json["backdrops"];

        console.log("backdrops:");
        console.log(backdrops);

        //add a certain number of images to the image url array
        for (var j = 0; j < Math.min(backdrops.length, numImages); j++) {
          var path = backdrops[j]["file_path"];
          var fullURL = "http://image.tmdb.org/t/p/w400" + path;
          urls.push(fullURL);
          ids.push(id);
        }

        //if the api has less than the required amount of images for this movie, add in duplicates
        if(backdrops.length < numImages){
            console.log("NEED MORE");
            var index = 0;
            for(var overflow = backdrops.length; overflow < numImages; overflow++){
                path = backdrops[index]["file_path"];
                fullURL = "http://image.tmdb.org/t/p/w400" + path;
                urls.push(fullURL);
                ids.push(id);
                index++;
            }
        }

      } catch (err) {
        console.log(err);
        //handleFetchResponse("An API error occurred");
      }
    }
    setImageURLs(urls);
    setMovieIDs(ids);
  }


  function getNumImages(numMovies) {
    return Math.ceil(10 / numMovies);
  }


  function BuildCollage() {
    //maximum number of rows (I think this will work in terms of responsiveness)
    var maxRows = 4;

    //make this dependent on the number of images...
    var columns = 0;

    console.log("number of images: " + imageURLs.length);

    columns = Math.ceil(imageURLs.length / maxRows);

    console.log("columns: " + columns);

    //get the # of rows
    var rows = Math.floor(imageURLs.length / columns);

    //get the remainder
    var remainder = imageURLs.length % 4;

    //ok so now that we know the # of columns we can specify the size (percentage) of the columns
    var width = 100 / columns;

    //store the html to be injected (doing this with react will be easier)
    var collageRows = [];

    //build out the rows
    for (var i = 0; i < rows; i++) {
      collageRows.push(
        <CollageRow
          key={"collageRow" + i}
          startIndex={i * columns}
          numColumns={columns}
          images={imageURLs}
          movieIDs={movieIDs}
          width={width}
//           data-testid={`collage // add test id attribute
        />
      );
    }

    //if there is a remainder, you need to build out the last row for the leftover images
    if (remainder > 0) {
      collageRows.push(
        <CollageRow
          key={"collageRow" + i}
          startIndex={rows * columns}
          numColumns={remainder}
          images={imageURLs}
          movieIDs={movieIDs}
          width={width}

        />
      );
    }

    return <div id="collage" data-testid="collageTestID">{collageRows}</div>
  }

  useEffect(() => {
    getImageURLs();
  }, []);

  return (
    <div>{BuildCollage()};</div>
  );
}

export default Collage;
