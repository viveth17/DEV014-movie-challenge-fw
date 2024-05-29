import { formatMovie } from "../utils/transformers"; //importacion de la funcion a poner a prueba
import { apiMovieData } from "../models/ApiMovieData"; //importacion del tipo de datos de la API
import Movie from "../models/Movie"; //Importacion de el modelo de negocio Movie

describe ('formatMovie', () =>{  //Descripcion de las pruebas para formatMovie
    it('Debería transformar los datos de la API al modelo Movie', () => { // Primer caso de prueba

    const apiData: apiMovieData = { //Definir datos de ejemplo de la API
     
        "genre_ids": [
            878,
            28,
            12
        ],
        "poster_path": "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
        "release_date": "2024-03-27",
        "title": "Godzilla x Kong: The New Empire",
        "vote_average": 7.261
    };
    const expectedMovie: Movie = { //Definir el resultado esperado despues de la transformacion 
        title:  "Godzilla x Kong: The New Empire",
        poster: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
        releaseYear: "2024-03-27",
        genre: [
            878,
            28,
            12
        ],
        rating:  7.261
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
        genre: undefined,
        rating: undefined
      };
    // Llamado de la funcion formatMovie con los datos parciales de la API
      const formattedMovie = formatMovie(apiData as apiMovieData);
    //Comprobacion de que el resultado de la funcion sea igual al objeto esperado
      expect(formattedMovie).toEqual(expectedMovie);
    });
  });


