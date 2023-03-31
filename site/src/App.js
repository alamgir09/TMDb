import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Other from "./pages/Other";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Watchlist from "./pages/Watchlist";
import WatchlistDetail from "./pages/WatchlistDetail";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <Routes>
        {/* Root pages, located in /pages/ */}
        <Route path="/" element={<Home />} />
        <Route path="/other" element={<Other />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Watchlist" element={<Watchlist />} />
        <Route path="/WatchlistDetail" element={<WatchlistDetail />} />
        <Route path="/NavBar" element={<NavBar />} />

        {/* 404 page not found redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
