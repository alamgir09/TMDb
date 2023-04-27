import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import WatchlistDetail from "../pages/WatchlistDetail";
import EditMovieModal from "../components/EditMovieModal";
import EditWatchlistModal from "../components/EditWatchlistModal";

describe("WatchlistDetail page", () => {
  const users = [
    {
      userID: "6446f74bd99cd970cad88516",
      username: "JLee",
      firstName: "Jas",
      lastName: "Lee",
      watchlist: [
        {
          movies: [
            {
              _id: "776797",
              imgURL: "http://image.tmdb.org/t/p/w500/mi5lh2brPMzuWYddyUKuCtcnjt1.jpg",
              rating: "6.815",
              releaseDate: "2021-01-22",
              title: "The Sadness"
            },
            {
              _id: "90730",
              imgURL: "http://image.tmdb.org/t/p/w500/owPAahGGXlV1YqbjRg2s58k8F6c.jpg",
              rating: "4.6",
              releaseDate: "1981-03-27",
              title: "Sadomania"
            },
            {
              _id: "583132",
              imgURL: "http://image.tmdb.org/t/p/w500/wCanUYBbUxADpfqpoe3tmQ3KVL6.jpg",
              rating: "6.03",
              releaseDate: "2019-05-24",
              title: "Sadako"
            }
          ],
          name: "Sad",
          type: "Public"
        },
        {
          movies: [
            {
              _id: "86577",
              imgURL: "http://image.tmdb.org/t/p/w500/wAz3VHk0nyeottwGc3lOFHi3Hky.jpg",
              rating: "7.179",
              releaseDate: "2011-04-09",
              title: "Happy"
            },
            {
              _id: "216881",
              imgURL: "http://image.tmdb.org/t/p/w500/3F3So0MrucjKdUFzwBA984bKisc.jpg",
              rating: "?",
              releaseDate: "1983-10-26",
              title: "Happy"
            },
            {
              _id: "1726",
              imgURL: "http://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
              rating: "7.634",
              releaseDate: "2008-04-30",
              title: "Iron Man"
            },
            {
              _id: "10138",
              imgURL: "http://image.tmdb.org/t/p/w500/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg",
              rating: "6.834",
              releaseDate: "2010-04-28",
              title: "Iron Man 2"
            }
          ],
          name: "Happy",
          type: "Public"
        }
      ]
    },
    {
      userID: "6446f7eed99cd970cad8852f",
      username: "KMeng",
      firstName: "Kerry",
      lastName: "Meng-Lin",
      watchlist: [
        {
          movies: [
            {
              _id: "268",
              imgURL: "http://image.tmdb.org/t/p/w500/cij4dd21v2Rk2YtUQbV5kW69WB2.jpg",
              rating: "7.215",
              releaseDate: "1989-06-23",
              title: "Batman"
            },
            {
              _id: "1003579",
              imgURL: "http://image.tmdb.org/t/p/w500/v0Jsn4jSN4yUBbKoVNCU7Zuzl1U.jpg",
              rating: "6.413",
              releaseDate: "2023-03-10",
              title: "Batman: The Doom That Came to Gotham"
            },
            {
              _id: "414906",
              imgURL: "http://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
              rating: "7.711",
              releaseDate: "2022-03-01",
              title: "The Batman"
            }
          ],
          name: "Watchlist 1",
          type: "Public"
        },
        {
          movies: [],
          name: "Watchlist Private",
          type: "Private"
        },
        {
          movies: [
            {
              _id: "11",
              imgURL: "http://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
              rating: "8.208",
              releaseDate: "1977-05-25",
              title: "Star Wars"
            },
            {
              _id: "782054",
              imgURL: "http://image.tmdb.org/t/p/w500/48gKZioIDeUOI0afbYv3kh9u9RQ.jpg",
              rating: "5.825",
              releaseDate: "2022-03-04",
              title: "Doraemon: Nobita\u0027s Little Star Wars 2021"
            },
            {
              _id: "140607",
              imgURL: "http://image.tmdb.org/t/p/w500/wqnLdwVXoBjKibFRR5U3y0aDUhs.jpg",
              rating: "7.3",
              releaseDate: "2015-12-15",
              title: "Star Wars: The Force Awakens"
            }
          ],
          name: "Watchlist 2",
          type: "Public"
        }
      ]
    }
  ];

  beforeEach(() => {
    fetch.resetMocks();
  });

  // Reset values after each test
  afterEach(() => {
    window.history.pushState(null, document.title, "/");
  });

  test("should fetch response from getMovies on mount", async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: [] }));
    fetch.mockResponseOnce(JSON.stringify({ data: null }));
    render(<WatchlistDetail />, { wrapper: BrowserRouter });

    expect(fetch.mock.calls.length).toEqual(3);
    expect(fetch.mock.calls[0][0]).toEqual("api/getWatchlistUsers");
    expect(fetch.mock.calls[0][1].method).toEqual("POST");
    expect(fetch.mock.calls[0][1].headers).toEqual({ "Content-Type": "application/json" });
    expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify({ userID: null }));
  });

  test("renders the movies", async () => {
    const mockResponse1 = {
      data: JSON.stringify([
        {
          imgURL: "url",
          rating: "8.9",
          releaseDate: "2022",
          title: "title"
        }
      ])
    };

    const mockResponse2 = { data: JSON.stringify(users) };

    jest
      .spyOn(window, "fetch")
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockResponse2) })
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockResponse1) })
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockResponse1) });

    const { getByText } = render(<WatchlistDetail />, { wrapper: BrowserRouter });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => expect(getByText("title")).toBeInTheDocument());
  });

  test("fetching fails on the watchlist detail page with no connection", async () => {
    const consoleSpy = jest.spyOn(console, "log");

    fetch.mockResponseOnce(JSON.stringify({ data: null }));

    fetch.mockResponseOnce(JSON.stringify({ data: null }));

    //    const mockResponse2 = {data: JSON.stringify(data)};
    //
    //    		jest.spyOn(window, "fetch")
    //          .mockResolvedValueOnce({ json: () => Promise.resolve(mockResponse1) })
    //          .mockResolvedValueOnce({ json: () => Promise.resolve(mockResponse2) });

    render(<WatchlistDetail />, { wrapper: BrowserRouter });

    await act(async () => {
      // Assert that the else path is taken
      expect(consoleSpy).not.toHaveBeenCalledWith(expect.anything());
    });
  });

  test('renders "No Movies added yet" when loading is false and list length is 0', async () => {
    const mockResponse = { data: JSON.stringify([]) };
    jest.spyOn(window, "fetch").mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    });

    jest.spyOn(window, "fetch").mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    });

    const { getByText } = render(<WatchlistDetail />, { wrapper: BrowserRouter });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const noMovies = getByText("No movies added yet");
    expect(noMovies).toBeInTheDocument();
  });

  test("fetchWatchlist function should update watchlist data", async () => {
    const mockResponse = { data: JSON.stringify([{ name: "Watchlist 1" }, { name: "Watchlist 2" }]) };
    const mockResponse2 = { data: JSON.stringify(users) };

    jest.spyOn(window, "fetch").mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse2)
    });

    jest.spyOn(window, "fetch").mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    });

    jest.spyOn(window, "fetch").mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    });

    const { getByText } = render(<WatchlistDetail />, { wrapper: BrowserRouter });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(fetch.mock.calls.length).toEqual(3);
  });

  test("setWatchlistType is called with the correct watchlist type", async () => {
    const setWatchlistType = jest.fn();

    const mockResponse = {
      data: JSON.stringify([
        { name: "Watchlist 1", type: "Private" },
        { name: "Watchlist 2", type: "Private" }
      ])
    };

    const mockResponse2 = { data: JSON.stringify(users) };

    jest.spyOn(window, "fetch").mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse2)
    });

    jest.spyOn(window, "fetch").mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    });

    jest.spyOn(window, "fetch").mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    });

    localStorage.setItem("watchlist", "Watchlist 1");

    const { getByText } = render(<WatchlistDetail />, { wrapper: BrowserRouter });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => {
      expect(getByText("Private")).toBeInTheDocument();
    });
  });

  it("should call the handleClose function when Close button is clicked", () => {
    const mockHandleClose = jest.fn();
    const mockWatchlistOld = jest.fn();
    const mockFetchWatchlist = jest.fn();

    const { getByText } = render(
      <EditWatchlistModal
        show={true}
        handleClose={mockHandleClose}
        fetchWatchlist={mockFetchWatchlist}
        watchlistOld={mockWatchlistOld}
      />
    );

    fireEvent.click(getByText("Close"));

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  test("handleClose when closing the EditMovieModal", async () => {
    const mockResponse1 = {
      data: JSON.stringify([
        {
          imgURL: "url",
          rating: "8.9",
          releaseDate: "2022",
          title: "title"
        }
      ])
    };

    const mockResponse2 = { data: JSON.stringify(users) };

    jest
      .spyOn(window, "fetch")
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockResponse2) })
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockResponse2) })
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockResponse2) });

    const { container, getByTestId, getByText, getAllByTestId } = render(<WatchlistDetail />, {
      wrapper: BrowserRouter
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => fireEvent.click(getAllByTestId("delete-icon")[0]));

    fireEvent.click(getByTestId("editMovieClose"));

    await waitFor(() => expect(screen.queryByText("Edit Movie")).not.toBeInTheDocument());
  });
});
