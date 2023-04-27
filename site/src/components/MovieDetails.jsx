import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const detailsApiUrl =
    "https://api.themoviedb.org/3/movie/" + id + "?api_key=b8f33277c38d4286ab9e30134ebf037e&language=en-US";
  const creditsApiUrl =
    "https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=b8f33277c38d4286ab9e30134ebf037e&language=en-US";
  const [posterPath, setPosterPath] = useState("");
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");

  const [genres, setGenres] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [productionStudios, setProductionStudios] = useState([]);
  const [actors, setActors] = useState([]);

  const requestHeaders = {
    "Content-Type": "application/json"
  };
  const requestOptions = {
    method: "GET",
    headers: requestHeaders
  };

  function fetchDetails() {
    //details API call
    fetch(detailsApiUrl, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setPosterPath(response.poster_path);
        setTitle(response.title);
        setReleaseDate(response.release_date);
        setRating(response.vote_average);
        setDescription(response.overview);

        let movieGenres = response.genres;
        setGenres(movieGenres.map((genres) => genres.name));
        let productionCompanies = response.production_companies;
        setProductionStudios(productionCompanies.map((company) => company.name));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //credit API call
  function fetchCredits() {
    fetch(creditsApiUrl, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        const crew = response.crew;
        const directorNames = crew.filter((member) => member.known_for_department === "Directing");
        setDirectors(directorNames.map((director) => director.name));

        let movieActors = response.cast;
        setActors(movieActors.map((actor) => actor.name));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  let imgURL = "http://image.tmdb.org/t/p/w500" + posterPath;

  const handleActorClick = (actor) => {
    //             console.log(text);
    navigate(`/Search/Actors/${actor}`);
  };
  const handleGenreClick = (genre) => {
    //             console.log(text);
    navigate(`/Search/Genres/${genre}`);
  };

  const genreButtons = genres.map((genre) => (
    <button key={genre} className="text-button" onClick={() => handleGenreClick(genre)}>
      {genre}
    </button>
  ));

  const genreList = genreButtons.reduce((prev, curr) => {
    if (prev === "") return curr;
    else return [prev, ", ", curr];
  }, "");

  const actorButtons = actors.map((actor) => (
    <button key={actor} className="text-button" onClick={() => handleActorClick(actor)}>
      {actor}
    </button>
  ));
  const actorList = actorButtons.reduce((prev, curr) => {
    if (prev === "") return curr;
    else return [prev, ", ", curr];
  }, "");

  useEffect(() => {
    fetchDetails();
    fetchCredits();
  }, []);

  return (
  <div>
  <NavBar />
    <div className="movie-details">
      <div className="movie-image">
        <img src={imgURL} alt={title} />
      </div>
      <div className="movie-info">
        <h1 className="movie-title">{title}</h1>
        <div className="genre"> {genreList} </div>
        <div className="movie-meta">
          <span className="release-date">
            <strong>{releaseDate}</strong>
          </span>
          <span className="rating">
            <strong>{rating}</strong>
          </span>
        </div>
        <div>
          <strong> Director(s): </strong>
        </div>
        <span className="director">{directors.join(", ")}</span>
        <div>
          <strong> Production Studio(s): </strong>
        </div>
        <span className="studio">{productionStudios.join(", ")}</span>
        <div>
          <strong> Cast: </strong>
        </div>
        <div className="movie-cast">{actorList}</div>
        <div className="movie-description">
          <p> {description} </p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default MovieDetails;
