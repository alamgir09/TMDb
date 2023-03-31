import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MovieDetails from '../components/MovieDetails';

describe('MovieDetails', () => {
  test('renders movie details', async () => {
    const movie = {
      id: '123',
      title: 'Test Movie',
      genres: [{ name: 'Action' }, { name: 'Adventure' }],
      release_date: '2022-01-01',
      vote_average: 8.5,
      overview: 'This is a test movie.',
      poster_path: '/test_poster.jpg',
      production_companies: [{ name: 'Test Production Studio' }],
      cast: [{ name: 'Test Actor 1' }, { name: 'Test Actor 2' }],
      crew: [{ name: 'Test Director', known_for_department: 'Directing' }],
    };

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(movie),
    }).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    render(
      <MemoryRouter initialEntries={[`/movie/${movie.id}`]}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const movieTitle = await waitFor(() => screen.getByText(/Test Movie/));
    expect(movieTitle).toBeInTheDocument();

//    const genres = await screen.findByText(/action, adventure/i);
//    expect(genres).toBeInTheDocument();
//
//    const releaseDate = await screen.findByText(movie.release_date);
//    expect(releaseDate).toBeInTheDocument();
//
//    const rating = await screen.findByText(movie.vote_average.toString());
//    expect(rating).toBeInTheDocument();
//
//    const description = await screen.findByText(movie.overview);
//    expect(description).toBeInTheDocument();
//
//    const productionStudios = await screen.findByText(movie.production_companies[0].name);
//    expect(productionStudios).toBeInTheDocument();
//
//    const directors = await screen.findByText(movie.crew[0].name);
//    expect(directors).toBeInTheDocument();
//
//    const actors = await screen.findByText(/test actor 1, test actor 2/i);
//    expect(actors).toBeInTheDocument();

    global.fetch.mockRestore();
  });
});