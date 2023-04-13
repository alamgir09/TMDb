import React from "react";
import { useLocation, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import CollageComponent from "../components/CollageComponent";
// import { render } from '@testing-library/react';

// This page provides a button with a redirect to "/other"
function Montage() {
  // Anything returned will be rendered in React
  const location = useLocation();
  const movieIDList = location.state.movieIDList;
  return (
    <div>
      <NavBar />
      <div className="text-center pb-3 pt-3">
        <h1>Montage</h1>
      </div>
      <CollageComponent movieIDList={movieIDList} />
    </div>
  );
}

export default Montage;
