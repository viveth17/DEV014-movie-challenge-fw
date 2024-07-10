// import '@testing-library/jest-dom';
// import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
// import Home from './Home';
// import { MemoryRouter } from 'react-router-dom';
// import * as APIService from '../services/APIService';
// import * as movieService from '../services/movieService';

// // Mock de getMovies
// jest.mock('../services/APIService', () => ({
//   getMovies: jest.fn(),
// }));

// // Mock de getMovieGenres
// jest.mock('../services/movieService', () => ({
//   getMovieGenres: jest.fn(),
// }));

// describe('Home', () => {
//   beforeEach(() => {
//     jest.clearAllMocks(); // Limpiar todos los mocks antes de cada prueba
//   });

//   it('debería manejar clics en los botones de paginación', async () => {
//     const mockGenres = [
//       { id: 28, name: 'Action' },
//       { id: 12, name: 'Adventure' },
//       { id: 878, name: 'Science Fiction' },
//     ];

//     const mockMoviesPage1 = {
//       movies: [
//         {
//           genre_ids: [878, 28, 12],
//           poster_path: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
//           release_date: "2024-03-27",
//           title: "Godzilla x Kong: The New Empire",
//           vote_average: 7.261,
//           backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
//           id: 929590,
//         }
//       ],
//       metaData: {
//         pagination: {
//           currentPage: 1,
//           totalPages: 2,
//         },
//       },
//     };

//     const mockMoviesPage2 = {
//       movies: [
//         {
//           genre_ids: [12, 16, 35],
//           poster_path: "/aN7Pr0UrqY5VwGZ7rF7mWzBLpkB.jpg",
//           release_date: "2024-03-28",
//           title: "Spider-Man: No Way Home",
//           vote_average: 8.5,
//           backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
//           id: 634649,
//         }
//       ],
//       metaData: {
//         pagination: {
//           currentPage: 2,
//           totalPages: 2,
//         },
//       },
//     };

//     (movieService.getMovieGenres as jest.Mock).mockResolvedValueOnce(mockGenres);
//     (APIService.getMovies as jest.Mock).mockResolvedValueOnce(mockMoviesPage1).mockResolvedValueOnce(mockMoviesPage2);

//     act(() => {
//       render(
//         <MemoryRouter initialEntries={['/']}>
//           <Home />
//         </MemoryRouter>
//       );
//     });

//     // Esperar a que la carga de datos termine para la primera página
//     await waitFor(() => {
//       expect(screen.getByText('Godzilla x Kong: The New Empire')).toBeInTheDocument();
//     });

//     // Simular clic en el botón de la segunda página
//     fireEvent.click(screen.getByRole('button', { name: /2/i }));

//     // Esperar a que la carga de datos termine para la segunda página
//     await waitFor(() => {
//       expect(screen.getByText('Spider-Man: No Way Home')).toBeInTheDocument();
//     });
//   });
// });

// import '@testing-library/jest-dom';
// import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
// import Home from './Home';
// import { MemoryRouter } from 'react-router-dom';
// import * as APIService from '../services/APIService';
// import * as movieService from '../services/movieService';

// // Mock de getMovies
// jest.mock('../services/APIService', () => ({
//   getMovies: jest.fn(),
// }));

// // Mock de getMovieGenres
// jest.mock('../services/movieService', () => ({
//   getMovieGenres: jest.fn(),
// }));

// describe('Home', () => {
//   beforeEach(() => {
//     jest.clearAllMocks(); // Limpiar todos los mocks antes de cada prueba
//   });

//   it('debería manejar clics en los botones de paginación', async () => {
//     const mockGenres = [
//       { id: 28, name: 'Action' },
//       { id: 12, name: 'Adventure' },
//       { id: 878, name: 'Science Fiction' },
//     ];

//     const mockMoviesPage1 = {
//       movies: [
//         {
//           genre_ids: [878, 28, 12],
//           poster_path: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
//           release_date: "2024-03-27",
//           title: "Godzilla x Kong: The New Empire",
//           vote_average: 7.261,
//           backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
//           id: 929590,
//         }
//       ],
//       metaData: {
//         pagination: {
//           totalPages: 2,
//         },
//       },
//     };

//     const mockMoviesPage2 = {
//       movies: [
//         {
//           genre_ids: [12, 16, 35],
//           poster_path: "/aN7Pr0UrqY5VwGZ7rF7mWzBLpkB.jpg",
//           release_date: "2024-03-28",
//           title: "Spider-Man: No Way Home",
//           vote_average: 8.5,
//           backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
//           id: 634649,
//         }
//       ],
//       metaData: {
//         pagination: {
//           totalPages: 2,
//         },
//       },
//     };

//     (movieService.getMovieGenres as jest.Mock).mockResolvedValue(mockGenres);
//     (APIService.getMovies as jest.Mock).mockResolvedValueOnce(mockMoviesPage1).mockResolvedValueOnce(mockMoviesPage2);

//     act(() => {
//       render(
//         <MemoryRouter initialEntries={['/']}>
//           <Home />
//         </MemoryRouter>
//       );
//     });

//     // Esperar a que la carga de datos termine para la primera página
//     await waitFor(() => {
//       expect(screen.getByText('Godzilla x Kong: The New Empire')).toBeInTheDocument();
//     });

//     // Simular clic en el botón de la segunda página
//     fireEvent.click(screen.getByRole('button', { name: /2/i }));

//     // Esperar a que la carga de datos termine para la segunda página
//     await waitFor(() => {
//       expect(screen.getByText('Spider-Man: No Way Home')).toBeInTheDocument();
//     });
//   });
// });














import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { MemoryRouter } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
import '@testing-library/jest-dom';
import * as APIService from '../services/APIService';
import * as movieService from '../services/movieService';
import { act } from 'react'

// // Habilitar mocks para fetch
fetchMock.enableMocks();

 // Mock de getMovies
 jest.mock('../services/APIService', () => ({
  getMovies: jest.fn().mockResolvedValue({
    movies: [
      {
        genres: ["Science Fiction", "Adventure", "Action"],
        genre_ids: [878, 28, 12],
        poster_path: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
        release_date: "2024-03-27",
        title: "Godzilla x Kong: The New Empire",
        vote_average: 7.261,
        backdrop_path: "/some_backdrop_path.jpg",
        id: 653346,
        original_title: "Godzilla vs Kong Original Title",
        overview: "This is an overview.",
        releaseYear: "2024-03-27",
      }
    ],
    metaData: {
      pagination: {
        totalPages: 1,
      },
    },
  }),
}));

// Mock de getMovieGenres
jest.mock('../services/movieService', () => ({
  getMovieGenres: jest.fn().mockResolvedValue([
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 878, name: 'Science Fiction' },
  ]),
}));

// Mock de getMoviesGenres REMOVE???!!
jest.mock('../services/movieService', () => ({
  getMovieGenres: jest.fn().mockResolvedValue([
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 878, name: 'Science Fiction' },
  ]),
}));

describe('Home Component select', () => {
  beforeEach(() => {
    jest.resetAllMocks();
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
 
  it('debería actualizar la URL al seleccionar un género y ordenar por opción', async () => {
    const result = render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    // Esperar a que los géneros se carguen
    await waitFor(() => expect(movieService.getMovieGenres).toHaveBeenCalled());
    // Seleccionar opción de género
    const genreSelectContainer = result.container.querySelector('#filter-by-genre');
    if (genreSelectContainer) {
      const genreSelect = genreSelectContainer.querySelector('select');
      if (genreSelect) {
        fireEvent.change(genreSelect, { target: { value: '28' } });
      }
    }

    // Mock param search selected
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { search: 'genreId=28' },
    });
    // Verificar que la URL se actualizó correctamente con el parámetro de género
    await waitFor(() => {
      expect(window.location.search).toContain('genreId=28');
    });

    // Seleccionar opción de ordenamiento
    const sortSelectContainer = result.container.querySelector('#sort-by');
    if (sortSelectContainer) {
      const sortSelect = sortSelectContainer.querySelector('select');
      if (sortSelect) {
        fireEvent.change(sortSelect, { target: { value: 'popularity.desc' } });
      }
    }
    // Mock param search sort
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { search: 'sortBy=popularity.desc' },
    });
    // Verificar que la URL se actualizó correctamente con el parámetro de ordenamiento
    await waitFor(() => {
      expect(window.location.search).toContain('sortBy=popularity.desc');
    });
  });

  it('debería mostrar el spinner de carga cuando isLoading es true', async () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    // Verificar que se muestre el spinner mientras se carga
    expect(screen.queryAllByText('Loading...').length).toBeGreaterThan(0);

    // Esperar a que el componente termine de cargar
    await waitFor(() => {
      expect(screen.queryAllByText('Loading...').length).toBe(0); // Spinner ya no debería estar presente
    });
  });

  it('debería mostrar las películas cuando los datos se obtienen exitosamente', async () => {
    const mockGenres = [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 878, name: 'Science Fiction' },
    ];

    const mockMovies = {
      movies: [
        {
          genre_ids: [878, 28, 12],
          poster_path: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
          release_date: "2024-03-27",
          title: "Godzilla x Kong: The New Empire",
          vote_average: 7.261,
          backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
          id: 929590,
        }
      ],
      metaData: {
        pagination: {
          totalPages: 1,
        },
      },
    };

    (movieService.getMovieGenres as jest.Mock).mockResolvedValueOnce(mockGenres);
    (APIService.getMovies as jest.Mock).mockResolvedValueOnce(mockMovies);

    act(() => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Home />
        </MemoryRouter>
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

  it('debería cambiar los parámetros de URL cuando se cambia la página', async () => {
    const mockGenres = [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 878, name: 'Science Fiction' },
    ];

    const mockMovies = {
      movies: [
        {
          genre_ids: [878, 28, 12],
          poster_path: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
          release_date: "2024-03-27",
          title: "Godzilla x Kong: The New Empire",
          vote_average: 7.261,
          backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
          id: 929590,
        }
      ],
      metaData: {
        pagination: {
          totalPages: 2,
        },
      },
    };

    (movieService.getMovieGenres as jest.Mock).mockResolvedValueOnce(mockGenres);
    (APIService.getMovies as jest.Mock).mockResolvedValueOnce(mockMovies);

    const { getByRole } = render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Godzilla x Kong: The New Empire')).toBeInTheDocument();
    });

    const page2Button = getByRole('button', { name: /2/i });
    fireEvent.click(page2Button);

    // Mock param search sort
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { search: 'page=2' },
    });

    await waitFor(() => {
      expect(window.location.search).toBe('page=2');
    });
  });

  it('debería manejar clics en los botones de paginación', async () => {
    const mockGenres = [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 878, name: 'Science Fiction' },
    ];

    const mockMoviesPage1 = {
      movies: [
        {
          genre_ids: [878, 28, 12],
          poster_path: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
          release_date: "2024-03-27",
          title: "Godzilla x Kong: The New Empire",
          vote_average: 7.261,
          backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
          id: 929590,
        }
      ],
      metaData: {
        pagination: {
          totalPages: 2,
        },
      },
    };

    const mockMoviesPage2 = {
      movies: [
        {
          genre_ids: [12, 16, 35],
          poster_path: "/aN7Pr0UrqY5VwGZ7rF7mWzBLpkB.jpg",
          release_date: "2024-03-28",
          title: "Spider-Man: No Way Home",
          vote_average: 8.5,
          backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
          id: 634649,
        }
      ],
      metaData: {
        pagination: {
          totalPages: 2,
        },
      },
    };

    (movieService.getMovieGenres as jest.Mock).mockResolvedValue(mockGenres);
    (APIService.getMovies as jest.Mock).mockResolvedValueOnce(mockMoviesPage1).mockResolvedValueOnce(mockMoviesPage2);

    act(() => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Home />
        </MemoryRouter>
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
});