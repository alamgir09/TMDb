import React from "react";
import { useNavigate } from "react-router-dom";


function TestMontageButton() {

  const navigate = useNavigate();
  const movieIDList = ["225", "550", "2038", "18", "601759", "68721", "428045", "169934", "339259", "10679"];

  return (
    <div>
      <button
        onClick={() => { navigate("/Montage", { state: { movieIDList: movieIDList } });}}> Create Montage
      </button>
    </div>
  );
}

export default TestMontageButton;