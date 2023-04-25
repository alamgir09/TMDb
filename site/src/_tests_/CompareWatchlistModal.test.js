import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Watchlist from "../pages/Watchlist";
import CompareWatchlistModal from "../components/CompareWatchlistModal";

describe("Compare Watchlist Modal", () => {
  beforeEach(() => {
    fetch.resetMocks();
    localStorage.clear();
  });

  // Reset the browser history after each test
  afterEach(() => {
    window.history.pushState(null, document.title, "/");
  });

  const users = [
    {
      userID: 1,
      username: "user1",
      watchlist: [
        {
          name: "Public Watchlist",
          type: "Public",
          movies: [{ title: "Movie 1" }, { title: "Movie 2" }]
        },
        {
          name: "Private Watchlist",
          type: "Private",
          movies: [{ title: "Movie 3" }, { title: "Movie 4" }]
        }
      ]
    },
    {
      userID: 2,
      username: "user2",
      watchlist: [
        {
          name: "Public Watchlist",
          type: "Public",
          movies: [{ title: "Movie 5" }, { title: "Movie 6" }]
        }
      ]
    }
  ];

  it("renders correctly with initial props", () => {
    const handleClose = jest.fn();
    const createModalOpen = jest.fn();
    const setMergedMovies = jest.fn();
    const userAMovies = [{ title: "Movie 1" }, { title: "Movie 2" }];
    const mergedMovies = [];

    const { getByText } = render(
      <CompareWatchlistModal
        users={users}
        handleClose={handleClose}
        show={true}
        userAMovies={userAMovies}
        mergedMovies={mergedMovies}
        createModalOpen={createModalOpen}
        setMergedMovies={setMergedMovies}
      />
    );

    expect(getByText("Select an user")).toBeInTheDocument();
    expect(getByText("user1")).toBeInTheDocument();
    expect(getByText("user2")).toBeInTheDocument();
  });

  it("shows watchlists for a user when an user is selected", () => {
    const handleClose = jest.fn();
    const createModalOpen = jest.fn();
    const setMergedMovies = jest.fn();
    const userAMovies = [{ title: "Movie 1" }, { title: "Movie 2" }];
    const mergedMovies = [];

    const { getByText } = render(
      <CompareWatchlistModal
        users={users}
        handleClose={handleClose}
        show={true}
        userAMovies={userAMovies}
        mergedMovies={mergedMovies}
        createModalOpen={createModalOpen}
        setMergedMovies={setMergedMovies}
      />
    );

    fireEvent.click(getByText("user1"));

    expect(getByText("Select a Watchlist")).toBeInTheDocument();
    expect(getByText("Public Watchlist")).toBeInTheDocument();
  });

  it("shows movies for a watchlist when an watchlist is selected", async () => {
    const handleClose = jest.fn();
    const createModalOpen = jest.fn();
    const setMergedMovies = jest.fn();
    const userAMovies = [{ title: "Movie 10" }, { title: "Movie 20" }];
    const mergedMovies = [{ title: "Movie 10" }, { title: "Movie 20" }];

    const { getByText } = render(
      <CompareWatchlistModal
        users={users}
        handleClose={handleClose}
        show={true}
        userAMovies={userAMovies}
        mergedMovies={mergedMovies}
        createModalOpen={createModalOpen}
        setMergedMovies={setMergedMovies}
      />
    );

    fireEvent.click(getByText("user1"));

    await waitFor(() => fireEvent.click(getByText("Public Watchlist")));

    await waitFor(() => expect(getByText("Merged Movies")).toBeInTheDocument());
  });

  it("goes back to select user on click of back", async () => {
    const handleClose = jest.fn();
    const createModalOpen = jest.fn();
    const setMergedMovies = jest.fn();
    const userAMovies = [{ title: "Movie 10" }, { title: "Movie 20" }];
    const mergedMovies = [{ title: "Movie 10" }, { title: "Movie 20" }];

    const { getByText } = render(
      <CompareWatchlistModal
        users={users}
        handleClose={handleClose}
        show={true}
        userAMovies={userAMovies}
        mergedMovies={mergedMovies}
        createModalOpen={createModalOpen}
        setMergedMovies={setMergedMovies}
      />
    );

    fireEvent.click(getByText("user1"));

    await waitFor(() => fireEvent.click(getByText("Back to Select User")));

    await waitFor(() => expect(getByText("Select an user")).toBeInTheDocument());
  });

  it("closes modal on close", async () => {
    const handleClose = jest.fn();
    const createModalOpen = jest.fn();
    const setMergedMovies = jest.fn();
    const userAMovies = [{ title: "Movie 10" }, { title: "Movie 20" }];
    const mergedMovies = [{ title: "Movie 10" }, { title: "Movie 20" }];

    const { getByText } = render(
      <CompareWatchlistModal
        users={users}
        handleClose={handleClose}
        show={true}
        userAMovies={userAMovies}
        mergedMovies={mergedMovies}
        createModalOpen={createModalOpen}
        setMergedMovies={setMergedMovies}
      />
    );

    fireEvent.click(getByText("user1"));

    await waitFor(() => fireEvent.click(getByText("Close")));
  });
});
