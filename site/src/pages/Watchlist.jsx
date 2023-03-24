import React, { useState } from 'react';

function Watchlist() {

  // Construct the API request
  const apiUrl = 'api/watchlist';
  const requestData = {
    userID: localStorage.get("userID")
  };
  const requestHeaders = {
    'Content-Type': 'application/json'
  };
  const requestOptions = {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(requestData)
  };

  // Send the API request
  fetch(apiUrl, requestOptions)
    .then((res) => res.json())
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err)
      // handleFetchResponse("An API error occurred");
    });

  return (
    <div className="container-fluid">
      <div className="text-center pb-3 pt-3"><h1>Watchlist</h1></div>
    </div>
  );
}

export default Watchlist;