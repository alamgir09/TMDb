import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import MoveMovieComponent from "../components/MoveMovieComponent";

describe("MoveMovieComponent", () => {
  const watchlists = [{ name: "Watchlist 1" }, { name: "Watchlist 2" }, { name: "Watchlist 3" }];

  const modal = jest.fn();

  afterEach(() => {
    modal.mockClear();
  });

  it("renders correctly", async () => {
    const { getByTestId, getByText } = render(
      <MoveMovieComponent
        id={1}
        imgURL="http://example.com/image.jpg"
        title="Movie Title"
        releaseDate="2021-01-01"
        rating={7.5}
        watchlists={watchlists}
        fetchMovies={jest.fn()}
        modal={modal}
      />
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    fireEvent.click(getByTestId("move-icon"));

    expect(getByText("Watchlist 1")).toBeInTheDocument();
    expect(getByText("Watchlist 2")).toBeInTheDocument();
    expect(getByText("Watchlist 3")).toBeInTheDocument();
  });

  it("opens the move modal when a watchlist is clicked", async () => {
    const { getByTestId, getByText } = render(
      <MoveMovieComponent
        id={1}
        imgURL="http://example.com/image.jpg"
        title="Movie Title"
        releaseDate="2021-01-01"
        rating={7.5}
        watchlists={watchlists}
        fetchMovies={jest.fn()}
        modal={modal}
      />
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => fireEvent.click(getByTestId("move-icon")));

    fireEvent.click(getByText("Watchlist 2"));

    expect(modal).toHaveBeenCalledTimes(1);
  });

  test("else path of rendering the dropdown item", async () => {
    // Set a mock value for localStorage.getItem to return "Watchlist X"
    const localStorageMock = {
      getItem: jest.fn(() => "Watchlist X")
    };
    Object.defineProperty(window, "localStorage", { value: localStorageMock });

    // Render the component with the mock watchlists and modal function
    const { getAllByRole, getByTestId } = render(
      <MoveMovieComponent
        id={1}
        imgURL="http://example.com/image.jpg"
        title="Movie Title"
        releaseDate="2021-01-01"
        rating={7.5}
        watchlists={watchlists}
        fetchMovies={jest.fn()}
        modal={modal}
      />
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => fireEvent.click(getByTestId("move-icon")));

    // Check that there are two dropdown items rendered (Watchlist 2 and Watchlist 3)
    const dropdownItems = getAllByRole("button");
    expect(dropdownItems).toHaveLength(3);
  });
});
