import React, { useState, useEffect } from "react";
import MovieBox from "../components/MovieBox";
import Pagination from "../components/Pagination";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CreateWatchlistModal from "../components/CreateWatchlistModal";
import NavBar from "../components/NavBar";
import "../styles/index.css"
import 'bootstrap/dist/css/bootstrap.min.css';


function Search({user, updateUser}) {

 const navigate = useNavigate();
// access to page only if logged in
  useEffect(() => {
      console.log("user:" + user);
      if (user == null || user == "null") {
          console.log("inside null");
          navigate('/LogIn');
      }
  }, [user, navigate]);
  // General Hooks
  const { id } = useParams();
  const { type } = useParams();

  const [searchTerm, setTerm] = useState("");
  const [prevTerm, setPrevTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [numResults, setNumResults] = useState("0");
  const [components, setComponents] = useState([]);

  const [totalPages, setTotalPages] = useState(5);

  const [dateStart, setStartDate] = useState("");
  const [dateEnd, setEndDate] = useState("");


  // create watchlist modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // update watchlist
  const [list, updateList] = useState([]);



  useEffect(() => {
    if (type === "Actors" || type === "Keywords") {
      setCategory(type);
    }
    setTerm(id);
  }, []);

  // Just used to check what totalPages is currently
  useEffect(() => {
    console.log("total Pages is " + totalPages);
  }, [totalPages]);



  // Pagination Hooks
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    console.log("the value of currentPage is " + currentPage);
  }, [currentPage]);


  // Constructing API Request below
  function searchItem(event, page = 1, prevTerm = "", pageNumber = 1) {
    event.preventDefault();
    setComponents([]);

    let term = "";
    if (prevTerm != "") {term = prevTerm;}
    else {
      term = searchTerm.trim();
    }

    // Selects api request based on category selected by drop-down
    let url = "";
    if (category == "All") {

      searchAll(term, page, pageNumber);

    } else if (category == "Title") {
      url =
        "https://api.themoviedb.org/3/search/movie?api_key=b8f33277c38d4286ab9e30134ebf037e&language=en-US&query=" +
        term + `&page=${page}&include_adult=false`;

      console.log("total Pages is " + totalPages);
      nonIdSearch(url, pageNumber);


    } else if (category == "Actors") {
      url =
        "https://api.themoviedb.org/3/search/person?api_key=b8f33277c38d4286ab9e30134ebf037e&language=en-US&query=" +
        term + `&page=1&include_adult=false`;

      idSearch(url)
        .then((termID) => {
          // Use the returned ID here
          console.log("termID is " + termID);
          url =
            "https://api.themoviedb.org/3/person/" +
            termID + "/movie_credits?api_key=b8f33277c38d4286ab9e30134ebf037e&language=en-US";
          nonIdSearch(url, pageNumber);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (category == "Keywords") {
      url =
        "https://api.themoviedb.org/3/search/keyword?api_key=b8f33277c38d4286ab9e30134ebf037e&query=" +
        term + `&page=1&include_adult=false`;

      idSearch(url)
        .then((termID) => {
          // Use the returned ID here
          console.log("termID is " + termID);
          url =
            "https://api.themoviedb.org/3/keyword/" +
            termID + `/movies?api_key=b8f33277c38d4286ab9e30134ebf037e&language=en-US&page=${page}&include_adult=false`;
          nonIdSearch(url, pageNumber);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // delete starter MovieBox
    document.querySelector("#starter").innerHTML = "";

    setPrevTerm(term);
    setTerm("");
    console.log("Current Term is " + searchTerm);
    console.log("Prev Term is " + prevTerm);

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
        // console.log("Showing response.results[0].id");
        if (response.results[0].id == null || response.results[0].id == 0) {
          alert("No Results Found, search again");
          window.location.reload();
          return;
        }
        // console.log(response.results[0].id);
        return response.results[0].id;
      })
      .catch((err) => {
        console.log(err);
        return "0";
      });
  }

  // regular search with either id or string term
  function nonIdSearch(apiUrl, pageNumber = 1) {
    //
    const requestHeaders = {
      "Content-Type": "application/json"
    };
    const requestOptions = {
      method: "GET",
      headers: requestHeaders
    };

    // console.log("the api being used is " + apiUrl);
    // Send the API request
    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        // console.log("Showing response.results");
        // console.log(response);
        setNumResults(response.total_results);

        setComponents(response);

        if (response.total_results == 0) {
          console.log("This is the thing that's being pinged");
          alert("No Results Found, search again");
          window.location.reload();
          return;
        }

        let components = [];

        // if (category != "All") {let components = [];}
        // if category is Actors, adjust parsing accordingly, else use regular parsing
        if (category == "Actors") {

          let totalResults = 0;
          if (response.cast.length < 100) {totalResults = response.cast.length;}
          else {totalResults = 100;}

          setNumResults(totalResults);
          // Go through response from the api and create each individual movie box
          for (let i = 0; i < totalResults; i++) {
            let movie = response.cast[i];
            let imgURL = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
            let movieComponent = "";
            if (inRange(movie.release_date)) {
              movieComponent = (
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
              } else {
                // movieComponent = (
                //   <MovieBox
                //     key={i}
                //     id={null}
                //     imgURL={imgURL}
                //     title={null}
                //     release_date={null}
                //     rating={null}
                //     list={list}
                //     handleShow={handleShow}
                //   />
                // );
              }

            // components.push(movieComponent);
          }
        } else {

          let totalResults = 0;
          if (response.total_results < 100) {totalResults = response.total_results;}
          else {totalResults = 100;}

          setNumResults(totalResults);

          // change totalPages to what has been fetched
          setTotalPages(response.total_pages);

          // Go through response from the api and create each individual movie box
          for (let i = 0; i < response.results.length; i++) {
            let movie = response.results[i];
            let imgURL = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
            let movieComponent = "";
            if (inRange(movie.release_date)) {
              movieComponent = (
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
        }
        let currentComponents = components;
        let indexofFirstPost = 0;
        let indexofLastPost = 9;
        if (category != "All") {
          // Determine index of components that will be sliced to display on the page
          if ((pageNumber % 2) != 0) {
            indexofFirstPost = 0;
          } else {
            indexofFirstPost = 10;
          }
          if (indexofFirstPost + 9 >= components.length-1) {
            indexofLastPost = components.length;
          } else {
            indexofLastPost = indexofFirstPost + 10;
          }
          if (category == "Actors") {
            indexofFirstPost = (pageNumber-1) * 10;
            indexofLastPost = indexofFirstPost + 10;
          }
        
          currentComponents = components.slice(indexofFirstPost, indexofLastPost);
        }

        if (currentComponents.length == 0) {
	        setNumResults(0);
        }

        // all the components have been pushed into the array, now set it to the global variable
        console.log("currentComponents is " + currentComponents);
        setComponents(currentComponents);
      })
  }

  function searchAll(term, page, pageNumber) {
    // Use Promise.all to wait for all three API requests to complete
    Promise.all([
      nonIdSearch(`https://api.themoviedb.org/3/search/movie?api_key=b8f33277c38d4286ab9e30134ebf037e&language=en-US&query=${term}&page=${page}&include_adult=false`),
      idSearch(`https://api.themoviedb.org/3/search/person?api_key=b8f33277c38d4286ab9e30134ebf037e&language=en-US&query=${term}&page=1&include_adult=false`),
      idSearch(`https://api.themoviedb.org/3/search/keyword?api_key=b8f33277c38d4286ab9e30134ebf037e&query=${term}&page=1&include_adult=false`)
    ]).then(([moviesResponse, actorsId, keywordsId]) => {
      // Extract the necessary data from the API responses
      const movies = moviesResponse;
      // console.log("the moviesResponse is " + moviesResponse);
      console.log("We did get here");
      const actorId = actorsId.results[0].id;
      // const actorId = 243;
      console.log("We did get here 2");
      const keywordId = keywordsId.results[0].id;
      // const keywordId = 9840;
  
      // Fetch movie credits for the actors
      const actorCreditsUrl = `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=b8f33277c38d4286ab9e30134ebf037e&language=en-US`;
      const keyWordsUrl = `https://api.themoviedb.org/3/keyword/${keywordId}/movies?api_key=b8f33277c38d4286ab9e30134ebf037e&language=en-US&include_adult=false`;
      return Promise.all([
        Promise.resolve(movies),
        Promise.resolve(nonIdSearch(actorCreditsUrl,pageNumber)),
        Promise.resolve(nonIdSearch(keyWordsUrl, pageNumber))
      ]);
    }).then(([movies, actorCredits, keywordResults]) => {
      // Extract the necessary data from the API responses
      // Parse Title Api
      let totalResults = 0;
          if (movies.total_results < 100) {totalResults = movies.total_results;}
          else {totalResults = 100;}

          setNumResults(totalResults);

          // change totalPages to what has been fetched
          setTotalPages(movies.total_pages);
          let movieList = [];
          // Go through response from the api and create each individual movie box
          for (let i = 0; i < movies.results.length; i++) {
            let movie = movies.results[i];
            let imgURL = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
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

            movieList.push(movieComponent);
          }
      setComponents(movieList);
      // Parse Actors Api
      let actorResults = 0;
      if (actorCredits.cast.length < 100) {actorResults = actorCredits.cast.length;}
      else {actorResults = 100;}

      if (totalResults + actorResults < 100) {totalResults += actorResults;}
      else {
        actorResults = 100 - totalResults;
        totalResults = 100;
      }

      setNumResults(totalResults);
      let actorList = []
      // Go through response from the api and create each individual movie box
      for (let i = 0; i < actorResults; i++) {
        let movie = actorCredits.cast[i];
        let imgURL = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
        let movieComponent = "";
        if (inRange(movie.release_date)) {
        movieComponent = (
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
        } else {
          movieComponent = (
            <MovieBox
              key={i}
              id={null}
              imgURL={imgURL}
              title={null}
              release_date={null}
              rating={null}
              list={list}
              handleShow={handleShow}
            />
          );
        }

        actorList.push(movieComponent);
      }
      setComponents(movieList.push(...actorList));
      // Parse Keywords Api
      let keywordAmount = 0;
      if (keywordResults.total_results < 100) {keywordAmount = keywordResults.total_results;}
      else {keywordAmount = 100;}

      if ((keywordAmount + totalResults) < 100) {totalResults += keywordAmount;}
      else {
        keywordAmount = 100 - totalResults;
        totalResults = 100;
      }
      
      console.log('keywordAmount is ' + keywordAmount);
      let keywordList = [];
      // change totalPages to what has been fetched
      setTotalPages(keywordResults.total_pages);
      // Go through response from the api and create each individual movie box
      for (let i = 0; i < keywordAmount; i++) {
        let movie = keywordResults.results[i];
        let imgURL = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
        let movieComponent = "";
        if (inRange(movie.release_date)) {
        movieComponent = (
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
        } else {
          movieComponent = (
            <MovieBox
              key={i}
              id={null}
              imgURL={imgURL}
              title={null}
              release_date={null}
              rating={null}
              list={list}
              handleShow={handleShow}
            />
          );
        }
        keywordList.push(movieComponent);
      }
      setComponents(keywordList.push(...components));
      // Combine all the results into one array
      // const allResults = [...movieList, ...actorList, ...keywordList];
  
      // Set the state with the combined results

        // Determine index of components that will be sliced to display on the page
        let indexofFirstPost = 0;
        let indexofLastPost = 9;
        indexofFirstPost = (pageNumber-1)*10;
        if (indexofFirstPost + 9 >= keywordList.length-1) {
          indexofLastPost = keywordList.length;
        } else {
          indexofLastPost = indexofFirstPost + 10;
        }
        if (category == "Actors") {
          indexofFirstPost = (pageNumber-1) * 10;
          indexofLastPost = indexofFirstPost + 10;
        }
      
        console.log("indexFirst is " + indexofFirstPost);
        console.log("IndexLast is " + indexofLastPost);
        const currentComponents = keywordList.slice(indexofFirstPost, indexofLastPost);

        if (currentComponents.length == 0) {
	        setNumResults(0);
	      }

        // all the components have been pushed into the array, now set it to the global variable
        setComponents(currentComponents);

      // setComponents(currentComponents);
    }).catch((err) => {
      console.log(err);
    });
  }

  // Change page - Pagination
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexofFirstPost = indexOfLastPost - postsPerPage;
  // const currentComponents = components.splice(indexofFirstPost, indexOfLastPost);

  //const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function paginate(event, pageNumber) {
    pageNumber + 1;

    // When the page number is hit, make request in searchItem with prevTerm, and dislay index
    setCurrentPage(pageNumber);
    const pageQuery = Math.ceil(pageNumber / 2);

    // console.log("the current page is now " + pageNumber);
    setTerm(prevTerm);
    // Call searchItem
    searchItem(event, pageQuery, prevTerm, pageNumber);
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

          var jsonObject = JSON.parse(response.data);
          updateList(jsonObject);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Use year picker when querying things
  function inRange(movieDate) {
    // console.log("We reached here!");
    // console.log("movieDate is " + movieDate);
    if (movieDate == null || movieDate == "") return false;
    movieDate = movieDate.slice(0,4);
    movieDate = parseInt(movieDate);
    // console.log("movieDate is now " + movieDate);
    if (movieDate >= parseInt(dateStart) || dateStart == "") {
      if (movieDate <= parseInt(dateEnd) || dateEnd == "" ) {
        return true;
      }
    } else {
      return false;
    }
  }

  // On page load
  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
  <div>
  <NavBar user={user} updateUser={(e) => updateUser(e)} />
    <div className="container">
      <div className="container-fluid searchBar">
        <form className="col-12" data-testid="search-form" id="search-form" onSubmit={searchItem}>


          <div className="searchHeader-container d-flex justify-content-center align-items-center">
            <div className="d-flex align-items-center">
              <ul id="nav" className="mr-2">
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
              <button id="year-button" type="button">Year Filter</button>
            </div>

            <input
              id="search-bar"
              value={searchTerm}
              onChange={(e) => setTerm(e.target.value)}
              type="text"
              placeholder="Search...."
              className="search"
              required
            />
            <button id="search-button" data-testid="search-submit-btn" type="submit">
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
            <input value={dateStart}
              onChange={(e) => setStartDate(e.target.value)}
              type="text"
              placeholder="Start Date"
              id="startDate"
              className="datePicker"/>
            <input value={dateEnd}
              onChange={(e) => setEndDate(e.target.value)}
              type="text"
              placeholder="End Date"
              id="endDate"
              className="datePicker"/>
            {/*<!-- nav --> */}

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
            {/* <MovieBox
              key={"1"}
              imgURL={"https://assets.mubicdn.net/images/notebook/post_images/29882/images-w1400.jpg?1579663202"}
              title={"Title"}
              release_date={"Release Date"}
              rating={"Rating"}
              list={list}
              handleShow={handleShow}
            /> */} <div className="col-11 text-center mt-4">Its empty here</div>
          </div>
          {components && components.map((component) => component)}
          <div className="movies-all col-12 mt-4">
            <Pagination postsPerPage={postsPerPage} totalPosts={numResults} paginate={paginate} />
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
   </div>
  );
}

export default Search;