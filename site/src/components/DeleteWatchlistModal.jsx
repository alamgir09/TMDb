import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function DeleteWatchlistModal({ show, handleClose, fetchWatchlist, watchlist }) {
  function handleDeleteWatchlistForm(e) {
    e.preventDefault();
    // Construct the API request
    const apiUrl = "api/editWatchlist";
    const requestData = {
      watchlistOld: watchlist,
      userID: localStorage.getItem("userID"),
      operation: "delete"
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
          fetchWatchlist();
          handleClose();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title id="editWatchlistTitle">Delete Watchlist</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-center"> Are you sure you want to delete this watchlist?</p>
        <p className="text-center">This action can not be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button data-testid="deleteHandleClose" variant="success" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDeleteWatchlistForm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteWatchlistModal;
