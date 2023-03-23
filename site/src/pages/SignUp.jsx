import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [fetchResponse, handleFetchResponse] = useState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignUpForm(event){
	  event.preventDefault();

    // validate
    if(firstName == "" || lastName == "" || email == "" || password == "" || !email.includes("@")){
      return;
    }

    // Construct the API request
    const apiUrl = 'api/signup';
    const requestData = {
      firstName: firstName,
      lastName: lastName,
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
        console.log(response.data);
        if(response.data == "User already exists"){
          alert(response.data);
         }
//         }else{
//           navigate("/LogIn");
//         }

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
          <input className="form-control" type="email" id="email" value={email}  onChange={e => setEmail(e.target.value)} placeholder="Email" required/>
				</div>
				<div className="input-group mb-3 p-0">
          <input className="form-control" type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required/>
				</div>
        <button type="submit" className="btn btn-danger w-100" value="Submit">Submit</button>
      </form>
      <div>{fetchResponse}</div>
      <div>{errorMessage}</div>
    </div>
  );
}

export default SignUp;