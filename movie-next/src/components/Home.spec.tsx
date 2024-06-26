import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import Home from './Home';
import { BrowserRouter as Router } from 'react-router-dom';

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

    act(() => {
      render(
        <Router>
          <Home />
        </Router>
      );
    });
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

    act(() => {
      render(
        <Router>
          <Home />
        </Router>
      );
    });
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
  it('debería manejar clics en los botones de paginación', async () => {
    const mockMoviesPage1 = {
      page: 1,
      total_pages: 2,
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
    const mockMoviesPage2 = {
      page: 2,
      total_pages: 2,
      results: [
        {
          genre_ids: [12, 16, 35],
          poster_path: "/aN7Pr0UrqY5VwGZ7rF7mWzBLpkB.jpg",
          release_date: "2024-03-28",
          title: "Spider-Man: No Way Home",
          vote_average: 8.5,
          backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
          id: 634649
        }
      ]
    };

    fetchMock.mockResponses(
      [JSON.stringify(mockMoviesPage1), { status: 200 }],
      [JSON.stringify(mockMoviesPage2), { status: 200 }]
    );

    act(() => {
      render(
        <Router>
          <Home />
        </Router>
      );
    });

    // Esperar a que la carga de datos termine para la primera página
    await waitFor(() => {
      expect(screen.getByText('Godzilla x Kong: The New Empire')).toBeInTheDocument();
    });

    // Simular clic en el botón de la segunda página
    fireEvent.click(screen.getByRole('button', { name: /2/i }));

    // Esperar a que la carga de datos termine para la segunda página
    await waitFor(() => {
      expect(screen.getByText('Spider-Man: No Way Home')).toBeInTheDocument();
    });
  });

  it('debería cambiar los parámetros de URL cuando se cambia la página', async () => {
    const mockMovies = {
      page: 1,
      total_pages: 2,
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

    fetchMock.mockResponse(JSON.stringify(mockMovies));

    const { getByRole } = render(
      <Router>
        <Home />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Godzilla x Kong: The New Empire')).toBeInTheDocument();
    });

    const page2Button = getByRole('button', { name: /2/i });
    fireEvent.click(page2Button);

    expect(window.location.search).toBe('?page=2');
  });
});

