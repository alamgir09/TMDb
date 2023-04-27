import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { addMovie, deleteMovie } from "../functions.js";

function EditMovieModal({ modal, handleClose, fetchMovies, setModal }) {
  function handleClick() {
    if (modal.data.type == "copy") {
      addMovie(
        modal.data.id,
        modal.data.title,
        modal.data.imgURL,
        modal.data.releaseDate,
        modal.data.rating,
        modal.data.watchlist,
        setModal
      );
    }

    if (modal.data.type == "move") {
      addMovie(
        modal.data.id,
        modal.data.title,
        modal.data.imgURL,
        modal.data.releaseDate,
        modal.data.rating,
        modal.data.watchlist,
        setModal
      );
      deleteMovie(modal.data.id, localStorage.getItem("watchlist"), modal.data.watchlist);
    }

    if (modal.data.type == "delete") {
      console.log("id: " + modal.data.id);
      console.log("watchlist: " + modal.data.watchlist);
      deleteMovie(modal.data.id, modal.data.watchlist, "null");
    }
    console.log("show: " + modal.data.show);

    setTimeout(() => {
      handleClose();
      fetchMovies();
    }, 3000);
  }

  return (
    <Modal data-testid="editMovieModal" id="editMovieModal" show={modal.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title id="editMovieTitle">Edit Movie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modal.data.text ? modal.data.text : null}
        {/*         <p className="text-center">This action cannot be undone.</p> */}
        {/*         {modalBody ? <p className="text-center">{modalBody}</p> : null} */}
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
