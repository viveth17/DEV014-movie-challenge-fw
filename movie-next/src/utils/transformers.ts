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

interface Genre {
  id: number;
  name: string;
}

export function formatGenresToMap(genres: Genre[]): Map<number, string> {
  const genresMap = new Map<number, string>();

   // Verifica si el arreglo de géneros está vacío
   if (genres.length === 0) {
    return genresMap; // Devuelve un Map vacío directamente
}

  genres.forEach(genre => {
      genresMap.set(genre.id, genre.name);
      console.log(`Agregado género: ID ${genre.id} - Nombre ${genre.name}`);
  });

  return genresMap;
}