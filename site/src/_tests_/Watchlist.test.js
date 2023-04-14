import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Watchlist from "../pages/Watchlist";
import CreateWatchlistModal from "../components/CreateWatchlistModal";

describe("Watchlist page", () => {
  beforeEach(() => {
    fetch.resetMocks();
    localStorage.clear();
  });

  // Reset the browser history after each test
  afterEach(() => {
    window.history.pushState(null, document.title, "/");
  });

  test("should fetch watchlist on mount", async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: [] }));

    render(<Watchlist />, { wrapper: BrowserRouter });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual("api/getWatchlist");
    expect(fetch.mock.calls[0][1].method).toEqual("POST");
    expect(fetch.mock.calls[0][1].headers).toEqual({ "Content-Type": "application/json" });
    expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify({ userID: null }));
  });

  test("calls the handleEdit function when the edit icon is clicked", async () => {
    const user = userEvent.setup();
    const mockConsoleLog = jest.spyOn(console, "log").mockImplementation(() => {});
    const mockResponse = { data: JSON.stringify([{ name: "Watchlist 1" }, { name: "Watchlist 2" }]) };
    jest.spyOn(window, "fetch").mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    });

    const { getByText } = render(<Watchlist />, { wrapper: BrowserRouter });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const editIcons = await screen.queryAllByTestId("edit-icon");

    await waitFor(() => user.click(editIcons[0]));

    expect(mockConsoleLog).toHaveBeenCalledWith("edit watchlist: Watchlist 1");
  });

  test("calls the handleDelete function when the delete icon is clicked", async () => {
    const user = userEvent.setup();
    const mockConsoleLog = jest.spyOn(console, "log").mockImplementation(() => {});
    const mockResponse = { data: JSON.stringify([{ name: "Watchlist 1" }, { name: "Watchlist 2" }]) };
    jest.spyOn(window, "fetch").mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    });

    const { getByText } = render(<Watchlist />, { wrapper: BrowserRouter });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const deleteIcons = await screen.queryAllByTestId("delete-icon");

    await waitFor(() => user.click(deleteIcons[0]));

    expect(mockConsoleLog).toHaveBeenCalledWith("delete watchlist: Watchlist 1");
  });

  test("should navigate to watchlist detail page on click", async () => {
    localStorage.setItem("watchlist", "My List");

    const mockResponse = { data: JSON.stringify([{ name: "My List" }, { name: "Watchlist 2" }]) };
    jest.spyOn(window, "fetch").mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    });

    render(<Watchlist />, { wrapper: BrowserRouter });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const listName = screen.getByText(/My list/i);
    fireEvent.click(listName);

    expect(localStorage.getItem("watchlist")).toEqual("My List");
    expect(window.location.pathname).toEqual("/WatchlistDetail");
  });

  test("should show create watchlist modal when create watchlist button is clicked", async () => {
    const user = userEvent.setup();

    const { container } = render(<Watchlist />, { wrapper: BrowserRouter });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const element1 = container.querySelector("#createWatchlist");

    await waitFor(() => user.click(element1));

    const element = screen.queryByText("Create Watchlist", {
      selector: ".modal-title"
    });

    expect(element).toBeInTheDocument();
  });

  test('renders "No watchlist created yet" when loading is false and list length is 0', async () => {
    const mockResponse = { data: JSON.stringify([]) };
    jest.spyOn(window, "fetch").mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    });

    const { getByText } = render(<Watchlist />, { wrapper: BrowserRouter });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const noWatchlist = getByText("No watchlist created yet");
    expect(noWatchlist).toBeInTheDocument();
  });

  test("handleClose when closing the CreateWatchlistModal", async () => {
    const user = userEvent.setup();

    const { container, getByTestId } = render(<Watchlist />, { wrapper: BrowserRouter });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const element1 = container.querySelector("#createWatchlist");

    await waitFor(() => user.click(element1));

    await waitFor(() => fireEvent.click(getByTestId("createHandleClose")));

    await waitFor(() => expect(screen.queryByText("Edit Watchlist")).not.toBeInTheDocument());
  });

  test("handleClose when closing the EditWatchlistModal", async () => {
    const user = userEvent.setup();
    const mockConsoleLog = jest.spyOn(console, "log").mockImplementation(() => {});
    const mockResponse = { data: JSON.stringify([{ name: "Watchlist 1" }, { name: "Watchlist 2" }]) };
    jest.spyOn(window, "fetch").mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    });

    const { getByText, getByTestId } = render(<Watchlist />, { wrapper: BrowserRouter });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const editIcons = await screen.queryAllByTestId("edit-icon");

    await waitFor(() => user.click(editIcons[0]));

    await waitFor(() => user.click(getByTestId("editHandleClose")));

    await waitFor(() => expect(screen.queryByText("Edit Watchlist")).not.toBeInTheDocument());
  });

  test("handleDelete when closing the DeleteWatchlistModal", async () => {
    const user = userEvent.setup();
    const mockConsoleLog = jest.spyOn(console, "log").mockImplementation(() => {});
    const mockResponse = { data: JSON.stringify([{ name: "Watchlist 1" }, { name: "Watchlist 2" }]) };
    jest.spyOn(window, "fetch").mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    });

    const { getByText, getByTestId } = render(<Watchlist />, { wrapper: BrowserRouter });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const deleteIcons = await screen.queryAllByTestId("delete-icon");

    await waitFor(() => user.click(deleteIcons[0]));

    await waitFor(() => user.click(getByTestId("deleteHandleClose")));

    await waitFor(() => expect(screen.queryByText("Edit Watchlist")).not.toBeInTheDocument());
  });
});
