import Movie from '../models/Movie';
import { apiMovieData } from '../models/ApiMovieData';

export function formatMovie(apiMovieData: apiMovieData): Movie {
  const formattedMovie: Movie = {
    title: apiMovieData.title,
    poster: apiMovieData.poster_path,
    releaseYear: apiMovieData.release_date,
    genre: apiMovieData.genre_ids,
    rating: apiMovieData.vote_average,
    id: apiMovieData.id,
    backdrop_path : apiMovieData.backdrop_path
  };

  return formattedMovie;
}
