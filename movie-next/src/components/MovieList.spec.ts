import '@testing-library/jest-dom';
import React from "react";
import { render, screen } from "@testing-library/react";
import MovieList from "./MovieList";
import Movie from '../models/Movie';

// Mock de datos de películas para las pruebas
const moviesData : Movie[] = [
  {
      id: 1,
      title: "Godzilla x Kong: The New Empire",
      releaseYear: "2024-03-27",
      backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
      poster: '',
      genre: [],
      rating: 0
  },
  {
      id: 2,
      title: "Inception",
      releaseYear: "2010",
      backdrop_path: "/inception_backdrop.jpg",
      poster: '',
      genre: [],
      rating: 0
  },
];

describe("MovieList", () => {
  it("debería renderizar correctamente con varias películas", () => {
    render( React.createElement (MovieList, {movies: moviesData} ));

    // Verifica que el componente MovieList renderice correctamente
    expect(screen.getByText("Godzilla x Kong: The New Empire")).toBeTruthy();// Ajusta según corresponda el título

    // Verifica que se renderice cada película usando MovieCard
    moviesData.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeTruthy();
      expect(screen.getByText(movie.releaseYear)).toBeTruthy();
      expect(screen.getByAltText(`${movie.title} poster`)).toBeTruthy();
    });
  });

  it("debería renderizar correctamente con lista de películas vacía", () => {
    render( React.createElement (MovieList, {movies: []} ));

    // Verifica que el mensaje de lista vacía se renderice
    expect(screen.getByText(/No movies available/i)).toBeInTheDocument();
  });

  it("debería renderizar correctamente con películas que faltan título o año de estreno", () => {
    const moviesWithMissingData: Movie[] = [
      {
          id: 3,
          title: "Movie without release year",
          backdrop_path: "/no_release_year_backdrop.jpg",
          poster: '',
          releaseYear: '',
          genre: [],
          rating: 0
      },
      {
          id: 4,
          releaseYear: "2023",
          backdrop_path: "/no_title_backdrop.jpg",
          title: '',
          poster: '',
          genre: [],
          rating: 0
      },
    ];

    render( React.createElement (MovieList, {movies: moviesWithMissingData} ));

    // Verifica que las películas sin título o año de estreno muestren el mensaje por defecto
    expect(screen.getByText(/Movie without release year/i)).toBeInTheDocument();
    expect(screen.getByText(/Release year not available/i)).toBeInTheDocument();

    expect(screen.getByAltText(/No title available poster/i)).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
  });
});
