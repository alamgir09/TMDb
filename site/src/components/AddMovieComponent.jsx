import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

function AddMovieDropdown({ imgURL, title, releaseDate, rating, watchlists, handleShow }) {
  function AddMovie(watchlist) {
    // Construct the API request
    const apiUrl = "api/addMovie";
    const requestData = {
      watchlist: watchlist,
      userID: localStorage.getItem("userID"),
      movie: { title: title, imgURL: imgURL, releaseDate: releaseDate, rating: rating }
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
          console.log(response.data);
          //               fetchWatchlist();
          //               handleClose();
          //               setWatchlistName("");
          //               setType("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id={imgURL}>
        Add to Watchlist
      </Dropdown.Toggle>
      <Dropdown.Menu aria-labelledby={imgURL}>
        {watchlists.map((element, index) => (
          <Dropdown.Item href="#" onClick={() => AddMovie(element.name)} key={index}>
            {element.name}
          </Dropdown.Item>
        ))}
        <Dropdown.Item className="text-white bg-dark" onClick={() => handleShow()}>
          Create Watchlist
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default AddMovieDropdown;
