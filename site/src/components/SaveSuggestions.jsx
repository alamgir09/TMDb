import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";

function SaveSuggestions() {
    const navigate = useNavigate();
    const location = useLocation();
    let show = (location.state === null) ? false: location.state.isSuggestion;

    const handleCancel = async() => {
        await handleDeleteWatchlist()
    }
    const handleDeleteWatchlist = async() => {
        // Construct the API request
        const apiUrl = "api/editWatchlist";
        const requestData = {
          watchlistOld: localStorage.getItem("watchlist"),
          userID: localStorage.getItem("userID"),
          operation: "delete"
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
        await fetch(apiUrl, requestOptions)
          .then((res) => res.json())
          .then(() => {
                console.log('deleting ' + localStorage.getItem("watchlist") );

          })
          .catch((err) => {
            console.log(err);
          });
        navigate(-1)
      }

    const handleSave = async() => {
        navigate("/WatchlistDetail", {state: { isSuggestion: false }})
    }
  return (

    <div data-testid="save-suggestions">
    	{console.log(location.state)}
        {show ?
            <div>
                <Button data-testid="cancel-button" id="cancel" variant="danger" onClick={handleCancel}> Cancel </Button>
                <Button data-testid="save-button" variant="success" onClick={handleSave}> Save </Button>
            </div> :
            null
        }
    </div>
  );
}

export default SaveSuggestions;
