import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Search from "../pages/Search";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

beforeEach(() => {
  fetch.resetMocks();
});

// Reset the browser history after each test
afterEach(() => {
  window.history.pushState(null, document.title, "/Search");
});


it("check if search state is updated when user inputs text into search box", () => {
  const user = userEvent.setup();
  const { getByPlaceholderText } = render(<Search />, { wrapper: BrowserRouter });


  const usernameInput = getByPlaceholderText("Search....");
  fireEvent.change(usernameInput, { target: { value: "test-search" } });

  expect(usernameInput).toHaveValue("test-search");
});

