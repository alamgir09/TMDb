import React from "react";

export function addMovie(id, title, imgURL, releaseDate, rating, watchlist, modal) {
  // Construct the API request
  const apiUrl = "api/addMovie";
  const requestData = {
    watchlist: watchlist,
    userID: localStorage.getItem("userID"),
    movie: { id: id, title: title, imgURL: imgURL, releaseDate: releaseDate, rating: rating }
  };

  const requestHeaders = {
    "Content-Type": "application/json"
  };
  const requestOptions = {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(requestData)
  };

  // Send the API request
  fetch(apiUrl, requestOptions)
    .then((res) => res.json())
    .then((response) => {
      if (response.data == "Success") {
        console.log("Success");
        modal({
          show: true,
          data: {
            text: <p className="text-center">Success</p>
          }
        });
      } else if (response.data == "Movie already exists") {
        console.log("movie already exists");
        modal({
          show: true,
          data: {
            text: <p className="text-center">Error: Movie already exists</p>
          }
        });
      }
      //      setTimeout(() => {
      //        modal({
      //          show: false,
      //          data: {
      //            text: null
      //          }
      //        });
      //      }, 3000);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function deleteMovie(id, watchlistFrom, watchlistTo) {
  const apiUrl = "api/deleteMovie";
  const requestData = {
    userID: localStorage.getItem("userID"),
    movieID: id,
    watchlistFrom: watchlistFrom,
    watchlistTo: watchlistTo
  };
  const requestHeaders = {
    "Content-Type": "application/json"
  };
  const requestOptions = {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(requestData)
  };

  fetch(apiUrl, requestOptions)
    .then((res) => res.json())
    .then((response) => {
      if (response.data == "Success") {
        console.log("movie deleted success");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
