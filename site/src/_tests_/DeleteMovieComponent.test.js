import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DeleteMovieComponent from "../components/DeleteMovieComponent";

describe("DeleteMovieComponent", () => {
  const mockModal = jest.fn();
  const mockId = "123";
  const mockTitle = "The Matrix";
  const mockWatchlist = "watchlist1";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should open the modal with correct props when clicked", () => {
    // Set a mock value for localStorage.getItem to return "Watchlist X"
    const localStorageMock = {
      getItem: jest.fn(() => "Watchlist 1")
    };
    Object.defineProperty(window, "localStorage", { value: localStorageMock });

    const { getByTestId } = render(<DeleteMovieComponent id={mockId} title={mockTitle} modal={mockModal} />);
    const deleteIcon = getByTestId("delete-icon");
    fireEvent.click(deleteIcon);
    expect(mockModal).toHaveBeenCalledTimes(1);
  });
});
