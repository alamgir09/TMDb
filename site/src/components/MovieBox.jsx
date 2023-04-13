import React from "react";
import { useNavigate } from "react-router-dom";
import AddMovieDropdown from "./AddMovieComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faEye } from "@fortawesome/free-solid-svg-icons";

function MovieBox({ id, imgURL, title, release_date, rating, list, handleShow }) {
  const navigate = useNavigate();

  if (id == "" || id == null) id = "?";
  if (imgURL == "" || imgURL == null) imgURL = "?";
  if (title == "" || title == null) title = "?";
  if (release_date == "" || release_date == null) release_date = "?";
  if (rating == "" || rating == null) rating = "?";

  //     const openPost = (e) => {
  //         history.push(`/posts/2000`);
  //     };
  const handleClick = (id) => {
    //         console.log(id)
    navigate(`/movies/${id}`);
  };

  return (
    <div className="movie-row col-12 mt-4">
      <div className="col-12 movieButton" onClick={() => handleClick(id)}>
        <img src={imgURL} alt={title} />
        <div className="col-3 inner-text">{title}</div>
        <div className="col-3 inner-text">{release_date}</div>
        <div className="col-3 inner-text">
          <strong>{rating}</strong>
        </div>
        <div className="box-hover-elements col-1 inner-text">
          <AddMovieDropdown
            id={id}
            imgURL={imgURL}
            title={title}
            releaseDate={release_date}
            rating={rating}
            watchlists={list}
            handleShow={handleShow}
          />
          <div>
            <FontAwesomeIcon
              data-testid="eye-icon"
              icon={faEye}
            />
            {/* Little Eye */}
          </div>
          <div>
            <FontAwesomeIcon
              data-testid="dollar-icon"
              icon={faDollarSign}
              // onClick={(e) => handleDelete(e, element["name"])}
            />
            {/* Dollar Sign */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieBox;
