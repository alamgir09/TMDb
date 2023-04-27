import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { addMovie } from "../functions.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AddMovieDropdown({ id, imgURL, title, releaseDate, rating, watchlists, handleShow }) {
  return (
    <Dropdown onClick={(e) => e.stopPropagation()}>
      <Dropdown.Toggle variant="primary" id={imgURL}>
        <FontAwesomeIcon data-testid="plus-icon" icon={faPlus} className="plus-icon" />
      </Dropdown.Toggle>
      <Dropdown.Menu aria-labelledby={imgURL}>
      {watchlists && watchlists.map((element, index) => (
          <Dropdown.Item
            href="#"
            onClick={() => addMovie(id, title, imgURL, releaseDate, rating, element.name)}
            key={index}
          >
            {element.name}
          </Dropdown.Item>
        ))}
        <Dropdown.Item className="text-white bg-dark" onClick={() => handleShow()}>
          Create Watchlist
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default AddMovieDropdown;
