
type Movie = {
    poster_path: string;
    title: string;          // Título de la película
    poster: string;         // URL del póster de la película
    releaseYear: string;    // Año de lanzamiento de la película
    genres: Array<string>;        // Géneros de la película 
    rating: number;         // Calificación de la película 
    id: number;
    backdrop_path : string;
    original_title : string;
    overview : string;

  };
  
  export default Movie;
  