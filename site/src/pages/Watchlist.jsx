import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Watchlist() {
  const [heading, setHeading] = useState();
  const [watchlistName, setWatchlistName] = useState("");
  const [list, updateList] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const ref = useRef(null);
  const [myModal, setMyModal] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Calling navigate() will allow us to redirect the webpage
  const navigate = useNavigate();

  // api request to get watchlist for current user
  const apiUrl = "api/getWatchlist";

  const requestData = {
    userID: localStorage.getItem("userID"),
  };
  const requestHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(requestData),
  };

  function fetchWatchlist() {
    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        if (response?.data) {
          console.log(response.data);
          console.log(JSON.parse(response.data));

          var jsonObject = JSON.parse(response.data);
          if (jsonObject.length == 0) {
            setHeading(<h2>No watchlist created yet</h2>);
          } else {
            updateList(jsonObject);
            setLoading(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setHeading("An API error occurred");
      });
  }

  function handleCreateWatchlistForm(e) {
    e.preventDefault();

    // reset errorMessage if needed
    setErrorMessage("");

    // check if inputs have been entered
    if (watchlistName.length == "" || type == "") {
      setErrorMessage("Please fill in all fields");
      return;
    }

    // Construct the API request
    const apiUrl = "api/createWatchlist";
    const requestData = {
      watchlist: watchlistName,
      userID: localStorage.getItem("userID"),
      type: type,
    };
    const requestHeaders = {
      "Content-Type": "application/json",
    };
    const requestOptions = {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(requestData),
    };

    // Send the API request
    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        if (response?.data) {
          if (response.data == "Success") {
            fetchWatchlist();
            //closeModal();
            setShow(false);
            setWatchlistName("");
            setType("");
          } else if (response.data == "Watchlist already exists") {
            setErrorMessage("Watchlist already exists");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setHeading("An API error occurred");
      });
  }

  function closeModal() {
    myModal.toggle();
  }

  function showModal() {
    myModal.show();
  }

  function navigateWatchlistDetail(currentWatchlist) {
    console.log(currentWatchlist);
    localStorage.setItem("watchlist", currentWatchlist);
    navigate("/WatchlistDetail");
  }

  function WatchlistDropdown() {
    return (
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="true"
        >
          Dropdown button
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <a className="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </div>
    );
  }
  function addMovie() {
    // show dropdown of watchlists
  }

  // On page load
  useEffect(() => {
    fetchWatchlist();
    const element = ref.current;
    // setMyModal(new Modal(element));
  }, []);

  return (
    <div className="container">
      <div className="text-center pb-3 pt-3">
        <h1>Watchlists</h1>
      </div>
      <div className="row mb-3">
        <div className="col-sm">{heading}</div>
        <div className="col-sm text-end">
          <button className="btn btn-danger" onClick={handleShow}>
            Create watchlist
          </button>
        </div>
        <div className="col-sm">
          <WatchlistDropdown />
        </div>
      </div>
      {!loading &&
        list.map((element, index) => (
          <div
            className="row mb-3 watchlistRow"
            key={index}
            onClick={(e) => navigateWatchlistDetail(element["name"])}
          >
            <div className="col">
              <h1>{element["name"]}</h1>
            </div>
          </div>
        ))}

      {/* Modal */}
      <div
        className="modal fade"
        ref={ref}
        id="createWatchlistModal"
        tabIndex="-1"
        aria-labelledby="createWatchlistModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          {/*               <div className="modal-content"> */}
          <div className="modal-header">
            <h5 className="modal-title" id="createWatchlistModalLabel">
              Create New Watchlist
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="text"
                  id="watchlistName"
                  value={watchlistName}
                  onChange={(e) => setWatchlistName(e.target.value)}
                  placeholder="Name"
                  required
                />
              </div>
              <h5>Type</h5>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadio"
                  onClick={() => setType("Public")}
                  id="flexRadioPublic"
                  default
                />
                <label className="form-check-label" htmlFor="flexRadioPublic">
                  Public
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadio"
                  onClick={() => setType("Private")}
                  id="flexRadioPrivate"
                />
                <label className="form-check-label" htmlFor="flexRadioPrivate">
                  Private
                </label>
              </div>
            </form>
            {errorMessage ? (
              <div style={{ color: "red", textAlign: "center" }}>
                {errorMessage}
              </div>
            ) : null}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleCreateWatchlistForm}
              className="btn btn-primary"
            >
              Save changes
            </button>
          </div>
          {/*               </div> */}
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                value={watchlistName}
                onChange={(e) => setWatchlistName(e.target.value)}
                placeholder="Name"
                required
              />
            </Form.Group>
            <h5>Type</h5>
            <Form.Check>
              <Form.Check.Input
                type="radio"
                name="flexRadio"
                onClick={() => setType("public")}
                id="flexRadioPrivate"
              />
              <Form.Check.Label htmlFor="flexRadioPrivate">
                Public
              </Form.Check.Label>
            </Form.Check>
            <Form.Check>
              <Form.Check.Input
                type="radio"
                name="flexRadio"
                onClick={() => setType("private")}
                id="flexRadioPrivate"
              />
              <Form.Check.Label htmlFor="flexRadioPrivate">
                Private
              </Form.Check.Label>
            </Form.Check>
          </Form>
          {errorMessage ? (
            <div style={{ color: "red", textAlign: "center" }}>
              {errorMessage}
            </div>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateWatchlistForm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default Watchlist;
