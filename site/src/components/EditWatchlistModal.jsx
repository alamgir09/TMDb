import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function EditWatchlistModal({ show, handleClose, fetchWatchlist, watchlistOld }) {
  const [watchlistName, setWatchlistName] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  function handleEditWatchlistForm(e) {
    e.preventDefault();

    // reset errorMessage if needed
    setErrorMessage("");

    // check if inputs have been entered
    if (watchlistName.length == "") {
      setErrorMessage("Please enter watchlist name");
      return;
    }

    // Construct the API request
    const apiUrl = "api/editWatchlist";
    const requestData = {
      watchlistOld: watchlistOld,
      watchlistNew: watchlistName,
      userID: localStorage.getItem("userID"),
      operation: "edit"
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
          setWatchlistName("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title id="editWatchlistTitle">Edit Watchlist</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={watchlistName}
              onChange={(e) => setWatchlistName(e.target.value)}
              placeholder={watchlistOld}
              required
            />
          </Form.Group>
        </Form>
        {errorMessage ? <div style={{ color: "red", textAlign: "center" }}>{errorMessage}</div> : null}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleEditWatchlistForm}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditWatchlistModal;
