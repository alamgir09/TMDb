import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import CollageComponent from "../components/CollageComponent";
// import { render } from '@testing-library/react';

// This page provides a button with a redirect to "/other"
function Montage({user, updateUser}) {

   const navigate = useNavigate();

     // access to page only if logged in
     useEffect(() => {
         console.log(user);
         if (user === null) {
           navigate('/LogIn');
         }
       }, [user, navigate]);

  // Anything returned will be rendered in React
  const location = useLocation();
  const movieIDList = location.state.movieIDList;
  console.log("MONTAGE");
  console.log(movieIDList);
  return (
    <div>
      <NavBar user={user} updateUser={(e) => updateUser(e)}/>
      <div className="text-center pb-3 pt-3">
        <h1>Montage</h1>
      </div>
      <CollageComponent movieIDList={movieIDList} />
    </div>
  );
}

export default Montage;
