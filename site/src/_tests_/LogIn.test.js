import React from "react";
import { render, screen, waitFor, act, fireEvent } from "@testing-library/react";
import LogIn from "../pages/LogIn";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  fetch.resetMocks();
});

test("fetching fails on the log in page with no connection", async () => {
  fetch.mockRejectOnce(new Error("API is down"));

  const user = userEvent.setup();
  render(<LogIn />, { wrapper: BrowserRouter });

  expect(screen.getByText(/Log In/)).toBeInTheDocument();
  await waitFor(() => user.click(screen.getByText(/Submit/i)));
  expect(screen.getByText(/An API error occurred/i)).toBeInTheDocument();

  expect(fetch).toHaveBeenCalledTimes(1);
});

test("fetching works on the log in page", async () => {
  const mockResponse = { data: JSON.stringify({ Type: "Success", userID: "6424ef2270dbc64dd74ce0aa" }) };
  jest.spyOn(window, "fetch").mockResolvedValueOnce({
    json: () => Promise.resolve(mockResponse)
  });

  const user = userEvent.setup();
  render(<LogIn />, { wrapper: BrowserRouter });

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  // verify page content for default route
  expect(screen.getByText(/Log In/)).toBeInTheDocument();
  await waitFor(() => user.click(screen.getByText(/Submit/i)));
  expect(screen.queryByText(/Success/i)).toBeInTheDocument();

  expect(fetch).toHaveBeenCalledTimes(1);
});

test("error message when user inputs invalid login credentials", async () => {
  const mockResponse = { data: JSON.stringify({ Type: "Error", Message: "Username not found" }) };
  jest.spyOn(window, "fetch").mockResolvedValueOnce({
    json: () => Promise.resolve(mockResponse)
  });

  const user = userEvent.setup();
  render(<LogIn />, { wrapper: BrowserRouter });

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  // verify page content for default route
  expect(screen.getByText(/Log In/)).toBeInTheDocument();
  await waitFor(() => user.click(screen.getByText(/Submit/i)));
  expect(screen.queryByText(/Username not found/i)).toBeInTheDocument();

  expect(fetch).toHaveBeenCalledTimes(1);
});

it("check if username state is updated when user inputs username into text box", () => {
//  const user = userEvent.setup();
  const { getByPlaceholderText } = render(<LogIn />);
  const usernameInput = getByPlaceholderText("Username");
  fireEvent.change(usernameInput, { target: { value: "test-user" } });

  expect(usernameInput).toHaveValue("test-user");
});

it("check if password state is updated when user inputs password into text box", () => {
//  const user = userEvent.setup();
  const { getByPlaceholderText } = render(<LogIn />);
  const usernameInput = getByPlaceholderText("Password");
  fireEvent.change(usernameInput, { target: { value: "test-password" } });

  expect(usernameInput).toHaveValue("test-password");
});
