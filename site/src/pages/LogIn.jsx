import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LogIn() {
  // fetchResponse is a constant in this component's state. Use handleFetchResponse(newValue)
  // to update the value of fetchResponse
  const [fetchResponse, handleFetchResponse] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  function handleLoginForm(e) {
    e.preventDefault();

    // Construct the API request
    const apiUrl = 'api/login';
    const requestData = {
      email: email,
      password: password
    };
    const requestHeaders = {
      'Content-Type': 'application/json'
    };
    const requestOptions = {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(requestData)
    };

    // Send the API request
    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        console.log("response: " + response);
          if(response?.data){
            handleFetchResponse(response.data);
          }
      })
      .catch((err) => {
        console.log(err)
        handleFetchResponse("An API error occurred");
      });
  }

  return (
        <div className="container-fluid">
          <div className="text-center pb-3 pt-3"><h1>Log In</h1></div>
          <form className="formStyle" onSubmit={handleLoginForm}>
    				<div className="input-group mb-3 p-0">
              <input className="form-control" type="email" id="email" value={email}  onChange={e => setEmail(e.target.value)} placeholder="Email" required/>
    				</div>
    				<div className="input-group mb-3 p-0">
              <input className="form-control" type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required/>
    				</div>
            <button id="submitBtn" type="submit" className="btn btn-danger w-100" value="Submit">Submit</button>
          </form>
          <p id="response">{fetchResponse}</p>
        </div>
  );
}

export default LogIn;