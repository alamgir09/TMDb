import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import { BrowserRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  fetch.resetMocks();
});

// Reset the browser history after each test
afterEach(() => {
  window.history.pushState(null, document.title, "/");
});

test("that math works", async () => {
  expect(5 + 5).toBe(10);
});

test("full app rendering/navigating", async () => {
  const user = userEvent.setup();
  render(<App />, { wrapper: BrowserRouter });

  // verify page content for expected route after navigating
  await waitFor(() => user.click(screen.getByText(/Log In/i)));
  expect(screen.getByText(/Log In/)).toBeInTheDocument();
});

test("full app rendering/navigating", async () => {
  const user = userEvent.setup();
  render(<App />, { wrapper: BrowserRouter });

  // verify page content for default route
  expect(screen.getByText(/Log In/)).toBeInTheDocument();

});
