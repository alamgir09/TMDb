import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CreateWatchlistModal({ show, handleClose, fetchWatchlist }) {
  const [watchlistName, setWatchlistName] = useState("");
  const [type, setType] = useState("Private");
  const [errorMessage, setErrorMessage] = useState();

  function onValueChange(event) {
    setType(event.target.value);
  }

  function handleCreateWatchlistForm(e) {
    e.preventDefault();

    // reset errorMessage if needed
    setErrorMessage("");

    // check if inputs have been entered
    if (watchlistName.length == "" || type == "") {
      setErrorMessage("Please fill in all fields");
      return;
    }

    // Construct the API request
    const apiUrl = "api/createWatchlist";
    const requestData = {
      watchlist: watchlistName,
      userID: localStorage.getItem("userID"),
      type: type
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
        if (response?.data) {
          if (response.data == "Success") {
            fetchWatchlist();
            handleClose();
            setWatchlistName("");
            setType("");
          } else if (response.data == "Watchlist already exists") {
            setErrorMessage("Watchlist already exists");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title id="createWatchlistTitle">Create Watchlist</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={watchlistName}
              onChange={(e) => setWatchlistName(e.target.value)}
              placeholder="Name"
              required
            />
          </Form.Group>
          <h5>Type</h5>
          <Form.Check>
            <Form.Check.Input
              type="radio"
              name="flexRadio"
              id="radioPublic"
              onChange={(e) => onValueChange(e)}
              checked={type === "Public"}
              value="Public"
            />
            <Form.Check.Label htmlFor="radioPublic">Public</Form.Check.Label>
          </Form.Check>
          <Form.Check>
            <Form.Check.Input
              type="radio"
              name="flexRadio"
              id="radioPrivate"
              onChange={(e) => onValueChange(e)}
              checked={type === "Private"}
              value="Private"
            />
            <Form.Check.Label htmlFor="radioPrivate">Private</Form.Check.Label>
          </Form.Check>
        </Form>
        {errorMessage ? <div style={{ color: "red", textAlign: "center" }}>{errorMessage}</div> : null}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleCreateWatchlistForm}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateWatchlistModal;
