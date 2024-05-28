import { formatMovie } from "../utils/transformers"; //importacion de la funcion a poner a prueba
import { apiMovieData } from "../models/ApiMovieData"; //importacion del tipo de datos de la API
import Movie from "../models/Movie"; //Importacion de el modelo de negocio Movie

describe ('formatMovie', () =>{  //Descripcion de las pruebas para formatMovie
    it('Debería transformar los datos de la API al modelo Movie', () => { // Primer caso de prueba

    const apiData: apiMovieData = { //Definir datos de ejemplo de la API
      title: 'Pelicula de ejemplo',
      poster: 'https://ejemplo.com/poster.jpg',
      releaseYear: 2023,
      director: 'Director Ejemplo',
      genre: 'Drama',
      duration: 120,
      rating: 4.5,
    };
    const expectedMovie: Movie = { //Definir el resultado esperado despues de la transformacion 
        title: 'Pelicula de ejemplo',
        poster: 'https://ejemplo.com/poster.jpg',
        releaseYear: 2023,
        director: 'Director Ejemplo',
        genre: 'Drama',
        duration: 120,
        rating: 4.5,
      };
  
      const formattedMovie = formatMovie(apiData); //Llamado de la funcion formatMovie con los datos de la API
  
      expect(formattedMovie).toEqual(expectedMovie); //Comprobacion de que el resultado de la funcion sea igual al objeto esperado
    });
  
    it('debería manejar datos incompletos de la API', () => { //Segundo caso de prueba 
    //Definimos datos parciales de la API (incompletos)
      const apiData: Partial<apiMovieData> = {
        title: 'Pelicula de ejemplo incompleta',
      };
    //Definimos el resultado esperado con campos undefined
      const expectedMovie: Partial<Movie> = {
        title: 'Pelicula de ejemplo incompleta',
        poster: undefined,
        releaseYear: undefined,
        director: undefined,
        genre: undefined,
        duration: undefined,
        rating: undefined,
      };
    // Llamado de la funcion formatMovie con los datos parciales de la API
      const formattedMovie = formatMovie(apiData as apiMovieData);
    //Comprobacion de que el resultado de la funcion sea igual al objeto esperado
      expect(formattedMovie).toEqual(expectedMovie);
    });
  });


