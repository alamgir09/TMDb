import React from "react";
import Button from "react-bootstrap/Button";

function GetSuggestionListButton({ handleShow }) {
  return (
    <Button id="getSuggestionList" onClick={() => handleShow()} variant="danger">
      Get Suggestion List
    </Button>
  );
}

export default GetSuggestionListButton;
