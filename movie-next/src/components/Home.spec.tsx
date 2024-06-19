import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import Home from './Home';

// Habilitar mocks para fetch
fetchMock.enableMocks();

describe('Home', () => {
  beforeEach(() => {
    fetchMock.resetMocks(); // Reiniciar mocks antes de cada prueba
  });

  it('should display movies when data is fetched successfully', async () => {
    const mockMovies = [
      {
        id: 1,
        title: 'Godzilla x Kong: The New Empire',
        releaseYear: '2024-03-27',
        backdrop_path: '/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg',
        poster: '',
        genre: [],
        rating: 0
      },
      {
        id: 2,
        title: 'Inception',
        releaseYear: '2010',
        backdrop_path: '/inception_backdrop.jpg',
        poster: '',
        genre: [],
        rating: 0
      }
    ];

    fetchMock.mockResponseOnce(JSON.stringify({ movies: mockMovies }));

    render(<Home />);

    // Verificar que se muestre el spinner mientras se carga
    expect(screen.queryAllByText('Loading...').length).toBeGreaterThan(0);

    // Esperar a que la carga de datos termine
    await waitFor(() => {
      // Verificar que ya no se muestre el spinner
      expect(screen.queryAllByText('Loading...').length).toBe(0);

      // Verificar que se renderice correctamente la lista de películas
      mockMovies.forEach(movie => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
      // expect(screen.getByText('Inception')).toBeInTheDocument();
    });
  });
});

  it('should handle API error and display error message', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to fetch'));

    render(<Home />);

    // Verificar que se muestre el spinner mientras se carga
    expect(screen.queryAllByText('Loading...').length).toBeGreaterThan(0);

    // Esperar a que la carga de datos termine
    await waitFor(() => {
      // Verificar que ya no se muestre el spinner
      expect(screen.queryAllByText('Loading...').length).toBe(0);

      // Verificar que se muestre el modal de error
      expect(screen.getByText('An error occurred while fetching data from the API.')).toBeInTheDocument();
    });
  });
});
