import Movie from '../models/Movie';
import { apiMovieData } from '../models/ApiMovieData';

export function formatMovie(apiMovieData: apiMovieData): Movie {
  const formattedMovie: Movie = {
    title: apiMovieData.title,
    poster: apiMovieData.poster,
    releaseYear: apiMovieData.releaseYear,
    director: apiMovieData.director,
    genre: apiMovieData.genre,
    duration: apiMovieData.duration,
    rating: apiMovieData.rating,
  };

  return formattedMovie;
}
