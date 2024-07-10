import Movie from '../models/Movie';
import { apiMovieData } from '../models/ApiMovieData';

interface Genre {
  id: number;
  name: string;
}

export function formatMovie(apiMovieData: apiMovieData, genresMap: Map<number, string>, isDetail: boolean): Movie {

  let genres: string[] = [];

  if (isDetail === true) {
    //verifica si apiMovieData.genres esta definido antes de llamar a map
    if (apiMovieData.genres) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      genres = apiMovieData.genres.map((element: any) => element.name);
    } else {
      genres = [];
    }
  } else {
    // Verifica si genre_ids está definido; si no, asigna un arreglo vacío
    const genreIds = apiMovieData.genre_ids || [];
    // Mapea los IDs de género a nombres usando el genresMap
    genres = genreIds.map(id => genresMap.get(id) || 'Unknown');
  }
 
  const formattedMovie: Movie = {
    title: apiMovieData.title,
    poster: apiMovieData.poster_path,
    releaseYear: apiMovieData.release_date,
    genres,
    rating: apiMovieData.vote_average,
    id: apiMovieData.id,
    backdrop_path: apiMovieData.backdrop_path,
    overview: apiMovieData.overview,
    original_title: apiMovieData.original_title,
    poster_path: apiMovieData.poster_path
  };

  return formattedMovie;
}


export function formatGenresToMap(genres: Genre[]): Map<number, string> {
  const genresMap = new Map<number, string>();

  // Verifica si el arreglo de géneros está vacío
  if (genres.length === 0) {
    return genresMap; // Devuelve un Map vacío directamente
  }

  genres.forEach(genre => {
    genresMap.set(genre.id, genre.name);
   
  });

  return genresMap;
}

export function formatGenresToOptions(genres: Genre[]): { value: string, label: string }[] {
  if (genres.length === 0) {
    return []; // Devuelve un arreglo vacío si no hay géneros que convertir 
  }
  return genres.map(genre => ({
    value: genre.id.toString(), // convertir el id a string
    label: genre.name
  }));
}