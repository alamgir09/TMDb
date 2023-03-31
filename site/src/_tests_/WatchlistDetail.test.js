import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import WatchlistDetail from "../pages/WatchlistDetail";

describe("WatchlistDetail page", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  // Reset values after each test
  afterEach(() => {
    window.history.pushState(null, document.title, "/");
  });

  test("should fetch response from getMovies on mount", async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: [] }));
    render(<WatchlistDetail />, { wrapper: BrowserRouter });

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual("api/getMovies");
    expect(fetch.mock.calls[0][1].method).toEqual("POST");
    expect(fetch.mock.calls[0][1].headers).toEqual({ "Content-Type": "application/json" });
    expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify({ userID: null, watchlist: null }));
  });

  test("renders the movies", async () => {
    const mockResponse = {
      data: JSON.stringify([
        {
          imgURL: "url",
          rating: "8.9",
          releaseDate: "2022",
          title: "title"
        }
      ])
    };
    jest.spyOn(window, "fetch").mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    });

    const { getByText } = render(<WatchlistDetail />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => expect(getByText("title")).toBeInTheDocument());
  });

  test("fetching fails on the watchlist detail page with no connection", async () => {
    const consoleSpy = jest.spyOn(console, "log");

    fetch.mockResponseOnce(JSON.stringify({ data: null }));

    render(<WatchlistDetail />, { wrapper: BrowserRouter });

    await act(async () => {
      // Assert that the else path is taken
      expect(consoleSpy).not.toHaveBeenCalledWith(expect.anything());
    });
  });

  test('renders "No Movies added yet" when loading is false and list length is 0', async () => {
    const mockResponse = { data: JSON.stringify([]) };
    jest.spyOn(window, "fetch").mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    });

    const { getByText } = render(<WatchlistDetail />, { wrapper: BrowserRouter });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const noMovies = getByText("No movies added yet");
    expect(noMovies).toBeInTheDocument();
  });
});
