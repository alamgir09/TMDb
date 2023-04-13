import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faGlobe } from "@fortawesome/free-solid-svg-icons";

function WatchlistTypeDropdown({ type }) {
  const [watchlistDiv, setWatchlistDiv] = useState();
  const [isPublic, setIsPublic] = useState(false);

  function handleUpdateWatchlistType(type) {
    const apiUrl = "api/editWatchlist";
    const requestData = {
      userID: localStorage.getItem("userID"),
      watchlistOld: localStorage.getItem("watchlist"),
      type: type,
      operation: "update"
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
        if (response.data == "Success") {
          console.log("changed type success");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // when watchlistType mounts
  useEffect(() => {
    if (type === "Private") {
      setWatchlistDiv(
        <>
          <FontAwesomeIcon icon={faLock} /> Private
        </>
      );
      setIsPublic(false);
    }

    if (type === "Public") {
      setWatchlistDiv(
        <>
          <FontAwesomeIcon icon={faGlobe} /> Public
        </>
      );
      setIsPublic(true);
    }
  }, [type]);

  function handleClick(type) {
    if (type === "Private") {
      setWatchlistDiv(
        <>
          <FontAwesomeIcon icon={faLock} /> Private
        </>
      );
      setIsPublic(false);
    }

    if (type === "Public") {
      setWatchlistDiv(
        <>
          <FontAwesomeIcon icon={faGlobe} /> Public
        </>
      );
      setIsPublic(true);
    }

    handleUpdateWatchlistType(type);
  }

  return (
    <Dropdown>
      <Dropdown.Toggle id="watchlistTypeBtn" size="lg" variant="outline-primary">
        {watchlistDiv}
      </Dropdown.Toggle>
      <Dropdown.Menu className="watchlistTypeMenu">
        <Dropdown.Item
          id="publicWatchlist"
          data-testid="publicWatchlist"
          onClick={() => handleClick("Public")}
          className={isPublic === true ? "active" : ""}
          href="#"
        >
          <div className="row">
            <div className="col-2 inner-text">
              <FontAwesomeIcon size="2x" icon={faGlobe} />
            </div>
            <div className="col-10">
              <div className="row">
                <div className="col-12">
                  <h3>Public</h3>
                  <p>People can view your watchlist and compare with it theirs</p>
                </div>
              </div>
            </div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item
          id="privateWatchlist"
          data-testid="privateWatchlist"
          onClick={() => handleClick("Private")}
          className={isPublic === false ? "active" : ""}
          href="#"
        >
          <div className="row">
            <div className="col-2 inner-text">
              <FontAwesomeIcon size="2x" icon={faLock} />
            </div>
            <div className="col-10">
              <div className="row">
                <div className="col-12">
                  <h3>Private</h3>
                  <p>Only you can view your watchlist</p>
                </div>
              </div>
            </div>
          </div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default WatchlistTypeDropdown;
