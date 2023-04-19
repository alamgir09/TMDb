import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
//import Home from "./pages/Home";
import Other from "./pages/Other";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Watchlist from "./pages/Watchlist";
import WatchlistDetail from "./pages/WatchlistDetail";
import Search from "./pages/Search";
import MovieDetails from "./components/MovieDetails";
import Montage from "./pages/Montage";
import TestMontageButton from "./pages/TestMontageButtonPage";

function App() {
  return (
    <div>
      <Routes>
        {/* Root pages, located in /pages/ */}
        <Route path="/" element={<LogIn />} />
        <Route path="/other" element={<Other />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Search/:type/:id" element={<Search />} />
        <Route path="/movies/:id" element={<MovieDetails />} />

        <Route path="/Watchlist" element={<Watchlist />} />
        <Route path="/WatchlistDetail" element={<WatchlistDetail />} />

        <Route path="/Montage" element={<Montage />} />

        <Route path="/TestMontageButtonPage" element={<TestMontageButton />} />

        {/* 404 page not found redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
