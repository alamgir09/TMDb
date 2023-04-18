import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieBox from "../components/MovieBox";
import Pagination from "../components/Pagination";
import { useParams } from "react-router-dom";
import CreateWatchlistModal from "../components/CreateWatchlistModal";

function Search() {
  // Handle all searches here
  // display question mark if null values
  // from year to year, range of years, default is thank
  // 1. Search for movies based on certain criteria
  // 1. default search on ALL
  // 2. criteria: ALL, title, actors, keywords
  //     1. drop down menu
  // 3. display 10 movies at a time, click onto movie to reveal movie details
  //     1. Only need image and title, but can display more
  //         1. Hover to add movie to watch list
  //             1. add to watch list
  //             2. little eye to see the set of lists that this movie is already on (user)
  //             3. dollar sign, obtain free tickets (feasibility analysis)

  // General Hooks
  const { id } = useParams();
  const { type } = useParams();

  const [searchTerm, setTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [numResults, setNumResults] = useState("0");
  const [components, setComponents] = useState([]);
  const navigate = useNavigate();

  // create watchlist modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // update watchlist
  const [list, updateList] = useState([]);

  useEffect(() => {
    if (type === "Actors" || type === "Genres") {
      setCategory(type);
    }
    setTerm(id);
  }, []);

  // Pagination Hooks
  // const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // Constructing API Request below
  function searchItem(event) {
    event.preventDefault();
    setComponents([]);

    //         console.log(searchTerm)
    const term = searchTerm.trim();
    //         console.log(term)

    //         console.log("You just hit the search button");

    // Selects api request based on category selected by drop-down
    let url = "";
    if (category == "All") {
      url =
        "https://api.themoviedb.org/3/search/multi?api_key=b8f33277c38d4286ab9e30134ebf037e&language=en-US&query=" +
        term +
        "&page=1&include_adult=false";

      nonIdSearch(url);
    } else if (category == "Title") {
      url =
        "https://api.themoviedb.org/3/search/movie?api_key=b8f33277c38d4286ab9e30134ebf037e&language=en-US&query=" +
        term +
        "&page=1&include_adult=false";

      nonIdSearch(url);
    } else if (category == "Actors") {
      url =
        "https://api.themoviedb.org/3/search/person?api_key=b8f33277c38d4286ab9e30134ebf037e&language=en-US&query=" +
        term +
        "&page=1&include_adult=false";

      idSearch(url)
        .then((termID) => {
          // Use the returned ID here
          console.log("termID is " + termID);
          url =
            "https://api.themoviedb.org/3/person/" +
            termID +
            "/movie_credits?api_key=b8f33277c38d4286ab9e30134ebf037e&language=en-US";
          nonIdSearch(url);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (category == "Keywords") {
      url =
        "https://api.themoviedb.org/3/search/keyword?api_key=b8f33277c38d4286ab9e30134ebf037e&query=" +
        term +
        "&page=1";

      idSearch(url)
        .then((termID) => {
          // Use the returned ID here
          console.log("termID is " + termID);
          url =
            "https://api.themoviedb.org/3/keyword/" +
            termID +
            "/movies?api_key=b8f33277c38d4286ab9e30134ebf037e&language=en-US&include_adult=false";
          nonIdSearch(url);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // delete starter MovieBox
    document.querySelector("#starter").innerHTML = "";

    setTerm("");
  }

  // returns an id after fetching from api endpoint
  function idSearch(apiUrl) {
    const requestHeaders = {
      "Content-Type": "application/json"
    };
    const requestOptions = {
      method: "GET",
      headers: requestHeaders
    };

    // Send the API request
    return fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        // Return the ID from the response
        console.log("Showing response.results[0].id");
        console.log(response.results[0].id);
        return response.results[0].id;
      })
      .catch((err) => {
        console.log(err);
        return "0";
      });
  }

  // regular search with either id or string term
  function nonIdSearch(apiUrl) {
    //
    const requestHeaders = {
      "Content-Type": "application/json"
    };
    const requestOptions = {
      method: "GET",
      headers: requestHeaders
    };

    // Send the API request
    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        console.log("Showing response.results");
        console.log(response);
        setNumResults(response.total_results);

        setComponents(response);

        let components = [];
        // if category is Actors, adjust parsing accordingly, else use regular parsing
        if (category == "Actors") {
          setNumResults(response.cast.length);
          // Go through response from the api and create each individual movie box
          for (let i = 0; i < response.cast.length; i++) {
            let movie = response.cast[i];
            let imgURL = "http://image.tmdb.org/t/p/w500" + movie.poster_path;
            let movieComponent = (
              <MovieBox
                key={i}
                id={movie.id}
                imgURL={imgURL}
                title={movie.title}
                release_date={movie.release_date}
                rating={movie.vote_average}
                list={list}
                handleShow={handleShow}
              />
            );

            components.push(movieComponent);
          }
        } else {
          // Go through response from the api and create each individual movie box
          for (let i = 0; i < response.results.length; i++) {
            let movie = response.results[i];
            let imgURL = "http://image.tmdb.org/t/p/w500" + movie.poster_path;
            let movieComponent = (
              <MovieBox
                key={i}
                id={movie.id}
                imgURL={imgURL}
                title={movie.title}
                release_date={movie.release_date}
                rating={movie.vote_average}
                list={list}
                handleShow={handleShow}
              />
            );

            components.push(movieComponent);
          }
        }

        // all the components have been pushed into the array, now set it to the global variable
        setComponents(components);

        console.log("We got here");
        console.log(components);
        console.log("the length of component is " + components.length);
      })
  }

  // Change page - Pagination
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexofFirstPost = indexOfLastPost - postsPerPage;
  // const currentComponents = components.splice(indexofFirstPost, indexOfLastPost);

  //const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function paginate(pageNumber) {
    pageNumber + 1;
    console.log("xxx");
  };

  // fetch watchlist
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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // On page load
  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <div className="container">
      <div className="container-fluid searchBar">
        <form className="col-12" data-testid="search-form" id="search-form" onSubmit={searchItem}>
          <div className="searchHeader container">
            <input
              value={searchTerm}
              onChange={(e) => setTerm(e.target.value)}
              type="text"
              placeholder="Search...."
              className="search"
              required
            />
            <button data-testid="search-submit-btn" type="submit">
              Search
            </button>
            <ul id="nav">
              <li id="active-nav">
                <a href=""> {category} </a>
                <ul>
                  <li className="dropElements" onClick={() => setCategory("All")}>
                    <a>All</a>
                  </li>
                  <li className="dropElements" onClick={() => setCategory("Title")}>
                    <a>Title</a>
                  </li>
                  <li className="dropElements" onClick={() => setCategory("Actors")}>
                    <a>Actors</a>
                  </li>
                  <li className="dropElements" onClick={() => setCategory("Keywords")}>
                    <a>Keywords</a>
                  </li>
                </ul>
              </li>
            </ul>{" "}
            <button type="button">Year Filter</button>
            {/*<!-- nav --> */}
            <div>
              <button
                onClick={() => {
                  navigate("/");
                }}
              >
                Back to Home
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="results-row">
        <div className="col-12 mt-4">
          Showing{" "}
          {/* <span id="num-results" className="font-weight-bold">
            0
          </span>{" "}
          of{" "} */}
          <span id="total-results" className="font-weight-bold">
            {numResults}
          </span>{" "}
          result(s).
        </div>
        <div className="movie-header">
          <div className="movie-header col-12 mt-4">
            <div id="poster" className="header-text">
              Poster
            </div>
            <div className="col-3 header-text">Title</div>
            <div className="col-3 header-text">Release Date</div>
            <div className="col-3 header-text">Rating</div>
          </div>{" "}
          {/*<!-- inner-header --> */}
        </div>{" "}
        {/*<!-- .movie-header -->*/}
        <div id="movies-all">
          <div id="starter">
            <MovieBox
              key={"1"}
              imgURL={"https://assets.mubicdn.net/images/notebook/post_images/29882/images-w1400.jpg?1579663202"}
              title={"Title"}
              release_date={"Release Date"}
              rating={"Rating"}
              list={list}
              handleShow={handleShow}
            />
          </div>
          {/* {currentComponents.map((component) => component)} part of pagination*/}
          {components.map((component) => component)}
          <div className="movies-all col-12 mt-4">
            <Pagination postsPerPage={postsPerPage} totalPosts={components.length} paginate={paginate} />
          </div>
        </div>{" "}
        {/* <!-- #movies-all --> */}
      </div>{" "}
      {/* <!-- #results-row --> */}
      <CreateWatchlistModal
        change
        back
        show={show}
        handleClose={handleClose}
        fetchWatchlist={fetchWatchlist}
      ></CreateWatchlistModal>
    </div>
  );
}

export default Search;
