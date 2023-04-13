import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import WatchlistTypeDropdown from "../components/WatchlistTypeDropdown";

describe("WatchlistTypeDropdown", () => {
  it("should render without errors", () => {
    render(<WatchlistTypeDropdown />);
  });

  it("should update watchlist type to public on click", async () => {
    const mockResponse = { data: "Success" };
    jest.spyOn(window, "fetch").mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    });

    const { getByText, getAllByText, getByTestId } = render(
      <WatchlistTypeDropdown type="Private" watchlist="My Watchlist" />
    );

    fireEvent.click(getByText("Private"));

    await waitFor(() => fireEvent.click(getByTestId("publicWatchlist")));

    const elements = getAllByText("Public");
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it("should update watchlist type to private on click", async () => {
    const mockResponse = { data: "Success" };
    jest.spyOn(window, "fetch").mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    });

    const { getByText, getAllByText, getByTestId } = render(
      <WatchlistTypeDropdown type="Public" watchlist="My Watchlist" />
    );

    fireEvent.click(getByText("Public"));

    fireEvent.click(getByTestId("privateWatchlist"));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    const elements = getAllByText("Private");
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it("should handle else path of response.data", async () => {
    const mockConsoleLog = jest.spyOn(console, "log").mockImplementation(() => {});
    const mockResponse = { data: "Not Success" };
    jest.spyOn(window, "fetch").mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    });

    const { getByText, getAllByText, getByTestId } = render(
      <WatchlistTypeDropdown type="Public" watchlist="My Watchlist" />
    );

    fireEvent.click(getByText("Public"));

    fireEvent.click(getByTestId("privateWatchlist"));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(mockConsoleLog).not.toBeCalled();
  });

  test("error response", async () => {
    const mockError = new Error("Something went wrong!");
    const consoleSpy = jest.spyOn(console, "log");
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: () => Promise.reject(mockError)
    });

    const { getByTestId, getByText } = render(<WatchlistTypeDropdown type="Public" watchlist="My Watchlist" />);

    fireEvent.click(getByText("Public"));

    fireEvent.click(getByTestId("privateWatchlist"));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => expect(consoleSpy).toHaveBeenCalled());
  });
});
