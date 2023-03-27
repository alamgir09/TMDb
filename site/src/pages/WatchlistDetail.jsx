import React, { useState, useEffect, useRef } from "react";

function WatchlistDetail() {
  const [heading, setHeading] = useState();
  const [list, updateList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState();

  // api request to get movies for current user
  const apiUrl = "api/getMovies";

  const requestData = {
    userID: localStorage.getItem("userID"),
    watchlist: localStorage.getItem("watchlist"),
  };
  const requestHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(requestData),
  };

  function fetchMovies() {
    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        if (response?.data) {
          console.log(response.data);
          console.log(JSON.parse(response.data));

          var jsonObject = JSON.parse(response.data);
          if (jsonObject.length == 0) {
            setHeading(<h2>No Movies added yet</h2>);
          } else {
            updateList(jsonObject);
            setLoading(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setHeading("An API error occurred");
      });
  }

  // On page load
  useEffect(() => {
    fetchMovies();
    setWatchlist(localStorage.getItem("watchlist"));
  }, []);

  return (
    <div className="container">
      <div className="text-center pb-3 pt-3">
        <h1>{watchlist}</h1>
      </div>
      <div className="row mb-3">
        <div className="col-sm">{heading}</div>
        <div className="col-sm text-end">
          <button className="btn btn-danger">Compare Watchlist</button>
        </div>
      </div>
      {!loading &&
        list.map((element, index) => (
          <div className="row mb-3 watchlistRow" key={index}>
            <div className="col">
              <h1>{element["name"]}</h1>
            </div>
          </div>
        ))}
    </div>
  );
}

export default WatchlistDetail;
