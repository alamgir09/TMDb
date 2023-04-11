import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faTrash, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function DeleteMovieComponent({ id, title, watchlists, modal }) {
  //   function deleteMovie(){
  //     const apiUrl = "api/deleteMovie";
  //     const requestData = {
  //       userID: localStorage.getItem("userID"),
  //       movieID: id,
  //       watchlist: localStorage.getItem("watchlist")
  //     };
  //     const requestHeaders = {
  //       "Content-Type": "application/json"
  //     };
  //     const requestOptions = {
  //       method: "POST",
  //       headers: requestHeaders,
  //       body: JSON.stringify(requestData)
  //     };
  //
  //     fetch(apiUrl, requestOptions)
  //       .then((res) => res.json())
  //       .then((response) => {
  //         if (response.data == "Success") {
  //           console.log("deleted movie success");
  //           fetchMovies();
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }

  function openDelete() {
    console.log("open delete called");
    const watchlist = localStorage.getItem("watchlist");
    modal({
      show: true,
      data: {
        id: id,
        title: title,
        type: "delete",
        watchlist: watchlist,
        text: `Are you sure you want to delete [${title}] from [${watchlist}]?`
      }
    });
  }

  return <FontAwesomeIcon icon={faTrash} onClick={() => openDelete()} />;
}

export default DeleteMovieComponent;
