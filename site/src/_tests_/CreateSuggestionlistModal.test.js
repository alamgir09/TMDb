import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import CreateSuggestionlistModal from "../components/CreateSuggestionlistModal"
import SaveSuggestions from "../components/SaveSuggestions"
import { addMovie } from '../functions.js';

describe("WatchlistDetail page", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  // Reset values after each test
  afterEach(() => {
    window.history.pushState(null, document.title, "/");
  });

  const list = [
      { name: 'list1', movies: [ { id: 1, title: 'movie1', release_date: '2022-04-19', vote_average: 6.2, poster_path: 'path1' }, { id: 2, title: 'movie2', release_date: '2022-04-20', vote_average: 7.3, poster_path: 'path2' }, ] },
      { name: 'list2', movies: [ { id: 3, title: 'movie3', release_date: '2022-04-21', vote_average: 8.4, poster_path: 'path3' }, { id: 4, title: 'movie4', release_date: '2022-04-22', vote_average: 9.5, poster_path: 'path4' }, ] }
  ];

	test("renders correctly", () => {
		const handleClose = jest.fn();
		const show = true;
		const { getByText, getByPlaceholderText, getByTestId } = render(<CreateSuggestionlistModal show={show} handleClose={handleClose} list={list} /> , { wrapper: BrowserRouter });
		expect(getByText("Create Suggestion List")).toBeInTheDocument();
		expect(getByPlaceholderText("Name")).toBeInTheDocument();
		expect(getByText("Public")).toBeInTheDocument();
		expect(getByText("Private")).toBeInTheDocument();
		expect(getByText("Number of Suggestions")).toBeInTheDocument();
		expect(getByTestId("numSuggestions")).toBeInTheDocument();
		expect(getByText("Select Source Watchlists (shift+click)")).toBeInTheDocument();
		expect(getByTestId("sourceLists")).toBeInTheDocument();
		expect(getByText("Close")).toBeInTheDocument();
		expect(getByText("Create")).toBeInTheDocument();
	});

	test('calls handleClose when the modal is closed', () => {
		const handleClose = jest.fn();
		const show = true;
		const { getByTestId } = render(<CreateSuggestionlistModal show={show} handleClose={handleClose} list={list} /> , { wrapper: BrowserRouter });
		const closeButton = getByTestId('createHandleClose');
		fireEvent.click(closeButton);
		expect(handleClose).toHaveBeenCalled();
	});

	test('shows an error message when the watchlist name is blank', () => {
		const handleClose = jest.fn();
		const show = true;
		const { getByTestId, getByText } = render(<CreateSuggestionlistModal show={show} handleClose={handleClose} list={list} />, { wrapper: BrowserRouter });
		const submitButton = getByTestId('createHandleSubmit');
		fireEvent.click(submitButton);
		expect(getByText('Error: Watchlist Name Can Not Be Blank')).toBeInTheDocument();
	});

	test('shows an error message when number of suggestions is out of bounds', () => {
		const handleClose = jest.fn();
		const show = true;
		const { getByTestId, getByText, getByPlaceholderText } = render(<CreateSuggestionlistModal show={show} handleClose={handleClose} list={list}/>, { wrapper: BrowserRouter });
		const nameField = getByPlaceholderText('Name');
		const numSuggestions = getByTestId('numSuggestions')
		const submitButton = getByTestId('createHandleSubmit');
		fireEvent.change(nameField, { target: { value: 'Watchlist 1' } });
		fireEvent.change(numSuggestions, { target: { value: '0' } });
		fireEvent.click(submitButton);
		expect(getByText('Error: number must be >= 1 and <= 10')).toBeInTheDocument();
	});

	test('shows an error message when no source list selected', () => {
		const handleClose = jest.fn();
		const show = true;
		const { getByTestId, getByText, getByPlaceholderText } = render(<CreateSuggestionlistModal show={show} handleClose={handleClose} list={list}/>, { wrapper: BrowserRouter });
		const nameField = getByPlaceholderText('Name');
		const submitButton = getByTestId('createHandleSubmit');
		fireEvent.change(nameField, { target: { value: 'Watchlist 1' } });
		fireEvent.click(submitButton);
		expect(getByText('Error: At least 1 Source List Must Be Selected')).toBeInTheDocument();
	});

	test("should update the type state when radio button is clicked", () => {
		const handleClose = jest.fn();
		const show = true;
		const { getByLabelText } = render(<CreateSuggestionlistModal show={show} handleClose={handleClose} list={list}/>, { wrapper: BrowserRouter });
		const radioPublic = getByLabelText("Public");
		fireEvent.click(radioPublic);
		const radioPrivate = getByLabelText("Private");
		fireEvent.click(radioPrivate);
		expect(radioPrivate.checked).toBe(true);
	});

	test('shows an error message when the watchlist name is blank', () => {
		const handleClose = jest.fn();
		const show = true;
		const { getByTestId, getByText, getByPlaceholderText } = render(<CreateSuggestionlistModal show={show} handleClose={handleClose} list={list}/>, { wrapper: BrowserRouter });
		const nameField = getByPlaceholderText('Name');
		const select = screen.getByTestId('sourceLists');
		const submitButton = getByTestId('createHandleSubmit');

		fireEvent.change(nameField, { target: { value: 'list1' } });
		fireEvent.change(select, {target : { value: 'list1'}});
		fireEvent.keyDown(getByTestId('form'), { key: 'Enter', keyCode: 13 });
		expect(screen.getByText("Error: Watchlist Name Exists")).toBeInTheDocument();
	});

	test("form functions and submits correctly when enter is click", async() => {
		const fakeResponse = {
			data: "Success",
			results: [{
			id: "428286",
			poster_path: "/5QJW8geAyDTS8C4COG8KiVqE9p5.jpg",
			release_date: "2017-02-25",
			title: "Landreaall",
			vote_average: "0"
			}]
		};
		const fetchSpy = jest.spyOn(global, "fetch").mockImplementation(() =>
			Promise.resolve({
				json: () => Promise.resolve(fakeResponse)
			})
		);

		const handleClose = jest.fn();
		const show = true;
		const { getByTestId, getByText, getByPlaceholderText } = render(<CreateSuggestionlistModal show={show} handleClose={handleClose} list={list}/>, { wrapper: BrowserRouter });
		const nameField = getByPlaceholderText('Name');
		const select = screen.getByTestId('sourceLists');
		const numSuggestions = getByTestId('numSuggestions')
		const submitButton = getByTestId('createHandleSubmit');
		const addMovie=jest.fn();

		fireEvent.change(nameField, { target: { value: 'Watchlist 1' } });
		fireEvent.change(numSuggestions, { target: { value: '1' } });
		fireEvent.change(select, {target : { value: 'list1'}});
		fireEvent.keyDown(getByTestId('form'), { key: 'Enter', keyCode: 13 });;
		expect(fetch).toHaveBeenCalledTimes(1);

		expect(await screen.getByText("Creating Suggestions Based On list1")).toBeInTheDocument();
		const confirmationNumMovies = await screen.findByText('Confirmation: 1 recommendations', {}, { timeout: 3500 });
		expect(await screen.findByText('Confirmation: 1 recommendations')).toBeInTheDocument();
		const confirmationWatchlistCreated = await screen.findByText('Confirmation: Watchlist Watchlist 1 created', {}, { timeout: 3500 });
		expect(await screen.findByText('Confirmation: Watchlist Watchlist 1 created')).toBeInTheDocument();
//		expect(addMovie).toHaveBeenCalledTimes(1);
	},20000);

	test("form functions and submits correctly when enter is click, undefined suggestions", async() => {
		const fakeResponse = {
			data: "Success",
		};
		const fetchSpy = jest.spyOn(global, "fetch").mockImplementation(() =>
			Promise.resolve({
				json: () => Promise.resolve(fakeResponse)
			})
		);

		const handleClose = jest.fn();
		const show = true;
		const { getByTestId, getByText, getByPlaceholderText } = render(<CreateSuggestionlistModal show={show} handleClose={handleClose} list={list}/>, { wrapper: BrowserRouter });
		const nameField = getByPlaceholderText('Name');
		const select = screen.getByTestId('sourceLists');
		const numSuggestions = getByTestId('numSuggestions')
		const submitButton = getByTestId('createHandleSubmit');
		const addMovie=jest.fn();

		fireEvent.change(nameField, { target: { value: 'Watchlist 1' } });
		fireEvent.change(numSuggestions, { target: { value: '1' } });
		fireEvent.change(select, {target : { value: 'list1'}});
		fireEvent.keyDown(getByTestId('form'), { key: 'Enter', keyCode: 13 });;
		expect(fetch).toHaveBeenCalledTimes(1);

		expect(await screen.getByText("Creating Suggestions Based On list1")).toBeInTheDocument();
		const confirmationNumMovies = await screen.findByText('Confirmation: 1 recommendations', {}, { timeout: 3500 });
		expect(await screen.findByText('Confirmation: 1 recommendations')).toBeInTheDocument();
		const confirmationWatchlistCreated = await screen.findByText('Confirmation: Watchlist Watchlist 1 created', {}, { timeout: 3500 });
		expect(await screen.findByText('Confirmation: Watchlist Watchlist 1 created')).toBeInTheDocument();
	},20000);

	test("form functions and submits correctly when enter is click, undefined suggestions then cancle", async() => {
		const fakeResponse = {
			data: "Success",
			results: [{
			id: "428286",
			poster_path: "/5QJW8geAyDTS8C4COG8KiVqE9p5.jpg",
			release_date: "2017-02-25",
			title: "Landreaall",
			vote_average: "0"
			}]
		};
		const fetchSpy = jest.spyOn(global, "fetch").mockImplementation(() =>
			Promise.resolve({
				json: () => Promise.resolve(fakeResponse)
			})
		);

		const handleClose = jest.fn();
		const show = true;
		const { getByTestId, getByText, getByPlaceholderText } = render(<CreateSuggestionlistModal show={show} handleClose={handleClose} list={list}/>, { wrapper: BrowserRouter });
		const nameField = getByPlaceholderText('Name');
		const select = screen.getByTestId('sourceLists');
		const numSuggestions = getByTestId('numSuggestions')
		const submitButton = getByTestId('createHandleSubmit');
		const addMovie=jest.fn();

		fireEvent.change(nameField, { target: { value: 'Watchlist 1' } });
		fireEvent.change(numSuggestions, { target: { value: '1' } });
		fireEvent.change(select, {target : { value: 'list1'}});
		fireEvent.keyDown(getByTestId('form'), { key: 'Enter', keyCode: 13 });;
		expect(fetch).toHaveBeenCalledTimes(1);

		expect(await screen.getByText("Creating Suggestions Based On list1")).toBeInTheDocument();
		const confirmationNumMovies = await screen.findByText('Confirmation: 1 recommendations', {}, { timeout: 3500 });
		expect(await screen.findByText('Confirmation: 1 recommendations')).toBeInTheDocument();
		const confirmationWatchlistCreated = await screen.findByText('Confirmation: Watchlist Watchlist 1 created', {}, { timeout: 3500 });
		expect(await screen.findByText('Confirmation: Watchlist Watchlist 1 created')).toBeInTheDocument();

		await waitFor(() => {
			expect(localStorage.getItem("watchlist")).toEqual("Watchlist 1");
			expect(window.location.pathname).toEqual("/WatchlistDetail");
		}, { timeout: 5000 });

		const { container, queryByTestId } = render(<SaveSuggestions />, { wrapper: BrowserRouter });
		expect(queryByTestId('cancel-button')).not.toBeNull();
		expect(queryByTestId('save-button')).not.toBeNull();

		const user = userEvent.setup();
		const cancelButton = getByTestId('cancel-button');
		await waitFor(() => user.click(cancelButton));
	},20000);

	test("form functions and submits correctly when enter is click, undefined suggestions then save", async() => {
    		const fakeResponse = {
    			data: "Success",
    			results: [{
    			id: "428286",
    			poster_path: "/5QJW8geAyDTS8C4COG8KiVqE9p5.jpg",
    			release_date: "2017-02-25",
    			title: "Landreaall",
    			vote_average: "0"
    			}]
    		};
    		const fetchSpy = jest.spyOn(global, "fetch").mockImplementation(() =>
    			Promise.resolve({
    				json: () => Promise.resolve(fakeResponse)
    			})
    		);

    		const handleClose = jest.fn();
    		const show = true;
    		const { getByTestId, getByText, getByPlaceholderText } = render(<CreateSuggestionlistModal show={show} handleClose={handleClose} list={list}/>, { wrapper: BrowserRouter });
    		const nameField = getByPlaceholderText('Name');
    		const select = screen.getByTestId('sourceLists');
    		const numSuggestions = getByTestId('numSuggestions')
    		const submitButton = getByTestId('createHandleSubmit');
    		const addMovie=jest.fn();

    		fireEvent.change(nameField, { target: { value: 'Watchlist 1' } });
    		fireEvent.change(numSuggestions, { target: { value: '1' } });
    		fireEvent.change(select, {target : { value: 'list1'}});
    		fireEvent.keyDown(getByTestId('form'), { key: 'Enter', keyCode: 13 });;
    		expect(fetch).toHaveBeenCalledTimes(1);

    		expect(await screen.getByText("Creating Suggestions Based On list1")).toBeInTheDocument();
    		const confirmationNumMovies = await screen.findByText('Confirmation: 1 recommendations', {}, { timeout: 3500 });
    		expect(await screen.findByText('Confirmation: 1 recommendations')).toBeInTheDocument();
    		const confirmationWatchlistCreated = await screen.findByText('Confirmation: Watchlist Watchlist 1 created', {}, { timeout: 3500 });
    		expect(await screen.findByText('Confirmation: Watchlist Watchlist 1 created')).toBeInTheDocument();

    		await waitFor(() => {
    			expect(localStorage.getItem("watchlist")).toEqual("Watchlist 1");
    			expect(window.location.pathname).toEqual("/WatchlistDetail");
    		}, { timeout: 5000 });

    		const { container, queryByTestId } = render(<SaveSuggestions />, { wrapper: BrowserRouter });
    		expect(queryByTestId('cancel-button')).not.toBeNull();
    		expect(queryByTestId('save-button')).not.toBeNull();

    		const user = userEvent.setup();
    		const saveButton = getByTestId('save-button');
    		await waitFor(() => user.click(saveButton));
    	},20000);

		test("saveSuggestion error", async() => {
				const fakeResponse = {
					data: "Success",
					results: [{
					id: "428286",
					poster_path: "/5QJW8geAyDTS8C4COG8KiVqE9p5.jpg",
					release_date: "2017-02-25",
					title: "Landreaall",
					vote_average: "0"
					}]
				};
				const fetchSpy = jest.spyOn(global, "fetch").mockImplementation(() =>
					Promise.resolve({
						json: () => Promise.resolve(fakeResponse)
					})
				);

				const handleClose = jest.fn();
				const show = true;
				const { getByTestId, getByText, getByPlaceholderText } = render(<CreateSuggestionlistModal show={show} handleClose={handleClose} list={list}/>, { wrapper: BrowserRouter });
				const nameField = getByPlaceholderText('Name');
				const select = screen.getByTestId('sourceLists');
				const numSuggestions = getByTestId('numSuggestions')
				const submitButton = getByTestId('createHandleSubmit');
				const addMovie=jest.fn();

				fireEvent.change(nameField, { target: { value: 'Watchlist 1' } });
				fireEvent.change(numSuggestions, { target: { value: '1' } });
				fireEvent.change(select, {target : { value: 'list1'}});
				fireEvent.keyDown(getByTestId('form'), { key: 'Enter', keyCode: 13 });;
				expect(fetch).toHaveBeenCalledTimes(1);

				expect(await screen.getByText("Creating Suggestions Based On list1")).toBeInTheDocument();
				const confirmationNumMovies = await screen.findByText('Confirmation: 1 recommendations', {}, { timeout: 3500 });
				expect(await screen.findByText('Confirmation: 1 recommendations')).toBeInTheDocument();
				const confirmationWatchlistCreated = await screen.findByText('Confirmation: Watchlist Watchlist 1 created', {}, { timeout: 3500 });
				expect(await screen.findByText('Confirmation: Watchlist Watchlist 1 created')).toBeInTheDocument();

				await waitFor(() => {
					expect(localStorage.getItem("watchlist")).toEqual("Watchlist 1");
					expect(window.location.pathname).toEqual("/WatchlistDetail");
				}, { timeout: 5000 });

				const { container, queryByTestId } = render(<SaveSuggestions />, { wrapper: BrowserRouter });
				expect(queryByTestId('cancel-button')).not.toBeNull();
				expect(queryByTestId('save-button')).not.toBeNull();

					const fetchSpyFail = jest.spyOn(global, "fetch").mockImplementation(() =>
          Promise.resolve({
            json: () => Promise.mockRejectedValue(mockError)
          })
        );
			  const mockError = new Error("API call failed");
				const saveButton = getByTestId("save-button");
				fireEvent.click(saveButton);

				await waitFor(() => expect(fetchSpyFail).toHaveBeenCalledTimes(3));

			},20000);
});


