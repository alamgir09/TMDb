import React from "react";
import { useNavigate } from "react-router-dom";

function TestMontageButton() {
  const navigate = useNavigate();
  const movieIDList = ["24767"];

  return (
    <div>
      <button
        onClick={() => {
          navigate("/Montage", { state: { movieIDList: movieIDList } });
        }}
      >
        {" "}
        Create Montage
      </button>
    </div>
  );
}

export default TestMontageButton;
