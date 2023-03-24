import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Other from "./pages/Other";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Watchlist from "./pages/Watchlist";


function App() {
  return (
    <div>
      <Routes>
        {/* Root pages, located in /pages/ */}
        <Route path="/" element={<Home />} />
        <Route path="/other" element={<Other />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        {/* 404 page not found redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
