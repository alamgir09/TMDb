import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import CopyMovieComponent from "../components/CopyMovieComponent";

describe("CopyMovieComponent", () => {
  const watchlists = [{ name: "Watchlist 1" }, { name: "Watchlist 2" }, { name: "Watchlist 3" }];

  const modal = jest.fn();

  afterEach(() => {
    modal.mockClear();
  });

  it("renders correctly", async () => {
    const { getByTestId, getByText } = render(
      <CopyMovieComponent
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

    fireEvent.click(getByTestId("copy-icon"));

    expect(getByText("Watchlist 1")).toBeInTheDocument();
    expect(getByText("Watchlist 2")).toBeInTheDocument();
    expect(getByText("Watchlist 3")).toBeInTheDocument();
  });

  it("opens the copy modal when a watchlist is clicked", async () => {
    const { getByTestId, getByText } = render(
      <CopyMovieComponent
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

    await waitFor(() => fireEvent.click(getByTestId("copy-icon")));

    fireEvent.click(getByText("Watchlist 2"));

    expect(modal).toHaveBeenCalledTimes(1);
    expect(modal).toHaveBeenCalledWith({
      show: true,
      data: {
        id: 1,
        title: "Movie Title",
        imgURL: "http://example.com/image.jpg",
        releaseDate: "2021-01-01",
        rating: 7.5,
        type: "copy",
        watchlist: "Watchlist 2",
        text: "Are you sure you want to copy [Movie Title] to [Watchlist 2]?"
      }
    });
  });

  test("else path of rendering the dropdown item", async () => {
    // Set a mock value for localStorage.getItem to return "Watchlist X"
    const localStorageMock = {
      getItem: jest.fn(() => "Watchlist X")
    };
    Object.defineProperty(window, "localStorage", { value: localStorageMock });

    // Render the component with the mock watchlists and modal function
    const { getAllByRole, getByTestId } = render(
      <CopyMovieComponent
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

    await waitFor(() => fireEvent.click(getByTestId("copy-icon")));

    // Check that there are two dropdown items rendered (Watchlist 2 and Watchlist 3)
    const dropdownItems = getAllByRole("button");
    expect(dropdownItems).toHaveLength(3);
  });
});
