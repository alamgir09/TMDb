import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

function CompareWatchlistModal({
  users,
  handleClose,
  show,
  userAMovies,
  mergedMovies,
  createModalOpen,
  setMergedMovies
}) {
  const [selectUser, setSelectUser] = useState(true);
  const [username, setUsername] = useState();
  const [selectCompare, setSelectCompare] = useState(false);
  const [bodyHeading, setBodyHeading] = useState("Select an user");

  // modal settings for compare watchlist
  function handleCloseButton() {
    handleClose();
    setSelectUser(true);
    setSelectCompare(false);
    setBodyHeading("Select an user");
  }

  function handleBack() {
    setSelectUser(true);
    setSelectCompare(false);
    setBodyHeading("Select an user");
  }

  // show all Public watchlist for that username
  function handleWatchlist(username) {
    setSelectUser(false);
    setUsername(username);
    setBodyHeading("Select a Watchlist");
  }

  // handle compare watchlist
  function compareWatchlist(watchlist) {
    const userB = users
      .filter((user) => user.username == username)
      .flatMap((user) => user.watchlist.filter((w) => w.name == watchlist))[0].movies;

    console.log(userAMovies);
    console.log(userB);

    const mergedMovies = userAMovies
      .concat(userB)
      .filter((movie, index, self) => index === self.findIndex((m) => m.title === movie.title));

    console.log(mergedMovies);

    const updatedMovies = mergedMovies.map((movie) => {
      const { _id, ...rest } = movie; // destructure _id and rest of the properties
      return { id: _id, ...rest }; // return new object with updated key and all other properties
    });

    console.log(updatedMovies);

    setMergedMovies(updatedMovies);
    setBodyHeading("Merged Movies");
    setSelectCompare(true);
  }

  return (
    <Modal id="compareWatchlistModal" show={show} onHide={() => handleCloseButton()}>
      <Modal.Header closeButton>
        <Modal.Title>Compare Watchlists</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <h3 className="pb-2">{bodyHeading}</h3>
        <ListGroup>
          {selectUser &&
            !selectCompare &&
            users &&
            users.length > 0 &&
            users
              .filter(
                (element) =>
                  element.watchlist.some((watchlist) => watchlist.type === "Public" && watchlist.movies.length > 0) &&
                  element.userID !== localStorage.getItem("userID")
              )
              .map((element, index) => (
                <ListGroup.Item action key={index} onClick={() => handleWatchlist(element.username)}>
                  {element.username}
                </ListGroup.Item>
              ))}
          {!selectUser &&
            !selectCompare &&
            users &&
            users.length > 0 &&
            users
              .filter((element) => element.username === username)
              .flatMap((element) =>
                element.watchlist
                  .filter((watchlist) => watchlist.type === "Public" && watchlist.movies.length > 0)
                  .map((watchlist, index) => (
                    <ListGroup.Item action key={index} onClick={() => compareWatchlist(watchlist.name)}>
                      {watchlist.name}
                    </ListGroup.Item>
                  ))
              )}
          {selectCompare &&
            mergedMovies.map((movie, index) => <ListGroup.Item key={index}>{movie.title}</ListGroup.Item>)}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        {!selectUser && (
          <Button variant="danger" onClick={() => handleBack()}>
            Back to Select User
          </Button>
        )}
        <Button variant="danger" onClick={() => handleCloseButton()}>
          Close
        </Button>
        {selectCompare && (
          <Button
            variant="success"
            onClick={() => {
              handleClose();
              createModalOpen();
            }}
          >
            Add to Watchlist
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default CompareWatchlistModal;
