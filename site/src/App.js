import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Watchlist from "./pages/Watchlist";
import WatchlistDetail from "./pages/WatchlistDetail";
import Search from "./pages/Search";
import MovieDetails from "./components/MovieDetails";
import Montage from "./pages/Montage";
import TestMontageButton from "./pages/TestMontageButtonPage";
import { useIdleTimer } from 'react-idle-timer'

function App() {

//     Idle checker for timeout
    const navigate = useNavigate();
    const [remaining, setRemaining] = useState(0)

    const onIdle = () => {
        localStorage.removeItem("userID")
        navigate('/LogIn')
       console.log("clear user");
    }

//    const onActive = () => {
//        console.log("active");
//    }

     const { getRemainingTime } = useIdleTimer({
       onIdle,
//       onActive,
       timeout: 60_000,
       throttle: 500
     })

     useEffect(() => {
       const interval = setInterval(() => {
         setRemaining(Math.ceil(getRemainingTime() / 1000))
		     console.log(remaining);
       }, 500)

       return () => {
         clearInterval(interval)
       }
     }) // end check


// Set state for user id
//  const [user, updateUser] = useState(localStorage.getItem('userID'));
  const [user, updateUser] = useState(localStorage.getItem('userID'));

  return (
    <div>
      <Routes>
        {/* Root pages, located in /pages/ */}
        <Route path="/" element={<LogIn user={user} updateUser={updateUser}/>} />
        <Route path="/LogIn" element={<LogIn user={user} updateUser={updateUser}/>} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Search" element={<Search user={user} updateUser={updateUser}/>} />
        <Route path="/Search/:type/:id" element={<Search user={user} updateUser={updateUser}/>} />
        <Route path="/movies/:id" element={<MovieDetails />} />

        <Route path="/Watchlist" element={<Watchlist user={user} />} />
        <Route path="/WatchlistDetail" element={<WatchlistDetail user={user} />} />

        <Route path="/Montage" element={<Montage user={user} updateUser={updateUser}/>} />

        <Route path="/TestMontageButtonPage" element={<TestMontageButton />} />

        {/* 404 page not found redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
