import React from "react";
import { render, screen, fireEvent, getAllByText } from "@testing-library/react";
import Search from "../pages/Search";
import MovieBox from "../components/MovieBox";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

beforeEach(() => {
  fetch.resetMocks();
});

// Reset the browser history after each test
afterEach(() => {
  window.history.pushState(null, document.title, "/Search");
});

it("check if search state is updated when user inputs text into search box", () => {
  const user = userEvent.setup();
  const { getByPlaceholderText } = render(<Search />, { wrapper: BrowserRouter });

  const usernameInput = getByPlaceholderText("Search....");
  fireEvent.change(usernameInput, { target: { value: "test-search" } });

  expect(usernameInput).toHaveValue("test-search");
});

it("movieBox exists", () => {
  const { getByText } = render(
    <div id="starter">
      <MovieBox
        key="1"
        imgURL={"https://assets.mubicdn.net/images/notebook/post_images/29882/images-w1400.jpg?1579663202"}
        title={"Title"}
        release_date={"Release Date"}
        rating={"Rating"}
      />
    </div>
  , { wrapper: BrowserRouter });

  const titleElement = getByText("Title");
  expect(titleElement).toBeInTheDocument();
});

it("movieBox.title exists", () => {
  const { getByText } = render(
    <div id="starter">
      <MovieBox
        key="1"
        imgURL={"https://assets.mubicdn.net/images/notebook/post_images/29882/images-w1400.jpg?1579663202"}
        title={""}
        release_date={"Release Date"}
        rating={"Rating"}
      />
    </div>
  , { wrapper: BrowserRouter });

  const titleElement = getByText("?");
  expect(titleElement).toBeInTheDocument();
});

it("movieBox.release_date exists", () => {
  const { getByText } = render(
    <div id="starter">
      <MovieBox
        key="1"
        imgURL={"https://assets.mubicdn.net/images/notebook/post_images/29882/images-w1400.jpg?1579663202"}
        title={"Title"}
        release_date={"Release Date"}
        rating={"Rating"}
      />
    </div>
  , { wrapper: BrowserRouter });

  const titleElement = getByText("Release Date");
  expect(titleElement).toBeInTheDocument();
});

it("movieBox.release_date exists", () => {
  const { getByText } = render(
    <div id="starter">
      <MovieBox
        key="1"
        imgURL={"https://assets.mubicdn.net/images/notebook/post_images/29882/images-w1400.jpg?1579663202"}
        title={"Title"}
        release_date={"Release Date"}
        rating={"Rating"}
      />
    </div>
  , { wrapper: BrowserRouter });

  const titleElement = getByText("Release Date");
  expect(titleElement).toBeInTheDocument();
});

// it("check if search state is updated when user inputs text into search box", () => {
//   const user = userEvent.setup();
//   const { getByPlaceholderText } = render(<Search />, { wrapper: BrowserRouter });

//   const usernameInput = getByPlaceholderText("Search....");
//   fireEvent.change(usernameInput, { target: { value: "test-search" } });

//   expect(usernameInput).toHaveValue("test-search");
// });

// it("check if search state is updated when user inputs text into search box", () => {
//   const user = userEvent.setup();
//   const { getByPlaceholderText } = render(<Search />, { wrapper: BrowserRouter });

//   const usernameInput = getByPlaceholderText("Search....");
//   fireEvent.change(usernameInput, { target: { value: "test-search" } });

//   expect(usernameInput).toHaveValue("test-search");
// });
