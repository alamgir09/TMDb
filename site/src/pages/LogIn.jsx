import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  function handleLoginClick() {
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
      .then(response => {
        // Handle the response
        if (response.ok) {
          // Redirect the user to the dashboard or home page
          navigate("/LogIn");
        } else {
          // Display an error message to the user
          setErrorMessage('Invalid email or password');
        }
      })
      .catch(error => {
        // Handle the error
        console.error(error);
        setErrorMessage('An error occurred, please try again later');
      });
  }

  return (
    <div>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLoginClick}>Login</button>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
}

export default LogIn;