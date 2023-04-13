import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { addMovie } from "../functions.js";

function AddMovieDropdown({ id, imgURL, title, releaseDate, rating, watchlists, handleShow }) {
  return (
    <Dropdown onClick={(e) => e.stopPropagation()}>
      <Dropdown.Toggle variant="primary" id={imgURL}>
        Add to Watchlist
      </Dropdown.Toggle>
      <Dropdown.Menu aria-labelledby={imgURL}>
        {watchlists.map((element, index) => (
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
