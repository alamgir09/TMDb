import React, { useState, useEffect } from "react";

function WatchlistDetail() {
  const [list, updateList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState();

  // api request to get movies for current user
  function fetchMovies() {
    const apiUrl = "api/getMovies";

    const requestData = {
      userID: localStorage.getItem("userID"),
      watchlist: localStorage.getItem("watchlist")
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
        if (response?.data) {
          console.log(response.data);
          console.log(JSON.parse(response.data));

          var jsonObject = JSON.parse(response.data);
          updateList(jsonObject);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
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
        <div className="col-sm">{!loading && list.length == 0 ? <h2>No movies added yet</h2> : null}</div>
        <div className="col-sm text-end">
          <button className="btn btn-danger">Edit Watchlist</button>
        </div>
      </div>
      {!loading &&
        list.map((element, index) => (
          <div className="row mb-3 watchlistRow" key={index}>
            <div className="col">
              <h1>{element["title"]}</h1>
            </div>
          </div>
        ))}
    </div>
  );
}

export default WatchlistDetail;
