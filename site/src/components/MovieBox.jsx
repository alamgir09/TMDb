import React from "react";
import { useNavigate } from 'react-router-dom';


function MovieBox({id, imgURL, title, release_date, rating}) {
    const navigate = useNavigate();

    if (id == "") id ="?";
    if (imgURL == "") imgURL = "?";
    if (title == "") title = "?";
    if (release_date == "") release_date = "?";
    if (rating == "") rating = "?";

//     const openPost = (e) => {
//         history.push(`/posts/2000`);
//     };
    const handleClick = (id) => {
//         console.log(id)
        navigate(`/movies/${id}`);
    }

    return (
        <div className="movie-row col-12 mt-4">
            <button className="movie-row col-12 mt-4 movieButton" onClick={() => handleClick(id)}>
                <img src={imgURL} alt= {title}/>
                <div className="col-3 inner-text">
                    {title}
                </div>
                <div className="col-3 inner-text">
                    {release_date}
                </div>
                <div className="col-3 inner-text">
                    <strong>{rating}</strong>
                </div>
                <div className="box-hover-elements col-1 inner-text">
                    <div>Add Watch List</div>
                    <div>Little Eye</div>
                    <div>Dollar Sign</div>
                </div>
            </button>
        </div>
    );
}

export default MovieBox;