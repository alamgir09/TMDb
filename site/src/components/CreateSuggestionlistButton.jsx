import React from "react";
import Button from "react-bootstrap/Button";

function CreateSuggestionlistButton({ handleShow }) {
  return (
    <Button id="CreateSuggestionlistButton" className = "CreateSuggestionlistButton" onClick={() => handleShow()} variant="danger">
      Create Suggestion List
    </Button>
  );
}

export default CreateSuggestionlistButton;
