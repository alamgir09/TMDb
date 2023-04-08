import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Watchlist from "../pages/Watchlist";
import DeleteWatchlistModal from "../components/DeleteWatchlistModal";

describe("Delete Watchlist Modal", () => {
  beforeEach(() => {
    fetch.resetMocks();
    localStorage.clear();
  });

  // Reset the browser history after each test
  afterEach(() => {
    window.history.pushState(null, document.title, "/");
  });

  const handleClose = jest.fn();
  const fetchWatchlist = jest.fn();
  const watchlist = "watchlistName";
  const props = {
    show: true,
    handleClose,
    fetchWatchlist,
    watchlist
  };

  it("should call handleClose when Cancel button is clicked", () => {
    const { getByText } = render(<DeleteWatchlistModal {...props} />);
    const cancelButton = getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(handleClose).toHaveBeenCalled();
  });

  it("should call handleDeleteWatchlistForm and fetchWatchlist when Confirm button is clicked", async () => {
    const mockResponse = { data: "Success" };
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    );
    const { getByText } = render(<DeleteWatchlistModal {...props} />);
    const confirmButton = getByText("Confirm");
    await act(async () => {
      fireEvent.click(confirmButton);
    });
    expect(fetch).toHaveBeenCalledWith("api/editWatchlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        watchlistOld: watchlist,
        userID: localStorage.getItem("userID"),
        operation: "delete"
      })
    });
    expect(fetchWatchlist).toHaveBeenCalled();
    expect(handleClose).toHaveBeenCalled();
    global.fetch.mockRestore();
  });

  it("else path when response.data is not success", async () => {
    const mockResponse = { data: "not success" };
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    );
    const { getByText } = render(<DeleteWatchlistModal {...props} />);
    const confirmButton = getByText("Confirm");
    await act(async () => {
      fireEvent.click(confirmButton);
    });
    expect(fetch).toHaveBeenCalledWith("api/editWatchlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        watchlistOld: watchlist,
        userID: localStorage.getItem("userID"),
        operation: "delete"
      })
    });
    expect(fetchWatchlist).not.toHaveBeenCalled();
    expect(handleClose).not.toHaveBeenCalled();
    global.fetch.mockRestore();
  });

  it("should log an error if fetch fails", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() => Promise.reject(new Error("Fetch failed")));
    const spy = jest.spyOn(console, "log").mockImplementation();
    const { getByText } = render(<DeleteWatchlistModal {...props} />);
    const confirmButton = getByText("Confirm");
    await act(async () => {
      fireEvent.click(confirmButton);
    });
    expect(spy).toHaveBeenCalledWith(new Error("Fetch failed"));
    global.fetch.mockRestore();
    spy.mockRestore();
  });
});
