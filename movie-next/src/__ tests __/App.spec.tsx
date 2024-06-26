import '@testing-library/jest-dom'
import { render, screen, waitFor, act } from "@testing-library/react"
import App from "../App.tsx"
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();


beforeEach(() => {
  fetchMock.resetMocks();
});

test("Renders the main page", async () => {
  const mockMovies = {

    page: 1,
    total_pages: 10,
    results: [
      {
        genre_ids: [878, 28, 12],
        poster_path: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
        release_date: "2024-03-27",
        title: "Godzilla x Kong: The New Empire",
        vote_average: 7.261,
        backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
        id: 929590

      }
    ]
  };
  fetchMock.mockResponseOnce(JSON.stringify(mockMovies));
  await act(() => {
    render(<App />);
  });
  await waitFor(() => {
    expect(true).toBeTruthy();
  });
})

test("Exist the readTheDocs text in the document", async () => {

  await act(() => {
    render(<App />);
  });

  const text = screen.getByTitle('read-the-docs');
  await waitFor(() => {
    expect(text).toBeInTheDocument();
  });
})

