export function addMovie(id, title, imgURL, releaseDate, rating, watchlist) {
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
        console.log("movie added success");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function deleteMovie(id, watchlist) {
  const apiUrl = "api/deleteMovie";
  const requestData = {
    userID: localStorage.getItem("userID"),
    movieID: id,
    watchlist: watchlist
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
