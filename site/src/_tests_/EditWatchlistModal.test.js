import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Watchlist from "../pages/Watchlist";
import EditWatchlistModal from "../components/EditWatchlistModal";

describe("Edit Watchlist Modal", () => {
  beforeEach(() => {
    fetch.resetMocks();
    localStorage.clear();
  });

  // Reset the browser history after each test
  afterEach(() => {
    window.history.pushState(null, document.title, "/");
  });
  const mockFetchWatchlist = jest.fn();
  const mockHandleClose = jest.fn();
  const mockWatchlistOld = "Watchlist 1";

  it("should render the modal and form correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <EditWatchlistModal
        show={true}
        handleClose={mockHandleClose}
        fetchWatchlist={mockFetchWatchlist}
        watchlistOld={mockWatchlistOld}
      />
    );

    // Modal title
    expect(getByText("Edit Watchlist")).toBeInTheDocument();

    // Form input
    expect(getByPlaceholderText(mockWatchlistOld)).toBeInTheDocument();

    // Close and Save buttons
    expect(getByText("Close")).toBeInTheDocument();
    expect(getByText("Save")).toBeInTheDocument();
  });

  it("should call the handleClose function when Close button is clicked", () => {
    const { getByText } = render(
      <EditWatchlistModal
        show={true}
        handleClose={mockHandleClose}
        fetchWatchlist={mockFetchWatchlist}
        watchlistOld={mockWatchlistOld}
      />
    );

    fireEvent.click(getByText("Close"));

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  it("should display error message if watchlistName is not entered when Save button is clicked", async () => {
    const { getByText } = render(
      <EditWatchlistModal
        show={true}
        handleClose={mockHandleClose}
        fetchWatchlist={mockFetchWatchlist}
        watchlistOld={mockWatchlistOld}
      />
    );

    fireEvent.click(getByText("Save"));

    await waitFor(() => {
      expect(getByText("Please enter watchlist name")).toBeInTheDocument();
    });

    expect(mockHandleClose).toHaveBeenCalledTimes(0);
    expect(mockFetchWatchlist).toHaveBeenCalledTimes(0);
  });

  it("should call fetchWatchlist, handleClose, and reset watchlistName state when Save button is clicked with valid inputs", async () => {
    const fakeResponse = { data: "Success" };
    const fetchSpy = jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeResponse)
      })
    );

    const { getByText, getByPlaceholderText } = render(
      <EditWatchlistModal
        show={true}
        handleClose={mockHandleClose}
        fetchWatchlist={mockFetchWatchlist}
        watchlistOld={mockWatchlistOld}
      />
    );

    const mockWatchlistNew = "Watchlist 2";
    fireEvent.change(getByPlaceholderText(mockWatchlistOld), { target: { value: mockWatchlistNew } });
    fireEvent.click(getByText("Save"));

    await waitFor(() => {
      expect(mockFetchWatchlist).toHaveBeenCalledTimes(1);
      expect(mockHandleClose).toHaveBeenCalledTimes(1);
      expect(getByPlaceholderText(mockWatchlistOld)).toHaveValue("");
    });
  });

  it("should log an error if fetch fails", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() => Promise.reject(new Error("Fetch failed")));
    const spy = jest.spyOn(console, "log").mockImplementation();
    const { getByText, getByPlaceholderText } = render(
      <EditWatchlistModal
        show={true}
        handleClose={mockHandleClose}
        fetchWatchlist={mockFetchWatchlist}
        watchlistOld={mockWatchlistOld}
      />
    );
    const mockWatchlistNew = "Watchlist 2";
    fireEvent.change(getByPlaceholderText(mockWatchlistOld), { target: { value: mockWatchlistNew } });
    const confirmButton = getByText("Save");
    await act(async () => {
      fireEvent.click(confirmButton);
    });
    expect(spy).toHaveBeenCalledWith(new Error("Fetch failed"));
    global.fetch.mockRestore();
    spy.mockRestore();
  });

  it("else path when response.data is not success", async () => {
    const fetchWatchlist = jest.fn();
    const mockResponse = { data: "not success" };
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    );
    const { getByText, getByPlaceholderText } = render(
      <EditWatchlistModal
        show={true}
        handleClose={mockHandleClose}
        fetchWatchlist={mockFetchWatchlist}
        watchlistOld={mockWatchlistOld}
      />
    );
    const mockWatchlistNew = "Watchlist 2";
    fireEvent.change(getByPlaceholderText(mockWatchlistOld), { target: { value: mockWatchlistNew } });
    const confirmButton = getByText("Save");
    await act(async () => {
      fireEvent.click(confirmButton);
    });
    expect(fetch).toHaveBeenCalledWith("api/editWatchlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        watchlistOld: mockWatchlistOld,
        watchlistNew: mockWatchlistNew,
        userID: localStorage.getItem("userID"),
        operation: "edit"
      })
    });
    expect(fetchWatchlist).not.toHaveBeenCalled();
    global.fetch.mockRestore();
  });
});
