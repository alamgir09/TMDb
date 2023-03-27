import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [fetchResponse, handleFetchResponse] = useState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // Calling navigate() will allow us to redirect the webpage
  const navigate = useNavigate();

  function resetForm(){
    setFirstName("");
    setLastName("");
    setUsername("");
    setPassword("");
  }

  function handleSignUpForm(event){
	  event.preventDefault();

    // validate
    if(firstName == "" || lastName == "" || username == "" || password == ""){
      return;
    }

    if(password != passwordConfirm){
      alert("Password does not match. Please try again.");
      resetForm();
      setPasswordConfirm("");
      return;
    }

    // Construct the API request
    const apiUrl = 'api/signup';
    const requestDataInSignUp = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password
    };
    const requestHeadersInSignUp = {
      'Content-Type': 'application/json'
    };
    const requestOptionsInSignUp = {
      method: 'POST',
      headers: requestHeadersInSignUp,
      body: JSON.stringify(requestDataInSignUp)
    };

    // Send the API request
    fetch(apiUrl, requestOptionsInSignUp)
      .then((res) => res.json())
      .then((response) => {
        console.log(response.data);
        if(response.data == "User already exists"){
          resetForm();
          handleFetchResponse(response.data);
        }
        else{
          navigate("/LogIn");
        }
      })
      .catch((err) => {
        console.log(err)
        handleFetchResponse("An API error occurred");
      });

  }

  return (
    <div className="container-fluid">
      <div className="text-center pb-3 pt-3"><h1>Sign Up</h1></div>
      <form className="formStyle" onSubmit={handleSignUpForm}>
				<div className="input-group mb-3 p-0">
					<input className="form-control" type="input" id="firstName" value={firstName}  onChange={e => setFirstName(e.target.value)} placeholder="First Name" required/>
				</div>
				<div className="input-group mb-3 p-0">
          <input className="form-control" type="input" id="lastName" value={lastName}  onChange={e => setLastName(e.target.value)} placeholder="Last Name" required/>
				</div>
				<div className="input-group mb-3 p-0">
          <input className="form-control" type="input" id="username" value={username}  onChange={e => setUsername(e.target.value)} placeholder="Username" required/>
				</div>
				<div className="input-group mb-3 p-0">
          <input className="form-control" type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required/>
				</div>
				<div className="input-group mb-3 p-0">
          <input className="form-control" type="password" id="passwordConfirm" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} placeholder="Confirm Password" required/>
        </div>
        <button type="submit" className="btn btn-danger w-100" value="Submit">Submit</button>
      </form>
      <div className="text-center pt-3">{fetchResponse}</div>
    </div>
  );
}

export default SignUp;