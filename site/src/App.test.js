import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
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

  // verify page content for default route
  expect(screen.getByText(/Home Page/)).toBeInTheDocument();

  // verify page content for expected route after navigating
  await waitFor(() => user.click(screen.getByText(/click to go to other page/i)));
  expect(screen.getByText(/Other Page/)).toBeInTheDocument();
  expect(screen.getByText(/current state counter/i)).toBeInTheDocument();

  await waitFor(() => user.click(screen.getByText(/click to go to home page/i)));
  expect(screen.getByText(/Home Page/)).toBeInTheDocument();
});

test("fetching works on the home page", async () => {
  fetch.mockResponseOnce(JSON.stringify({ data: "Pong Frontend. Received at 2023-02-25T20:49:00.813447Z." }));

  const user = userEvent.setup();
  render(<App />, { wrapper: BrowserRouter });

  // verify page content for default route
  expect(screen.getByText(/Home Page/)).toBeInTheDocument();
  await waitFor(() => user.click(screen.getByText(/fetch backend/i)));
  expect(screen.getByText(/pong frontend./i)).toBeInTheDocument();

  expect(fetch).toHaveBeenCalledTimes(1);
});

test("fetching fails on the home page with no connection", async () => {
  fetch.mockRejectOnce(new Error("API is down"));

  const user = userEvent.setup();
  render(<App />, { wrapper: BrowserRouter });

  expect(screen.getByText(/Home Page/)).toBeInTheDocument();
  await waitFor(() => user.click(screen.getByText(/fetch backend/i)));
  expect(screen.getByText(/An API error occured/i)).toBeInTheDocument();

  expect(fetch).toHaveBeenCalledTimes(1);
});

test("fetching fails on the home page with malformed API response", async () => {
  fetch.mockResponseOnce(JSON.stringify({ data: null }));

  const user = userEvent.setup();
  render(<App />, { wrapper: BrowserRouter });

  expect(screen.getByText(/Home Page/)).toBeInTheDocument();
  await waitFor(() => user.click(screen.getByText(/fetch backend/i)));

  expect(fetch).toHaveBeenCalledTimes(1);
});

test("counting works on the other page", async () => {
  const user = userEvent.setup();
  render(<App />, { wrapper: BrowserRouter });

  // verify page content for default route
  expect(screen.getByText(/Home Page/)).toBeInTheDocument();

  // verify page content for expected route after navigating
  await waitFor(() => user.click(screen.getByText(/click to go to other page/i)));
  expect(screen.getByText(/current state counter/i)).toBeInTheDocument();

  await waitFor(() => user.click(screen.getByText(/increment counter/i)));
  await waitFor(() => user.click(screen.getByText(/increment counter/i)));
  expect(screen.getByText(/current state counter: 2/i)).toBeInTheDocument();
  await waitFor(() => user.click(screen.getByText(/clear counter/i)));
  expect(screen.getByText(/current state counter: 0/i)).toBeInTheDocument();
  let counter = 12;
  for (let i = 0; i < counter; i++) {
    await waitFor(() => user.click(screen.getByText(/increment counter/i)));
  }
  expect(screen.getByText(/current state counter: 12/i)).toBeInTheDocument();
  expect(screen.getByText(/Counter is greater than 10./i)).toBeInTheDocument();
});
