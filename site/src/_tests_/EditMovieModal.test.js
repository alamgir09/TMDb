import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import EditMovieModal from "../components/EditMovieModal";
import { addMovie, deleteMovie } from "../functions";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  fetch.resetMocks();
});

// Reset the browser history after each test
afterEach(() => {
  window.history.pushState(null, document.title, "/");
});

jest.mock("../functions.js", () => ({
  addMovie: jest.fn(),
  deleteMovie: jest.fn()
}));

describe("EditMovieModal", () => {
  const mockModal = {
    show: true,
    data: {
      type: "copy",
      id: 1,
      title: "Test Movie",
      imgURL: "http://test-image.com",
      releaseDate: "2022-01-01",
      rating: 4,
      watchlist: "test-watchlist",
      text: "Text"
    }
  };

  const setModal = jest.fn();

  it("renders correctly", () => {
    const { getByText } = render(<EditMovieModal modal={mockModal} handleClose={jest.fn()} fetchMovies={jest.fn()} />);

    expect(getByText("Edit Movie")).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
    expect(getByText("Confirm")).toBeInTheDocument();
  });

  it("calls addMovie and handleClose on Confirm button click with type copy", async () => {
    const handleClose = jest.fn();
    const fetchMovies = jest.fn();
    const userOne = userEvent.setup();

    const { getByText } = render(
      <EditMovieModal setModal={setModal} modal={mockModal} handleClose={handleClose} fetchMovies={fetchMovies} />
    );

    await waitFor(() => userOne.click(getByText("Confirm")));

    expect(addMovie).toHaveBeenCalledWith(
      mockModal.data.id,
      mockModal.data.title,
      mockModal.data.imgURL,
      mockModal.data.releaseDate,
      mockModal.data.rating,
      mockModal.data.watchlist,
      setModal
    );
  });

  it("calls addMovie and deleteMovie and handleClose on Confirm button click with type move", async () => {
    const handleClose = jest.fn();
    const fetchMovies = jest.fn();
    const mockModalMove = {
      ...mockModal,
      data: {
        ...mockModal.data,
        type: "move"
      }
    };
    const { getByText } = render(
      <EditMovieModal modal={mockModalMove} handleClose={handleClose} fetchMovies={fetchMovies} />
    );

    fireEvent.click(getByText("Confirm"));

    expect(addMovie).toHaveBeenCalledWith(
      mockModalMove.data.id,
      mockModalMove.data.title,
      mockModalMove.data.imgURL,
      mockModalMove.data.releaseDate,
      mockModalMove.data.rating,
      mockModalMove.data.watchlist,
      undefined
    );

    expect(deleteMovie).toHaveBeenCalledWith(
      mockModalMove.data.id,
      localStorage.getItem("watchlist"),
      "test-watchlist"
    );
  });

  it("calls deleteMovie and handleClose on Confirm button click with type delete", async () => {
    const handleClose = jest.fn();
    const fetchMovies = jest.fn();
    const mockModalMove = {
      ...mockModal,
      data: {
        ...mockModal.data,
        type: "delete"
      }
    };

    localStorage.setItem("watchlist", mockModal.data.watchlist);

    const { getByText } = render(
      <EditMovieModal modal={mockModalMove} handleClose={handleClose} fetchMovies={fetchMovies} />
    );

    fireEvent.click(getByText("Confirm"));

    expect(deleteMovie).toHaveBeenCalledWith(mockModalMove.data.id, localStorage.getItem("watchlist"), "null");
  });
});
