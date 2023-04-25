import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { addMovie } from "../functions.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AddMovieDropdown({ id, imgURL, title, releaseDate, rating, watchlists, handleShow }) {
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState({ data: { text: null } });
  const [watchlist, setWatchlist] = useState("");

  const handleCloseAdd = () => setShow(false);
  // const handleShowAdd = () => setShow(true);

  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <FontAwesomeIcon
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      icon={faPlus}
      data-testid="add-icon"
      {...children}
    />
  ));

  function handleShowAdd(watchlistName) {
    setShow(true);
    setModal({
      data: {
        text: (
          <p className="text-center">
            Are you sure you want to add [{title}] to [{watchlistName}]?
          </p>
        )
      }
    });
  }

  function handleAddMovie() {
    addMovie(id, title, imgURL, releaseDate, rating, watchlist, setModal);
    // close after 3 seconds
    setTimeout(() => {
      handleCloseAdd();
    }, 3000);
  }

  return (
    <Dropdown onClick={(e) => e.stopPropagation()}>
      <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>
      <Dropdown.Menu aria-labelledby={imgURL} align="end">
        {watchlists.map((element, index) => (
          <Dropdown.Item
            href="#"
            //onClick={() => addMovie(id, title, imgURL, releaseDate, rating, element.name)}
            onClick={() => {
              handleShowAdd(element.name);
              setWatchlist(element.name);
            }}
            key={index}
          >
            {element.name}
          </Dropdown.Item>
        ))}
        <Dropdown.Item className="text-white bg-dark" onClick={() => handleShow()}>
          Create Watchlist
        </Dropdown.Item>
      </Dropdown.Menu>
      {/* Modal for Add Movie to Watchlist */}
      <Modal show={show} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center pt-4 pb-4">{modal.data.text ? modal.data.text : null}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseAdd}>
            Close
          </Button>
          <Button data-testid="add-btn" variant="success" onClick={() => handleAddMovie()}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </Dropdown>
  );
}

export default AddMovieDropdown;
