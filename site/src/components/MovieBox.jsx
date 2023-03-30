import React from "react";

function MovieBox({imgURL, title, release_date, rating}) {

    if (imgURL == "") imgURL = "?";
    if (title == "") title = "?";
    if (release_date == "") release_date = "?";
    if (rating == "") rating = "?";

    return (
        <div className="movie-row col-12 mt-4">
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
                        <div>Add Watch List

                        </div>
                        <div>Little Eye

                        </div>
                        <div>Dollar Sign
                            
                        </div>
                    </div>
                </div> // <!-- .movie-row -->
    );
}

export default MovieBox;