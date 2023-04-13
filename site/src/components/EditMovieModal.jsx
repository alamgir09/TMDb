import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { addMovie, deleteMovie } from "../functions.js";

function EditMovieModal({ modal, handleClose, fetchMovies }) {

  function handleClick() {
    if (modal.data.type == "copy") {
      addMovie(
        modal.data.id,
        modal.data.title,
        modal.data.imgURL,
        modal.data.releaseDate,
        modal.data.rating,
        modal.data.watchlist
      );
    }

    if (modal.data.type == "move") {
      addMovie(
        modal.data.id,
        modal.data.title,
        modal.data.imgURL,
        modal.data.releaseDate,
        modal.data.rating,
        modal.data.watchlist
      );
      deleteMovie(modal.data.id, localStorage.getItem("watchlist"));
    }

    if (modal.data.type == "delete") {
      deleteMovie(modal.data.id, modal.data.watchlist);
    }

    setTimeout(() => {
      handleClose();
      fetchMovies();
    }, 1000);
  }

  return (
    <Modal data-testid="editMovieModal" id="editMovieModal" show={modal.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title id="editMovieTitle">Edit Movie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modal.data.text ? <p className="text-center">{modal.data.text}</p> : null}
        <p className="text-center">This action can not be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button data-testid="editMovieClose" variant="success" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleClick}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditMovieModal;
