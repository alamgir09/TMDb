import { render, screen, waitFor, act, fireEvent} from "@testing-library/react";
import { MemoryRouter, Route, Routes, BrowserRouter, useParams, useNavigate } from "react-router-dom";
import MovieDetails from "../components/MovieDetails";

describe("MovieDetails", () => {
	jest.mock("react-router-dom", () => ({
	  useNavigate: jest.fn(),
	  useParams: jest.fn()
	}));

	const movieDetails = {
		id: "123",
		title: "Test Movie",
		genres: [{id:10, name: 'Action' }, {id:20, name: 'Adventure'}],
		release_date: "2022-01-01",
		vote_average: 8.5,
		overview: "This is a test movie.",
		poster_path: "/test_poster.jpg",
		production_companies: [{ name: "Test Production Studio" }],
		cast: [{ name: "Test Actor 1" }, { name: "Test Actor 2" }],
		crew: [{ name: "Test Director", known_for_department: "Directing" }]
	};

	const watchLists = {
		data: [{
			name:"Sourcelist",
			type:"Private",
			movies:[{
				title:"Jujutsu Kaisen 0",
				imgURL:"http://image.tmdb.org/t/p/w500/23oJaeBh0FDk2mQ2P240PU9Xxfh.jpg",
				releaseDate:"2021-12-24",
				rating:"8.199",
				id:"810693"
			}]
		}]
	}

	test('should fetch watchlist on component mount', async () => {
		jest.spyOn(window, 'fetch').mockImplementation(() => Promise.resolve({
		  json: () => Promise.resolve({ data: {} }),
		}));
		render(<MovieDetails />, {wrapper: BrowserRouter});
		expect(window.fetch).toHaveBeenCalledWith('/api/getWatchlist', expect.any(Object));
	});

	test('if statement of fetchWatchlist', async () => {
		jest.spyOn(window, 'fetch').mockImplementation(() => Promise.resolve({
		  json: () => Promise.resolve(watchLists),
		}));
		render(<MovieDetails />, {wrapper: BrowserRouter});
		expect(window.fetch).toHaveBeenCalledWith('/api/getWatchlist', expect.any(Object));
	});


	test('should fetch details and credits on component mount', async () => {
    // Mock the fetchDetails function to return your own response
		jest.spyOn(global, 'fetch').mockImplementation(() =>
			Promise.resolve({
				json: () => Promise.resolve(movieDetails),
			})
		);

		render( <MovieDetails />, {wrapper: BrowserRouter} );

		await waitFor(() => {
		  expect(global.fetch).toHaveBeenCalledTimes(3);
		});

		expect(await screen.findByAltText('Test Movie')).toBeInTheDocument();
		expect(await screen.findByText('Test Movie')).toBeInTheDocument();
		expect(await screen.findByText('This is a test movie.')).toBeInTheDocument();
		expect(await screen.findByText('Action')).toBeInTheDocument();
		expect(await screen.findByText('Adventure')).toBeInTheDocument();
		expect(await screen.findByText('Test Production Studio')).toBeInTheDocument();
		expect(await screen.findByText('Test Director')).toBeInTheDocument();
		expect(await screen.findByText('Test Actor 1')).toBeInTheDocument();
		expect(await screen.findByText('Test Actor 2')).toBeInTheDocument();

		global.fetch.mockRestore();
	  });
});
