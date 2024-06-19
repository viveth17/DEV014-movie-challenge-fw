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

  it('debería mostrar las películas cuando los datos se obtienen exitosamente', async () => {

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

    render(<Home />);

    // Verificar que se muestre el spinner mientras se carga
    expect(screen.queryAllByText('Loading...').length).toBeGreaterThan(0);

    // Esperar a que la carga de datos termine
    await waitFor(() => {
      // Verificar que ya no se muestre el spinner
      expect(screen.queryAllByText('Loading...').length).toBe(0);

      // Verificar que se renderice correctamente la lista de películas
      expect(screen.getByText('Godzilla x Kong: The New Empire')).toBeInTheDocument();

    });
  });

  it('debería manejar errores de la API y mostrar un mensaje de error', async () => {
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

      // Verificar que se renderice correctamente el error de la modal
      expect(screen.getByText('An error occurred while fetching data from the API.')).toBeInTheDocument();
    });
  });
});
