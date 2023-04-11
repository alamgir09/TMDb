import { render, screen, waitFor, act, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes, BrowserRouter } from "react-router-dom";
import MovieDetails from "../components/MovieDetails";

describe("MovieDetails", () => {
  test("renders movie details", async () => {
    jest
      .spyOn(global, "fetch")
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(movie)
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(movie)
      });

    const movie = {
      id: "123",
      title: "Test Movie",
      genres: [{ name: "Action" }, { name: "Adventure" }],
      release_date: "2022-01-01",
      vote_average: 8.5,
      overview: "This is a test movie.",
      poster_path: "/test_poster.jpg",
      production_companies: [{ name: "Test Production Studio" }],
      cast: [{ name: "Test Actor 1" }, { name: "Test Actor 2" }],
      crew: [{ name: "Test Director", known_for_department: "Directing" }]
    };

    render(<MovieDetails />, { wrapper: BrowserRouter });

    const movieTitle = await waitFor(() => screen.getByText(/Test Movie/));
    expect(movieTitle).toBeInTheDocument();

    const genres = await screen.findByText(/action/i);
    expect(genres).toBeInTheDocument();

    const releaseDate = await screen.findByText(movie.release_date);
    expect(releaseDate).toBeInTheDocument();

    const rating = await screen.findByText(movie.vote_average.toString());
    expect(rating).toBeInTheDocument();

    const description = await screen.findByText(movie.overview);
    expect(description).toBeInTheDocument();

    const productionStudios = await screen.findByText(movie.production_companies[0].name);
    expect(productionStudios).toBeInTheDocument();

    const directors = await screen.findByText(movie.crew[0].name);
    expect(directors).toBeInTheDocument();

    const actors = await screen.findByText(/test actor 1/i);
    expect(actors).toBeInTheDocument();

    global.fetch.mockRestore();
  });

  test("error response", async () => {
    const mockError = new Error("Something went wrong!");
    jest
      .spyOn(global, "fetch")
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(movie)
      })
      .mockResolvedValueOnce({
        ok: false,
        json: () => Promise.reject(mockError)
      });

    render(<MovieDetails />, { wrapper: BrowserRouter });
  });

  test("handle onClick of Actor", async () => {
    jest
      .spyOn(global, "fetch")
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(movie)
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(movie)
      });

    const movie = {
      id: "123",
      title: "Test Movie",
      genres: [{ name: "Action" }, { name: "Adventure" }],
      release_date: "2022-01-01",
      vote_average: 8.5,
      overview: "This is a test movie.",
      poster_path: "/test_poster.jpg",
      production_companies: [{ name: "Test Production Studio" }],
      cast: [{ name: "Test Actor 1" }, { name: "Test Actor 2" }],
      crew: [{ name: "Test Director", known_for_department: "Directing" }]
    };

    render(<MovieDetails />, { wrapper: BrowserRouter });

    const button = await waitFor(() => screen.getByText(/Test Actor 1/));

    fireEvent.click(button);

    expect(window.location.pathname).toEqual("/Search/Actors/Test%20Actor%201");

    global.fetch.mockRestore();
  });

  test("handle onClick of Genre", async () => {
    jest
      .spyOn(global, "fetch")
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(movie)
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(movie)
      });

    const movie = {
      id: "123",
      title: "Test Movie",
      genres: [{ name: "Action" }, { name: "Adventure" }],
      release_date: "2022-01-01",
      vote_average: 8.5,
      overview: "This is a test movie.",
      poster_path: "/test_poster.jpg",
      production_companies: [{ name: "Test Production Studio" }],
      cast: [{ name: "Test Actor 1" }, { name: "Test Actor 2" }],
      crew: [{ name: "Test Director", known_for_department: "Directing" }]
    };

    render(<MovieDetails />, { wrapper: BrowserRouter });

    const button = await waitFor(() => screen.getByText(/Action/i));

    fireEvent.click(button);

    expect(window.location.pathname).toEqual("/Search/Genres/Action");

    global.fetch.mockRestore();
  });
});
