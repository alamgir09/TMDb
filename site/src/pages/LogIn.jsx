import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function LogIn({user, updateUser}) {
  const navigate = useNavigate();
  // fetchResponse is a constant in this component's state. Use handleFetchResponse(newValue)
  // to update the value of fetchResponse
  const [fetchResponse, handleFetchResponse] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Empty fields handled through "required" flag in the input fields
  function handleLoginForm(e) {
    e.preventDefault();

    // Construct the API request
    const apiUrl = "api/login";
    const requestData = {
      username: username,
      password: password
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
        if (response?.data) {
          console.log(response.data);
          console.log(JSON.parse(response.data));

          var jsonObject = JSON.parse(response.data);
          if (jsonObject["Type"] == "Error") {
            handleFetchResponse(jsonObject["Message"]);
            setUsername("");
            setPassword("");
          } else {

            handleFetchResponse(jsonObject["Message"]);
            localStorage.setItem("userID", jsonObject["userID"]);
            updateUser(jsonObject["userID"]);
            console.log(user);
            console.log("redirect");
            navigate('/Search');
          }
        }
      })
      .catch((err) => {
        console.log(err);
        handleFetchResponse("An API error occurred");
      });
  }

  return (
    <div className="container-fluid">
      <div id="title-name">
        Movie Time 4
      </div>
      <div className="text-center pb-3 pt-3">
        <h1>Log In</h1>
      </div>
      <form className="formStyle" onSubmit={handleLoginForm}>
        <div className="input-group mb-3 p-0">
          <input
            className="form-control"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className="input-group mb-3 p-0">
          <input
            className="form-control"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button id="submitBtn" type="submit" className="btn btn-danger w-100" value="Submit">
          Submit
        </button>
      </form>
      <p className="text-center pt-3" id="resdponse">
        {fetchResponse}
      </p>
      <p className="text-center">
        Don&#x27;t have an account? <a href="/SignUp">Sign up!</a>
      </p>
    </div>
  );
}

export default LogIn;
