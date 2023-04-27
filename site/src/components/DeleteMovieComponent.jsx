import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function DeleteMovieComponent({ id, title, modal }) {
  function openDelete() {
    const watchlist = localStorage.getItem("watchlist");
    modal({
      show: true,
      data: {
        id: id,
        title: title,
        type: "delete",
        watchlist: watchlist,
        text: (
          <div className="text-center">
            <p>
              Are you sure you want to delete [{title}] from [{watchlist}]?
            </p>
            <p>This action cannot be undone.</p>
          </div>
        )
      }
    });
  }

  return <FontAwesomeIcon data-testid="delete-icon" icon={faTrash} onClick={() => openDelete()} />;
}

export default DeleteMovieComponent;
