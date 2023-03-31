import React from "react";
import Button from "react-bootstrap/Button";

function CreateWatchlistButton({ handleShow }) {
  return (
    <Button id="createWatchlist" onClick={() => handleShow()} variant="danger">
      Create Watchlist
    </Button>
  );
}

export default CreateWatchlistButton;
