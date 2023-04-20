import React from "react";
import "../styles/navbar.css";
import {colors} from "@material-ui/core";

const NavBar = () => {
  //   const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#dc3545" }}>
      <div className="container-fluid">
        <div className="col-3">
          <a className="navbar-brand" href="#">
            Movie Time
          </a>
        </div>

        {/*         <div className="col-6 d-flex justify-content-center"> */}
        {/*           <form className="d-flex w-75"> */}
        {/*             {" "} */}
        {/*              */}
        {/* Search Bar */}
        {/*             <input className="form-control me-2" type="search" placeholder="Search Movies" aria-label="Search"></input> */}
        {/*             <button className="btn btn-danger" type="submit"> */}
        {/*               Search */}
        {/*             </button> */}
        {/*           </form> */}
        {/*         </div> */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            {/*             <li className="nav-item"> */}
            {/*               <a className="nav-link active" aria-current="page" href="/Home"> */}
            {/*                 Home */}
            {/*               </a> */}
            {/*             </li> */}

            <li className="nav-item test">
              <a className="nav-link" href="/Search">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/Watchlist">
                MyWatchLists
              </a>
            </li>

            <li className="nav-item">
              <a
                onClick={() => {
                  localStorage.setItem("userID", "null");
                }}
                className="nav-link"
                href="/LogIn"
                data-testid="btn-logout"
              >
                Log Out{" "}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
