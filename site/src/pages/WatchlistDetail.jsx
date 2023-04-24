import React, { useState, useEffect } from "react";
import MovieBoxWatchlist from "../components/MovieBoxWatchlist";
import EditMovieModal from "../components/EditMovieModal";
import WatchlistTypeDropdown from "../components/WatchlistTypeDropdown";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";


function WatchlistDetail({user}) {
  const [list, updateList] = useState([]);
  const [watchlistAll, setWatchlistAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState();
  const [watchlistType, setWatchlistType] = useState();

  //NEW
  const [movieIDs, setMovieIDs] = useState([]);

  //NEW
  const navigate = useNavigate();

    // access to page only if logged in
    useEffect(() => {
        console.log(user);
        if (user == null || user == "null") {
          navigate('/LogIn');
        }
      }, [user, navigate]);


  const [modal, setModal] = useState({ show: false, data: { text: "" } });
  const handleClose = () => {
    setModal({ show: false, data: { text: "" } });
  };

  // api request to get movies for current user
  function fetchMovies() {
    const apiUrl = "api/getMovies";

    const requestData = {
      userID: localStorage.getItem("userID"),
      watchlist: localStorage.getItem("watchlist")
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

          var jsonObject = JSON.parse(response.data);

          setLoading(false);

          console.log(jsonObject);

          var vMovieIDs = [];
          for(var i = 0; i < jsonObject.length; i++){
            vMovieIDs.push(jsonObject[i]["id"]);
          }
          setMovieIDs(vMovieIDs);

          updateList(jsonObject);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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

          var jsonObject = JSON.parse(response.data);

          setWatchlistAll(jsonObject);


        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // On page load
  useEffect(() => {
    fetchMovies();
    fetchWatchlist();
    setWatchlist(localStorage.getItem("watchlist"));
  }, []);

  // when watchlistAll mounts
  useEffect(() => {
    // Find the watchlist with name "watchlist 1" and set its type in state
    const watchlist1 = watchlistAll.find((list) => list.name === localStorage.getItem("watchlist"));
    if (watchlist1) {
      setWatchlistType(watchlist1.type);
    }
  }, [watchlistAll]);

   return (
   <div>
   <NavBar />
    <div className="container">
      <div className="text-center pb-3 pt-3">
        <h1>{watchlist}</h1>
      </div>
      <div className="row mb-3">
        <div className="col-sm">{!loading && list.length == 0 ? <h2>No movies added yet</h2> : null}</div>
        <div className="col-sm text-end">
          <WatchlistTypeDropdown type={watchlistType} />
          <button id="create-montage"
            onClick={() => {  navigate("/Montage", { state: { movieIDList: movieIDs } });}}> Create Montage
          </button>
        </div>
      </div>
      {!loading && list.length > 0 ? (
        <div className="movie-header row mt-4">
          <div className="col-3 col-md-2 header-text">Poster</div>
          <div className="col-9 col-md-10">
            <div className="row h-100">
              <div className="col-sm-4 header-text">Title</div>
              <div className="col-sm-2 header-text">Release Date</div>
              <div className="col-sm-2 header-text">Rating</div>
            </div>
          </div>
        </div>
      ) : null}
      {!loading &&
        list.map((element, index) => (
          <MovieBoxWatchlist
            key={index}
            id={element["id"]}
            title={element["title"]}
            imgURL={element["imgURL"]}
            release_date={element["releaseDate"]}
            rating={element["rating"]}
            list={watchlistAll}
            modal={setModal}
          />
        ))}
      <EditMovieModal modal={modal} handleClose={handleClose} fetchMovies={fetchMovies} />
    </div>
    </div>
  );
}

export default WatchlistDetail;
