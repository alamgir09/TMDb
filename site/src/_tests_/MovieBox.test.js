import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import MovieBox from "../components/MovieBox";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn()
}));

describe("MovieBox", () => {
  const props = {
    id: "1",
    imgURL: "https://example.com/movie.jpg",
    title: "Example Movie",
    release_date: "2022-01-01",
    rating: "8.5"
  };

  it("renders a movie button", () => {
    const { getByText } = render(<MovieBox {...props} />);
    expect(getByText(props.title)).toBeInTheDocument();
  });

  it("renders a movie button with null values", () => {
      const { getAllByText } = render(<MovieBox id={""} imgURL={""} title={""} release_date={""} rating={""} />);

      expect(getAllByText("?")[0]).toBeInTheDocument();
    });

  it("renders the movie image with the expected URL and alt text", () => {
    const { getByAltText } = render(<MovieBox {...props} />);
    expect(getByAltText(props.title)).toHaveAttribute("src", props.imgURL);
  });

  it("calls navigate when the button is clicked", () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    const { getByText } = render(<MovieBox {...props} />);
    fireEvent.click(getByText(props.title));
    expect(navigate).toHaveBeenCalledWith(`/movies/${props.id}`);
  });
});
