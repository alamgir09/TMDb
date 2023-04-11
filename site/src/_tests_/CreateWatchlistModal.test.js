import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Watchlist from "../pages/Watchlist";
import CreateWatchlistModal from "../components/CreateWatchlistModal";

describe("Create Watchlist Modal", () => {
  beforeEach(() => {
    fetch.resetMocks();
    localStorage.clear();
  });

  // Reset the browser history after each test
  afterEach(() => {
    window.history.pushState(null, document.title, "/");
  });

  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <CreateWatchlistModal show={true} handleClose={() => {}} fetchWatchlist={() => {}} />
    );
    expect(getByText("Create Watchlist")).toBeInTheDocument();
    expect(getByPlaceholderText("Name")).toBeInTheDocument();
    expect(getByText("Public")).toBeInTheDocument();
    expect(getByText("Private")).toBeInTheDocument();
    expect(getByText("Close")).toBeInTheDocument();
    expect(getByText("Create")).toBeInTheDocument();
  });

  it("submits form correctly", async () => {
    const fakeResponse = { data: "Success" };
    const fetchSpy = jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeResponse)
      })
    );
    const fetchWatchlist = jest.fn();
    const handleClose = jest.fn();
    const { getByPlaceholderText, getByText, getByLabelText } = render(
      <CreateWatchlistModal show={true} handleClose={handleClose} fetchWatchlist={fetchWatchlist} />
    );
    const nameInput = getByPlaceholderText("Name");
    fireEvent.change(nameInput, { target: { value: "Test Watchlist" } });
    const publicRadio = getByLabelText("Public");
    fireEvent.click(publicRadio);
    const createButton = getByText("Create");
    fireEvent.click(createButton);
    await waitFor(() => expect(fetchWatchlist).toHaveBeenCalled());
    expect(handleClose).toHaveBeenCalled();
  });

  it("displays error message if form is submitted with empty inputs", async () => {
    const { getByText } = render(<CreateWatchlistModal show={true} handleClose={() => {}} fetchWatchlist={() => {}} />);
    const createButton = getByText("Create");
    fireEvent.click(createButton);
    const errorMessage = await waitFor(() => getByText("Please fill in all fields"));
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays error message if watchlist already exists", async () => {
    const fetchWatchlist = jest.fn();
    const fakeResponse = { data: "Watchlist already exists" };
    const fetchSpy = jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeResponse)
      })
    );

    const { getByPlaceholderText, getByText, getByLabelText } = render(
      <CreateWatchlistModal show={true} handleClose={() => {}} fetchWatchlist={fetchWatchlist} />
    );
    const nameInput = getByPlaceholderText("Name");
    fireEvent.change(nameInput, { target: { value: "Existing Watchlist" } });
    const privateRadio = getByLabelText("Private");
    fireEvent.click(privateRadio);
    const createButton = getByText("Create");
    fireEvent.click(createButton);
    const errorMessage = await waitFor(() => getByText("Watchlist already exists"));
    expect(errorMessage).toBeInTheDocument();
  });

  it("fetching fails", async () => {
    const fetchWatchlist = jest.fn();
    fetch.mockRejectOnce(new Error("API is down"));

    const { getByPlaceholderText, getByText, getByLabelText } = render(
      <CreateWatchlistModal show={true} handleClose={() => {}} fetchWatchlist={fetchWatchlist} />
    );
    const nameInput = getByPlaceholderText("Name");
    fireEvent.change(nameInput, { target: { value: "Existing Watchlist" } });
    const privateRadio = getByLabelText("Private");
    fireEvent.click(privateRadio);
    const createButton = getByText("Create");
    fireEvent.click(createButton);

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should update the type state when radio button is clicked", () => {
    const fetchWatchlist = jest.fn();
    const { getByLabelText } = render(
      <CreateWatchlistModal show={true} handleClose={() => {}} fetchWatchlist={fetchWatchlist} />
    );
    const radioPublic = getByLabelText("Public");

    fireEvent.click(radioPublic);

    const radioPrivate = getByLabelText("Private");

    fireEvent.click(radioPrivate);

    expect(radioPrivate.checked).toBe(true);
  });
});
