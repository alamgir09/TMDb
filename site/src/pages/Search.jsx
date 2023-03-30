import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieBox from '../components/MovieBox';
import Pagination from '../components/Pagination';
import { useParams } from 'react-router-dom';

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

    const [searchTerm, setTerm] = useState('');
    const [category, setCategory] = useState('Title');
    const [numResults, setNumResults] = useState('0');
    const [components, setComponents] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        if(type === 'Actors' || type === "Genres") {
            setCategory(type)
        }
        setTerm(id)
    }, []);

    // Pagination Hooks
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10)

    // Constructing API Request below
    function searchItem(event) {
        event.preventDefault();
        setComponents([]);

//         console.log(searchTerm)
        const term = searchTerm.trim();
//         console.log(term)

//         console.log("You just hit the search button");

        // Selects api request based on category selected by drop-down
        let url = ''
        if (category == "All") {
            url = "";
            // Currently the same as title
        } else if (category == "Title") {
            url = "https://api.themoviedb.org/3/search/movie?api_key=b8f33277c38d4286ab9e30134ebf037e&language=en-US&query=" + term + "&page=1&include_adult=false";
        } else if (category == "Actors") {
            url = '';
        } else if (category == "Keywords") {
            url = "https://api.themoviedb.org/3/discover/movie?api_key=b8f33277c38d4286ab9e30134ebf037e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_keywords=" + term + "&with_watch_monetization_types=flatrate";
        }

        // Now make the API request with the search term
        const apiUrl = url;

        const requestHeaders = {
            'Content-Type': 'application/json'
          };
        const requestOptions = {
            method: 'GET',
            headers: requestHeaders,
        };


        // Send the API request
        fetch(apiUrl, requestOptions)
        .then((res) => res.json())
        .then((response) => {
            console.log("Showing response.results");
            console.log(response.results);
            setNumResults(response.total_results);

            setComponents(response);

            let components = [];

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
                  />
                );

                components.push(movieComponent);
            }

            // all the components have been pushed into the array, now set it to the global variable
            setComponents(components);

            console.log("We got here");
            console.log(components);
            console.log("the length of component is " + components.length)


            })
        .catch((err) => {
            console.log(err)
        });


//         console.log("Searching for the term " + term);

        // dynamically add the elements here
        document.querySelector("#starter").innerHTML = "";

        setTerm("");

    }

    // Change page
    const indexOfLastPost = currentPage * postsPerPage;
    const indexofFirstPost = indexOfLastPost - postsPerPage;
    const currentComponents = components.splice(indexofFirstPost,indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <div className="container">
            <div className="container-fluid searchBar">
            <form className="col-12" id="search-form" onSubmit={searchItem}  >
                <div className="searchHeader container">
                    <input value={searchTerm} onChange={e => setTerm(e.target.value)} type="text" placeholder="Search...." className="search" required/>
                    <button type="submit">Search</button>
                    <ul id="nav">
                        <li id="active-nav"><a href=""> {category} </a>
                            <ul>
                                <li className="dropElements" onClick={() => setCategory('All')}><a>All</a></li>
                                <li className="dropElements" onClick={() => setCategory('Title')}><a>Title</a></li>
                                <li className="dropElements" onClick={() => setCategory('Actors')}><a>Actors</a></li>
                                <li className="dropElements" onClick={() => setCategory('Keywords')}><a>Keywords</a></li>
                            </ul>
                        </li>
                    </ul> {/*<!-- nav --> */}
                        
                    <div>
                        <button onClick={() => {
                            navigate("/");
                        }}>Back to Home</button>
                    </div>
                </div>
            </form>
            </div>

            <div className="results-row">
                <div className="col-12 mt-4">
                    Showing <span id="num-results" className="font-weight-bold">0</span> of <span id="total-results" className="font-weight-bold">{numResults}</span> result(s).
                </div>
                <div className="movie-header">
                    <div className="movie-header col-12 mt-4">
                        <div id="poster" className="header-text">
                            Poster
                        </div>
                        <div className="col-3 header-text">
                            Title
                        </div>
                        <div className="col-3 header-text">
                            Release Date
                        </div>
                        <div className="col-3 header-text">
                            Rating
                        </div>
                    </div> {/*<!-- inner-header --> */}
                </div> {/*<!-- .movie-header -->*/}
                <div id="movies-all">
                <div id="starter">
                    <MovieBox key = {"1"}
                            imgURL={"https://assets.mubicdn.net/images/notebook/post_images/29882/images-w1400.jpg?1579663202"}
                            title={"Title"}
                            release_date={"Release Date"}
                            rating={"Rating"}/>
                </div>
                    {currentComponents.map(component => component)}
                    <div className="movies-all col-12 mt-4">
                        <Pagination postsPerPage={postsPerPage} totalPosts={components.length} paginate={paginate} />
                    </div>

                </div> {/* <!-- #movies-all --> */}
            </div> {/* <!-- #results-row --> */}
        </div> 
    );
 };

export default Search;