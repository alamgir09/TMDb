import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faTrash, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { addMovie, deleteMovie } from "../functions.js";

function MoveMovieComponent({ id, imgURL, title, releaseDate, rating, watchlists, modal }) {
  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <FontAwesomeIcon
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      icon={faArrowRightFromBracket}
      {...children}
    />
  ));

  //   function moveMovie(watchlist) {
  //     console.log("move movie called");
  //     deleteMovie(id, localStorage.getItem("watchlist"));
  //     addMovie(id, title, imgURL, releaseDate, rating, watchlist);
  //     fetchMovies();
  //   }

  function openMove(watchlist) {
    console.log("open move called");
    modal({
      show: true,
      data: {
        id: id,
        title: title,
        imgURL: imgURL,
        releaseDate: releaseDate,
        rating: rating,
        type: "move",
        watchlist: watchlist,
        text: `Are you sure you want to move [${title}] to [${watchlist}]?`
      }
    });
  }

  return (
    <Dropdown style={{ display: "inline" }}>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components"></Dropdown.Toggle>
      <Dropdown.Menu>
        {watchlists.map((element, index) => {
          if (element.name != localStorage.getItem("watchlist"))
            return (
              <Dropdown.Item onClick={() => openMove(element.name)} href="#" key={index}>
                {element.name}
              </Dropdown.Item>
            );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MoveMovieComponent;
