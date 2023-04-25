import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateWatchlistButton from "../components/CreateWatchlistButton";
import CreateWatchlistModal from "../components/CreateWatchlistModal";
import GetSuggestionListButton from "../components/GetSuggestionListButton";
import GetSuggestionListModal from "../components/GetSuggestionListModal";
import EditWatchlistModal from "../components/EditWatchlistModal";
import DeleteWatchlistModal from "../components/DeleteWatchlistModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../components/NavBar";


function Watchlist() {
  const [list, updateList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [suggestionShow, setSuggestionShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [watchlist, setWatchlist] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSuggestionClose = () => setSuggestionShow(false);
  const handleSuggestionShow = () => setSuggestionShow(true);

  const handleEditClose = () => setEditShow(false);
  const handleEditShow = () => setEditShow(true);

  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = () => setDeleteShow(true);

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
        if (Object.keys(response.data).length !== 0) {
          console.log(response.data);

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
    setWatchlist(watchlist);
    handleDeleteShow();
  }

  function handleEdit(e, watchlist) {
    e.stopPropagation();
    setWatchlist(watchlist);
    handleEditShow();
  }

  // On page load
  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="text-center pb-3 pt-3">
          <h1>Watchlists</h1>
        </div>
        <div className="row mb-3">
          <div className="col-sm">{!loading && list.length == 0 ? <h2>No watchlist created yet</h2> : null}</div>
          <div className="col-sm text-end">
            <CreateWatchlistButton handleShow={handleShow}></CreateWatchlistButton>
            <GetSuggestionListButton handleShow={handleSuggestionShow}></GetSuggestionListButton>
          </div>
        </div>
        {!loading &&
          list.map((element, index) => (
            <div className="row mb-4 watchlistRow" key={index} onClick={() => navigateWatchlistDetail(element["name"])}>
              <div className="col-6">
                <h1>{element["name"]}</h1>
              </div>
              <div className="col-6 text-end align-self-center">
                <FontAwesomeIcon
                  id="editWatchlist"
                  data-testid="edit-icon"
                  icon={faPen}
                  onClick={(e) => handleEdit(e, element["name"])}
                />
                <FontAwesomeIcon
                  id="deleteWatchlist"
                  data-testid="delete-icon"
                  icon={faTrash}
                  onClick={(e) => handleDelete(e, element["name"])}
                />
              </div>
            </div>
          ))}
        <CreateWatchlistModal
          movies={[]}
          show={show}
          handleClose={handleClose}
          fetchWatchlist={fetchWatchlist}
        ></CreateWatchlistModal>
        <GetSuggestionListModal
          show={suggestionShow}
          handleClose={handleSuggestionClose}
          fetchWatchlist={fetchWatchlist}
          watchlists={list}
        ></GetSuggestionListModal>
        <EditWatchlistModal
          show={editShow}
          handleClose={handleEditClose}
          fetchWatchlist={fetchWatchlist}
          watchlistOld={watchlist}
        ></EditWatchlistModal>
        <DeleteWatchlistModal
          show={deleteShow}
          handleClose={handleDeleteClose}
          fetchWatchlist={fetchWatchlist}
          watchlist={watchlist}
        ></DeleteWatchlistModal>
      </div>
    </div>
  );
}

export default Watchlist;
