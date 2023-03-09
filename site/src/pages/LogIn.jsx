import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LogIn() {
  const [fetchResponse, handleFetchResponse] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  function handleLoginClick() {
    // validate text fields
    // check if email is empty
    if(email == "" || email.length == 0){
        setErrorMessage("Email Required");
        return;
    }
    // validate email
    else{
        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
            setErrorMessage("Invalid Email");
            return;
        }
    }
    // check if password is empty
    if(password == "" || password.length == 0){
        setErrorMessage("Password Required");
        return;
    }


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
        console.log("API Responded With: ");
        console.log(response);
        console.log(response.data);
        if (response?.data) {
          if (response.data == "True") {
          alert("You have successfully signed in!")
          navigate("/")
          }
          else if (response.data == "False") {
          alert("Incorrect password, try again.")
          }
          else if (response.data == "Null") {
          alert("This user does not exist, try again.")}
        } else {
          console.log("Malformed data response"); //TODO: Handle me!
        }
      })
      .catch((err) => {
        console.log(err)
        handleFetchResponse("An API error occurred");
      });
  }

  return (
    <div>
      <input type="email" id="email" value={email}  onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLoginClick}>Login</button>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
}

export default LogIn;