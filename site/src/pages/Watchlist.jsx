import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddMovieDropdown from "../components/AddMovieComponent";
import CreateWatchlistButton from "../components/CreateWatchlistButton";
import CreateWatchlistModal from "../components/CreateWatchlistModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

function Watchlist() {
  const [list, updateList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Calling navigate() will allow us to redirect the webpage
  const navigate = useNavigate();

  function navigateWatchlistDetail(currentWatchlist) {
    localStorage.setItem("watchlist", currentWatchlist);
    navigate("/WatchlistDetail");
  }

  // api request to get watchlist for current user
  function fetchWatchlist() {
    const apiUrl = "api/getWatchlist";
    const requestData = {
      userID: localStorage.getItem("userID")
    };
    const requestHeaders = {
      "Content-Type": "application/json"
    };
    const requestOptions = {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(requestData)
    };

    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        if (response?.data) {
          console.log(response.data);
          console.log(JSON.parse(response.data));

          var jsonObject = JSON.parse(response.data);
          updateList(jsonObject);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDelete(e, watchlist) {
    e.stopPropagation();
    console.log("delete watchlist: " + watchlist);
  }

  function handleEdit(e, watchlist) {
    e.stopPropagation();
    console.log("edit watchlist: " + watchlist);
  }

  // On page load
  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <div className="container">
      <div className="text-center pb-3 pt-3">
        <h1>Watchlists</h1>
      </div>
      <div className="row mb-3">
        <div className="col-sm">{!loading && list.length == 0 ? <h2>No watchlist created yet</h2> : null}</div>
        <div className="col-sm text-end">
          <CreateWatchlistButton handleShow={handleShow}></CreateWatchlistButton>
        </div>
        <div className="col-sm">
          <AddMovieDropdown
            imgURL="url"
            title="title"
            releaseDate="2022"
            rating="8.9"
            watchlists={list}
            handleShow={handleShow}
          />
        </div>
      </div>
      {!loading &&
        list.map((element, index) => (
          <div className="row mb-3 watchlistRow" key={index} onClick={() => navigateWatchlistDetail(element["name"])}>
            <div className="col-10">
              <h1>{element["name"]}</h1>
            </div>
            <div className="col-2 align-self-center">
              <FontAwesomeIcon data-testid="edit-icon" icon={faPen} onClick={(e) => handleEdit(e, element["name"])} />
              <FontAwesomeIcon
                data-testid="delete-icon"
                icon={faTrash}
                onClick={(e) => handleDelete(e, element["name"])}
              />
            </div>
          </div>
        ))}
      <CreateWatchlistModal
        show={show}
        handleClose={handleClose}
        fetchWatchlist={fetchWatchlist}
      ></CreateWatchlistModal>
    </div>
  );
}

export default Watchlist;
