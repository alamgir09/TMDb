// import React from "react";
// import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
// import { BrowserRouter } from "react-router-dom";
// import AddMovieDropdown from "../components/AddMovieComponent";

// // mock the fetch function
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({ data: "Success" })
//   })
// );

// describe("AddMovieComponent", () => {
//   const imgURL = "https://example.com/img.jpg";
//   const title = "Example Movie";
//   const releaseDate = "2022-01-01";
//   const rating = 7.5;
//   const watchlists = [{ name: "Watchlist 1" }, { name: "Watchlist 2" }, { name: "Watchlist 3" }];
//   const handleShow = jest.fn();

//   beforeEach(() => {
//     jest.clearAllMocks();
//     localStorage.clear();
//   });

//   // Reset values after each test
//   afterEach(() => {
//     window.history.pushState(null, document.title, "/");
//   });

//   it("should render the dropdown menu", async () => {
//     const { container } = render(
//       <AddMovieDropdown
//         imgURL={imgURL}
//         title={title}
//         releaseDate={releaseDate}
//         rating={rating}
//         watchlists={watchlists}
//         handleShow={handleShow}
//       />
//     );

//     await act(async () => {
//       await new Promise((resolve) => setTimeout(resolve, 0));
//     });

//     const toggleButton = screen.getByRole("button", { name: "Add to Watchlist" });
//     fireEvent.click(toggleButton);

//     await waitFor(() => expect(container.querySelectorAll(".dropdown-item")).toHaveLength(watchlists.length + 1)); // +1 for Create Watchlist Button
//   });

//   it("should add the movie to the selected watchlist", async () => {
//     const mockResponse = { data: "Success" };
//     const consoleLogSpy = jest.spyOn(console, "log");

//     jest.spyOn(window, "fetch").mockResolvedValueOnce({
//       json: () => Promise.resolve(mockResponse)
//     });

//     render(
//       <AddMovieDropdown
//         imgURL={imgURL}
//         title={title}
//         releaseDate={releaseDate}
//         rating={rating}
//         watchlists={watchlists}
//         handleShow={handleShow}
//       />,
//       { wrapper: BrowserRouter }
//     );
//     const addToWatchlistButton = await waitFor(() => screen.getByText(/Add to Watchlist/i));

//     fireEvent.click(addToWatchlistButton);

//     const watchlistButton = await waitFor(() => screen.getByText(/Watchlist 1/i));

//     fireEvent.click(watchlistButton);

//     await waitFor(() => expect(consoleLogSpy).toHaveBeenCalled());
//   });

//   test("error response", async () => {
//     const mockError = new Error("Something went wrong!");
//     const consoleSpy = jest.spyOn(console, "log");
//     jest.spyOn(global, "fetch").mockResolvedValueOnce({
//         ok: true,
//         json: () => Promise.resolve(null)
//       }).mockResolvedValueOnce({
//         ok: false,
//         json: () => Promise.reject(mockError)
//       });



//     render(
//       <AddMovieDropdown
//         imgURL={imgURL}
//         title={title}
//         releaseDate={releaseDate}
//         rating={rating}
//         watchlists={watchlists}
//         handleShow={handleShow}
//       />,
//       { wrapper: BrowserRouter }
//     );

//     const addToWatchlistButton = await waitFor(() => screen.getByText(/Add to Watchlist/i));

//     fireEvent.click(addToWatchlistButton);

//     const watchlistButton = await waitFor(() => screen.getByText(/Watchlist 1/i));

//     fireEvent.click(watchlistButton);

//     await waitFor(() => expect(consoleSpy).toHaveBeenCalled());
//   });

//   test("test handleShow", async () => {
//     render(
//       <AddMovieDropdown
//         imgURL={imgURL}
//         title={title}
//         releaseDate={releaseDate}
//         rating={rating}
//         watchlists={watchlists}
//         handleShow={handleShow}
//       />,
//       { wrapper: BrowserRouter }
//     );

//     const addToWatchlistButton = await waitFor(() => screen.getByText(/Add to Watchlist/i));

//     fireEvent.click(addToWatchlistButton);

//     const watchlistButton = await waitFor(() => screen.getByText(/Create Watchlist/i));

//     fireEvent.click(watchlistButton);

//     await waitFor(() => expect(screen.getByText(/Create Watchlist/i)));
//   });

//   it("not success", async () => {
//     const mockResponse = { data: "Not Success" };
//     const consoleSpy = jest.spyOn(console, "log");

//     jest.spyOn(window, "fetch").mockResolvedValueOnce({
//       json: () => Promise.resolve(mockResponse)
//     });

//     render(
//       <AddMovieDropdown
//         imgURL={imgURL}
//         title={title}
//         releaseDate={releaseDate}
//         rating={rating}
//         watchlists={watchlists}
//         handleShow={handleShow}
//       />,
//       { wrapper: BrowserRouter }
//     );
//     const addToWatchlistButton = await waitFor(() => screen.getByText(/Add to Watchlist/i));

//     fireEvent.click(addToWatchlistButton);

//     const watchlistButton = await waitFor(() => screen.getByText(/Watchlist 1/i));

//     fireEvent.click(watchlistButton);

//     await waitFor(() => expect(consoleSpy).toHaveBeenCalledTimes(0));
//   });
// });
