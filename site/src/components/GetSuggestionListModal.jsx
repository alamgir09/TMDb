import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function GetSuggestionListModal({ show, handleClose, fetchWatchlist, watchlists }) {
  const [watchlistName, setWatchlistName] = useState("");
  const [type, setType] = useState("Private");
  const [moviesCount, setMoviesCount] = useState(5);
  const [selectedWatchLists, setSelectedWatchlists] = useState([]);
  const [errorMessage, setErrorMessage] = useState();


  function onValueChange(event) {
    setType(event.target.value);
  }

  function handleMoviesCountChange(event) {
    setMoviesCount(event.target.value);
  }

  function handleCreateSuggestions(e) {
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
        if (response.data == "Success") {
          fetchWatchlist();
          handleClose();
          setWatchlistName("");
          setType("Private");
        }
        if (response.data == "Watchlist already exists") {
          setErrorMessage("Watchlist already exists");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title id="createSuggestionListTitle">Create Suggestion list</Modal.Title>
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
          <Form.Group className="mb-3">
            <Form.Label>Number of movies:</Form.Label>
            <Form.Control
              type="range"
              min="1"
              max="10"
              step="1"
              value={moviesCount}
              onChange={handleMoviesCountChange}
            />
            <Form.Text>{moviesCount}</Form.Text>
          </Form.Group>
          <Form.Group controlId="formWatchlists">
            <Form.Label>Select Watchlists (Shift + Click)</Form.Label>
            <Form.Control
              as="select"
              multiple
              value={selectedWatchLists}
              onChange={(e) =>
                setSelectedWatchlists(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
            >
              {watchlists.map((watchlist) => (
                <option key={watchlist.id} value={watchlist.name}>
                  {watchlist.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
        {errorMessage ? <div style={{ color: "red", textAlign: "center" }}>{errorMessage}</div> : null}
      </Modal.Body>
      <Modal.Footer>
        <Button data-testid="createHandleClose" id="createWatchlistDeleteBtn" variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleCreateSuggestions}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GetSuggestionListModal;
