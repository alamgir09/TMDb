import React from "react";
import DeleteMovieComponent from "./DeleteMovieComponent";
import CopyMovieComponent from "./CopyMovieComponent";
import MoveMovieComponent from "./MoveMovieComponent";

function MovieBoxWatchlist({ id, imgURL, title, release_date, rating, list, modal }) {

  return (
    <div className="movie-row-watchlist row mt-4">
      <div className="col-3 col-md-2 movie-row-watchlist-img-div">
        <img src={imgURL} alt={title} />
      </div>
      <div className="col-9 col-md-10">
        <div className="row h-100">
          <div className="col-sm-4 inner-text">{title}</div>
          <div className="col-sm-2 inner-text">{release_date}</div>
          <div className="col-sm-2 inner-text">
            <strong>{rating}</strong>
          </div>
          <div className="col-sm-4 inner-text">
            <CopyMovieComponent
              id={id}
              imgURL={imgURL}
              title={title}
              releaseDate={release_date}
              rating={rating}
              watchlists={list}
              modal={modal}
            />
            <MoveMovieComponent
              id={id}
              imgURL={imgURL}
              title={title}
              releaseDate={release_date}
              rating={rating}
              watchlists={list}
              modal={modal}
            />

            <DeleteMovieComponent id={id} title={title} modal={modal} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieBoxWatchlist;
