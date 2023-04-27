import React from "react";
import { render, screen, fireEvent, getAllByText, act, waitFor } from "@testing-library/react";
import Search from "../pages/Search";
import MovieBox from "../components/MovieBox";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { idSearch, nonIdSearch } from "../pages/Search";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn()
}));

// Reset the browser history after each test
afterEach(() => {
  window.history.pushState(null, document.title, "/");
});

//test("renders search form properly", async () => {
//  const mockResponse = { data: JSON.stringify([{ name: "Watchlist 1" }, { name: "Watchlist 2" }]) };
//  jest.spyOn(window, "fetch").mockResolvedValueOnce({
//    json: () => Promise.resolve(mockResponse)
//  });
//
//  useParams.mockReturnValue({ id: "test", type: "Actors" });
//
//  render(<Search />);
//
//  await act(async () => {
//    await new Promise((resolve) => setTimeout(resolve, 0));
//  });
//
//  expect(screen.getByText(/Search/i)).toBeInTheDocument();
//});

test("displays search results when search button is clicked", async () => {
  useParams.mockReturnValue({ id: "test", type: "All" });
  useNavigate.mockReturnValue(jest.fn());
  const mockResponse = {
    results: [
      { id: 1, title: "Test Movie 1" },
      { id: 2, title: "Test Movie 2" }
    ],
    total_results: 2
  };
  global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(mockResponse) }));
  render(<Search />);

  fireEvent.change(screen.getByPlaceholderText("Search...."), { target: { value: "test" } });
  fireEvent.click(screen.getByRole("button", { name: "Search" }));

  expect(await screen.findByText("Test Movie 1")).toBeInTheDocument();
  expect(await screen.findByText("Test Movie 2")).toBeInTheDocument();
});

test("displays search results when search button is clicked with filter All", async () => {
  useParams.mockReturnValue({ id: "test", type: "All" });
  useNavigate.mockReturnValue(jest.fn());
  const mockResponse = {
    results: [
      { id: 1, title: "Test Movie 1" },
      { id: 2, title: "Test Movie 2" }
    ],
    total_results: 2
  };
  global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(mockResponse) }));
  render(<Search />);

  fireEvent.change(screen.getByPlaceholderText("Search...."), { target: { value: "test" } });

  const allElement = document.querySelectorAll(".dropElements a")[0]; // select the 'a' element inside the '.dropElements' list item

  await waitFor(() => allElement.click());

  fireEvent.click(screen.getByRole("button", { name: "Search" }));

  expect(await screen.findByText("Test Movie 1")).toBeInTheDocument();
  expect(await screen.findByText("Test Movie 2")).toBeInTheDocument();
});

test("displays search results when search button is clicked with filter Title", async () => {
  useParams.mockReturnValue({ id: "test", type: "All" });
  useNavigate.mockReturnValue(jest.fn());
  const mockResponse = {
    results: [
      { id: 1, title: "Test Movie 1" },
      { id: 2, title: "Test Movie 2" }
    ],
    total_results: 2
  };
  global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(mockResponse) }));
  render(<Search />);

  fireEvent.change(screen.getByPlaceholderText("Search...."), { target: { value: "test" } });

  const allElement = document.querySelectorAll(".dropElements a")[1]; // select the 'a' element inside the '.dropElements' list item

  await waitFor(() => allElement.click());

  fireEvent.click(screen.getByRole("button", { name: "Search" }));

  expect(await screen.findByText("Test Movie 1")).toBeInTheDocument();
  expect(await screen.findByText("Test Movie 2")).toBeInTheDocument();
});

test("displays search results when search button is clicked with filter Actors", async () => {
  useParams.mockReturnValue({ id: "test", type: "All" });
  useNavigate.mockReturnValue(jest.fn());
  const mockResponse = {
    results: [
      { id: 1, title: "Test Movie 1" },
      { id: 2, title: "Test Movie 2" }
    ],
    total_results: 2,
    cast: [
      { id: 1, title: "Test Movie 1" },
      { id: 2, title: "Test Movie 2" }
    ]
  };

  global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(mockResponse) }));

  render(<Search />);

  fireEvent.change(screen.getByPlaceholderText("Search...."), { target: { value: "test" } });

  const allElement = document.querySelectorAll(".dropElements a")[2]; // select the 'a' element inside the '.dropElements' list item

  await waitFor(() => allElement.click());

  fireEvent.click(screen.getByRole("button", { name: "Search" }));

  expect(await screen.findByText("Test Movie 1")).toBeInTheDocument();
  expect(await screen.findByText("Test Movie 2")).toBeInTheDocument();
});

test("else path of fetchWatchlist", async () => {
  useParams.mockReturnValue({ id: "test", type: "All" });
  useNavigate.mockReturnValue(jest.fn());

  const mockResponse = { data: [] };
  jest.spyOn(window, "fetch").mockResolvedValue({
    json: () => Promise.resolve(mockResponse)
  });

  const { getByText } = render(<Search />, { wrapper: BrowserRouter });
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
});

test("displays search results when search button is clicked with filter Keywords", async () => {
  useParams.mockReturnValue({ id: "test", type: "All" });
  useNavigate.mockReturnValue(jest.fn());
  const mockResponse = {
    results: [
      { id: 1, title: "Test Movie 1" },
      { id: 2, title: "Test Movie 2" }
    ],
    total_results: 2
  };
  global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(mockResponse) }));
  render(<Search />);

  fireEvent.change(screen.getByPlaceholderText("Search...."), { target: { value: "test" } });

  const allElement = document.querySelectorAll(".dropElements a")[3]; // select the 'a' element inside the '.dropElements' list item

  await waitFor(() => allElement.click());

  fireEvent.click(screen.getByRole("button", { name: "Search" }));

  expect(await screen.findByText("Test Movie 1")).toBeInTheDocument();
  expect(await screen.findByText("Test Movie 2")).toBeInTheDocument();
});

test("search input field updates the searchTerm state", async () => {
  useParams.mockReturnValue({ id: "test", type: "All" });
  useNavigate.mockReturnValue(jest.fn());
  const mockResponse = {
    results: [
      { id: 1, title: "Test Movie 1" },
      { id: 2, title: "Test Movie 2" }
    ],
    total_results: 2
  };

  global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(mockResponse) }));

  const { getByTestId, getByPlaceholderText } = render(<Search />);

  const inputField = getByPlaceholderText("Search....");
  fireEvent.change(inputField, { target: { value: "movie test" } });
  expect(inputField.value).toBe("movie test");
});

test("fetch error handling for Keywords", async () => {
  useParams.mockReturnValue({ id: "test", type: "All" });
  useNavigate.mockReturnValue(jest.fn());
  const consoleSpy = jest.spyOn(console, "log");
  const mockResponse = {
    results: [
      { id: 1, title: "Test Movie 1" },
      { id: 2, title: "Test Movie 2" }
    ],
    total_results: 2
  };

  const mockError = new Error("Something went wrong!");

  jest
    .spyOn(global, "fetch")
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })
    .mockResolvedValueOnce({
      ok: false,
      json: () => Promise.reject(mockError)
    });

  render(<Search />);

  fireEvent.change(screen.getByPlaceholderText("Search...."), { target: { value: "test" } });

  const allElement = document.querySelectorAll(".dropElements a")[3]; // select the 'a' element inside the '.dropElements' list item

  await waitFor(() => allElement.click());

  fireEvent.click(screen.getByRole("button", { name: "Search" }));

  await waitFor(() => expect(consoleSpy).toHaveBeenCalled());
});

test("fetch error handling for Actors", async () => {
  useParams.mockReturnValue({ id: "test", type: "All" });
  useNavigate.mockReturnValue(jest.fn());
  const consoleSpy = jest.spyOn(console, "log");
  const mockResponse = {
    results: [
      { id: 1, title: "Test Movie 1" },
      { id: 2, title: "Test Movie 2" }
    ],
    total_results: 2
  };

  const mockError = new Error("Something went wrong!");

  jest
    .spyOn(global, "fetch")
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })
    .mockResolvedValueOnce({
      ok: false,
      json: () => Promise.reject(mockError)
    });

  render(<Search />);

  fireEvent.change(screen.getByPlaceholderText("Search...."), { target: { value: "test" } });

  const allElement = document.querySelectorAll(".dropElements a")[2]; // select the 'a' element inside the '.dropElements' list item

  await waitFor(() => allElement.click());

  fireEvent.click(screen.getByRole("button", { name: "Search" }));

  await waitFor(() => expect(consoleSpy).toHaveBeenCalled());
});

test("handleShow of add movie modal", async () => {
  const mockResponseW = { data: JSON.stringify([{ name: "Watchlist 1" }, { name: "Watchlist 2" }]) };
  jest.spyOn(window, "fetch").mockResolvedValueOnce({
    json: () => Promise.resolve(mockResponseW)
  });
  useParams.mockReturnValue({ id: "test", type: "All" });
  useNavigate.mockReturnValue(jest.fn());
  const mockResponse = {
    results: [
      { id: 1, title: "Test Movie 1" },
      { id: 2, title: "Test Movie 2" }
    ],
    total_results: 2
  };
  global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(mockResponse) }));
  render(<Search />);

 fireEvent.change(screen.getByPlaceholderText("Search...."), { target: { value: "test" } });

  const allElement = document.querySelectorAll(".dropElements a")[1]; // select the 'a' element inside the '.dropElements' list item

  await waitFor(() => allElement.click());

  await waitFor(() => fireEvent.click(screen.getByRole("button", { name: "Search" })));

  // await waitFor(() => fireEvent.click(screen.getByTestId("add-icon")));
  await waitFor(() => fireEvent.click(document.querySelector("[data-testid='add-icon']:first-of-type")));

  await waitFor(() => fireEvent.click(screen.getByRole("button", { name: "Create Watchlist" })));

  expect(screen.getByTestId("modal-title").textContent).toBe("Create Watchlist");
});

test("handleClose of add movie modal", async () => {
  const mockResponseW = { data: JSON.stringify([{ name: "Watchlist 1" }, { name: "Watchlist 2" }]) };
  jest.spyOn(window, "fetch").mockResolvedValueOnce({
    json: () => Promise.resolve(mockResponseW)
  });
  useParams.mockReturnValue({ id: "test", type: "All" });
  useNavigate.mockReturnValue(jest.fn());
  const mockResponse = {
    results: [
      { id: 1, title: "Test Movie 1" },
      { id: 2, title: "Test Movie 2" }
    ],
    total_results: 2
  };
  global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(mockResponse) }));
  const { getByText } = render(<Search />);

  fireEvent.change(screen.getByPlaceholderText("Search...."), { target: { value: "test" } });

  const allElement = document.querySelectorAll(".dropElements a")[1]; // select the 'a' element inside the '.dropElements' list item

  await waitFor(() => allElement.click());

  await waitFor(() => fireEvent.click(screen.getByRole("button", { name: "Search" })));

  await waitFor(() => fireEvent.click(document.querySelector("[data-testid='add-icon']:first-of-type")));

  await waitFor(() => fireEvent.click(screen.getByRole("button", { name: "Create Watchlist" })));

  await waitFor(() => fireEvent.click(screen.getByText(/Close/i)));

  await waitFor(() => expect(screen.queryByTestId("modal-title")).toBeNull());
});

test("pagination", async () => {
  useParams.mockReturnValue({ id: "test", type: "All" });
  useNavigate.mockReturnValue(jest.fn());
  const mockResponse = {
    results: [
      { id: 1, title: "Test Movie 1" },
      { id: 2, title: "Test Movie 2" }
    ],
    total_results: 2
  };
  global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(mockResponse) }));

  render(<Search />, { wrapper: BrowserRouter });

  fireEvent.change(screen.getByPlaceholderText("Search...."), { target: { value: "test" } });

  const allElement = document.querySelectorAll(".dropElements a")[3]; // select the 'a' element inside the '.dropElements' list item

  await waitFor(() => allElement.click());

  await waitFor(() => fireEvent.click(screen.getByRole("button", { name: "Search" })));

  await waitFor(() => fireEvent.click(screen.getByRole("link", { name: "1", className: "page-link" })));

	// await waitFor(() =>  expect(screen.getByText("Test Movie 1")).toBeInTheDocument());
	// await waitFor(() =>  expect(screen.getByText("Test Movie 2")).toBeInTheDocument());
  // expect(screen.getByText("Test Movie 1")).toBeInTheDocument();
  // expect(screen.getByText("Test Movie 2")).toBeInTheDocument();
});