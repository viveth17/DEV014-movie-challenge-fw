import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MovieList from './MovieList';
import Movie from '../models/Movie';

// Mock de datos de películas para las pruebas
const moviesData: Movie[] = [
  {
    id: 1,
    title: 'Godzilla x Kong: The New Empire',
    releaseYear: '2024-03-27',
    backdrop_path: '/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg',
    poster: '',
    genres: [],
    rating: 0,
    poster_path: '',
    original_title: '',
    overview: ''
  },
  {
    id: 2,
    title: 'Inception',
    releaseYear: '2010',
    backdrop_path: '/inception_backdrop.jpg',
    poster: '',
    genres: [],
    rating: 0,
    poster_path: '',
    original_title: '',
    overview: ''
  }
];

describe('MovieList', () => {
  it('debería renderizar correctamente con varias películas', () => {
    render(
      <MemoryRouter>
        <MovieList movies={moviesData} />
      </MemoryRouter>
    );

    // Verifica que el componente MovieList renderice correctamente
    expect(screen.getByText('Godzilla x Kong: The New Empire')).toBeTruthy(); // Ajusta según corresponda el título

    // Verifica que se renderice cada película usando MovieCard
    moviesData.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeTruthy();
      // Verifica que el año de lanzamiento esté en el formato correcto
      const releaseYear = movie.releaseYear
        ? new Date(movie.releaseYear).getFullYear()
        : 'Release year not available';
      expect(screen.getByText(String(releaseYear))).toBeTruthy();

      expect(screen.getByAltText(`${movie.title} poster`)).toBeTruthy();
    });
  });

  it('debería renderizar correctamente con lista de películas vacía', () => {
    render(
      <MemoryRouter>
        <MovieList movies={[]} />
      </MemoryRouter>
    );

    // Verifica que el mensaje de lista vacía se renderice
    expect(screen.getByText(/No movies available/i)).toBeInTheDocument();
  });

  it('debería renderizar correctamente con películas que faltan título o año de estreno', () => {
    const moviesWithMissingData: Movie[] = [
      {
        id: 3,
        title: 'Movie without release year',
        backdrop_path: '/no_release_year_backdrop.jpg',
        poster: '',
        releaseYear: '',
        genres: [],
        rating: 0,
        poster_path: '',
        original_title: '',
        overview: ''
      },
      {
        id: 4,
        title: '',
        backdrop_path: '/no_title_backdrop.jpg',
        poster: '',
        releaseYear: '01-01-2022',
        genres: [],
        rating: 0,
        poster_path: '',
        original_title: '',
        overview: ''
      }
    ];

    render(
      <MemoryRouter>
        <MovieList movies={moviesWithMissingData} />
      </MemoryRouter>
    );

    // Verifica que las películas sin título o año de estreno muestren el mensaje por defecto
    expect(screen.getByText(/Movie without release year/i)).toBeInTheDocument();
    expect(screen.getByText(/Fecha de estreno no disponible/i)).toBeInTheDocument();

    expect(screen.getByAltText(/No title available/i)).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
  });
});

