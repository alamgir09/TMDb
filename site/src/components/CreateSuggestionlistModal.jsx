import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { addMovie } from "../functions.js";


function CreateSuggestionlistModal({ show, handleClose, list }) {
    const nameFieldRef = useRef(null);
    const navigate = useNavigate()
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const [watchlistName, setWatchlistName] = useState("");
    const [type, setType] = useState("Private");
    const [errorMessage, setErrorMessage] = useState();
    const [inputValue, setInputValue] = useState('5');
    const [selectedMovies, setSelectedMovies] = useState([]);
    let suggestions = []

    function onValueChange(event) {
        setType(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        var valid = true
        setErrorMessage('');
        if (inputValue < 1 || inputValue > 10) {
            setErrorMessage('Error: number must be >= 1 and <= 10');
            return;
        }
        if(watchlistName.length == "" || type == "") {
            setErrorMessage("Error: Watchlist Name Can Not Be Blank");
            return;
        }
        if (selectedMovies.length === 0) {
            setErrorMessage("Error: At least 1 Source List Must Be Selected");
            return;
        }
        list.forEach(function(movie){
            if(movie.name === watchlistName) {
                valid = false;
                setErrorMessage("Error: Watchlist Name Exists")
                return;
            }
        })
        if(valid) {
            setErrorMessage("Creating Suggestions Based On " + selectedMovies.toString())
                generateSuggestions();
        }
    };

    const generateSuggestions = async() => {
        const requestHeaders = {
            "Content-Type": "application/json"
        };
        const requestOptions = {
            method: "GET",
            headers: requestHeaders
        };
        const baseURL = "https://api.themoviedb.org/3"
        const apiKey = "?api_key=b8f33277c38d4286ab9e30134ebf037e&language=en-US"

        list.forEach(watchlist => {
            if(selectedMovies.includes(watchlist.name)) {
                const movieList = watchlist.movies
                console.log("Movie List: " + JSON.stringify(movieList))

                movieList.forEach(movie => {
                    const id = movie._id
                    const movieIds = movieList.map(movie => movie._id);
                    const suggestionsURL = baseURL + "/movie/" + id + "/similar" + apiKey
                    console.log("Suggestion URL: " + suggestionsURL)

                     fetch(suggestionsURL, requestOptions)
                    .then((res) => res.json())
                    .then((response) => {
                    	console.log(response)
                        var suggestionList = response.results;

                        suggestionList = suggestionList.filter(suggestion => !movieIds.includes(suggestion.id));
                        suggestionList.forEach(suggestion => {
                            suggestions.push(suggestion)
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                })
            }
        })
        await delay(2000)
        setErrorMessage("Confirmation: " + inputValue +  " recommendations")
        createWatchList();
    }

    function createWatchList() {
        // Construct the API request
        const apiUrl = "api/createWatchlist";
        const requestData = {
          watchlist: watchlistName,
          userID: localStorage.getItem("userID"),
          type: type,
          movies: []
        };
        const requestHeaders = {
          "Content-Type": "application/json"
        };
        const requestOptions = {
          method: "POST",
          headers: requestHeaders,
          body: JSON.stringify(requestData)
        };
        // Send the API request
        fetch(apiUrl, requestOptions)
          .then((res) => res.json())
          .then((response) => {
            if (response.data == "Success") {
                addToWatchList();
              console.log('yay');
            }
            if (response.data == "Watchlist already exists") {
              setErrorMessage("Watchlist already exists");
            }
          })
          .catch((err) => {
            console.log(err);
          });
    }

    const addToWatchList = async() => {
        console.log(suggestions[0])
        var addedIds = []
//        var  z = 0;
        for(var i = 0; i < inputValue;i++) {
            const randomIndex = Math.floor(Math.random() * suggestions.length);
            console.log(randomIndex);
            const movie = suggestions[randomIndex]
            console.log(movie)

            if(!movie) {
//             	i--;
                continue;
            }else if(!addedIds.includes(movie.id)) {
                console.log(movie)
                const imgURL = "http://image.tmdb.org/t/p/w500" + movie.poster_path
                addMovie(movie.id, movie.title, imgURL, movie.release_date, movie.vote_average, watchlistName);
                addedIds.push(movie.id)
                suggestions.splice(randomIndex, 1)
            }
        }

        await delay(3000)
        setErrorMessage("Confirmation: Watchlist " + watchlistName + " created")
         await delay(2000)
        navigateNewWatchList()
    }

    const navigateNewWatchList = async() => {
        localStorage.setItem("watchlist", watchlistName);
        navigate("/WatchlistDetail" , { state: { isSuggestion: true} });
    }

    const handleSelectedMovies = (e) => {
      setSelectedMovies(Array.from(e.target.selectedOptions, (option) => option.value));
    };

    const watchlists = list.map((option) => (
      <option key={option.id} value={option.value}>
        {option.name}
      </option>
    ));

    return (
        <Modal data-testid="modal" show={show} onHide={handleClose} onShow={() => nameFieldRef.current.focus()}>
            <Modal.Header closeButton>
                <Modal.Title data-testid="modal-title" id="createSuggestlistModal">Create Suggestion List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form data-testid="form" onSubmit={handleSubmit} onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(e)
                  }
                }}>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" ref={nameFieldRef} value={watchlistName} onChange={(e) => setWatchlistName(e.target.value)} placeholder="Name" required />
                    </Form.Group>
                    <h5>Type</h5>
                    <Form.Check>
                        <Form.Check.Input type="radio" name="flexRadio" id="radioPublic" onChange={(e) => onValueChange(e)} checked={type === "Public"} value="Public" />
                        <Form.Check.Label htmlFor="radioPublic">Public</Form.Check.Label>
                    </Form.Check>
                    <Form.Check>
                        <Form.Check.Input type="radio" name="flexRadio" id="radioPrivate" onChange={(e) => onValueChange(e)} checked={type === "Private"} value="Private" />
                        <Form.Check.Label htmlFor="radioPrivate">Private</Form.Check.Label>
                    </Form.Check>
                    <Form.Group controlId="formNumber">
                        <Form.Label>Number of Suggestions</Form.Label>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Enter a number from 1 to 10</Tooltip>} >
                            <Form.Control data-tip data-for="my-tooltip" data-testid="numSuggestions" type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                        </OverlayTrigger>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Select Source Watchlists (shift+click)</Form.Label>
                        <Form.Select data-testid="sourceLists" multiple value={selectedMovies} onChange={handleSelectedMovies}>
                            {watchlists}
                        </Form.Select>
                    </Form.Group>
                </Form>
                {errorMessage ? <div style={{ color: "red", textAlign: "center" }}>{errorMessage}</div> : null}
            </Modal.Body>
            <Modal.Footer>
                <Button data-testid="createHandleClose" id="createWatchlistDeleteBtn" variant="danger" onClick={handleClose}> Close </Button>
                <Button data-testid="createHandleSubmit" variant="success" onClick={handleSubmit}> Create </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateSuggestionlistModal;

