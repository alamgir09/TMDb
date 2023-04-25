import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";

function CompareWatchlistComponent({ handleShow, setUsers }) {
  function fetchWatchlistUsers() {
    const apiUrl = "api/getWatchlistUsers";
    const requestData = {
      userID: localStorage.getItem("userID")
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
        console.log(response.data);

        var jsonObject = JSON.parse(response.data);
        console.log(jsonObject);
        setUsers(jsonObject);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchWatchlistUsers();
  }, []);

  return (
    <Button id="compareWatchlist" onClick={() => handleShow()} variant="danger">
      Compare Watchlist
    </Button>
  );
}

export default CompareWatchlistComponent;
