import React from "react";
import { addMovie, deleteMovie } from "../functions";
import { act, waitFor } from "@testing-library/react";

describe("movies", () => {
  describe("addMovie", () => {
    it("should call fetch with the correct arguments", () => {
      const id = "123";
      const title = "Test Movie";
      const imgURL = "https://example.com/image.jpg";
      const releaseDate = "2023-01-01";
      const rating = 4.5;
      const watchlist = "Watchlist 1";

      const fetchMock = jest.fn();
      global.fetch = fetchMock;

      const mockResponse = { data: "Success" };
      jest.spyOn(window, "fetch").mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      addMovie(id, title, imgURL, releaseDate, rating, watchlist);

      expect(fetchMock).toHaveBeenCalledWith("api/addMovie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          watchlist: watchlist,
          userID: localStorage.getItem("userID"),
          movie: { id, title, imgURL, releaseDate, rating }
        })
      });
    });
  });

  describe("deleteMovie", () => {
    it("should call fetch with the correct arguments", async () => {
      const id = "123";
      const watchlist = "Watchlist 1";

      const fetchMock = jest.fn();
      global.fetch = fetchMock;
      const mockResponse = { data: "Success" };
      jest.spyOn(window, "fetch").mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });
      localStorage.setItem("userID", "test");

      deleteMovie(id, watchlist);

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(fetchMock).toHaveBeenCalledWith("api/deleteMovie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userID: localStorage.getItem("userID"),
          movieID: id,
          watchlist: watchlist
        })
      });
    });

    test("else path of response.data", async () => {
      const id = "123";
      const watchlist = "Watchlist 1";

      const fetchMock = jest.fn();
      global.fetch = fetchMock;
      const mockResponse = { data: "Not Success" };
      jest.spyOn(window, "fetch").mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });
      const consoleSpy = jest.spyOn(console, "log");
      localStorage.setItem("userID", "test");

      deleteMovie(id, watchlist);

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      await waitFor(() => expect(consoleSpy).not.toBeCalled());
    });
  });

  test("error response for delete", async () => {
    const mockError = new Error("Something went wrong!");
    const consoleSpy = jest.spyOn(console, "log");
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: () => Promise.reject(mockError)
    });

    deleteMovie("123", "watchlist 1");

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => expect(consoleSpy).toHaveBeenCalled());
  });
});
