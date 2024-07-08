//agregar el metodo "getMovies" (Metodo que hara la solicitud a The Movie DB para obtner los datos de las peliculas)
//importar funcion "formatMovie" (Para transformar esos datos)
import { formatMovie } from "../utils/transformers";
import Movie from "../models/Movie";
// import dotenv from 'dotenv'; //para acceder a la variable de entorno (importar 'dotenv')
import { apiMovieData } from "../models/ApiMovieData";



const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.REACT_APP_API_KEY;
// const API_KEY = '507d215bc9cdb8bdfd69fe3f82871b8b';/*process.env.API_KEY;*/  // para acceder a la variable de entorno definida en .env

interface GetMoviesParams {
  filters: {
    page: number;
    genreId?: number | null; // parámetro para filtrar por ID de género
    sortBy?: string | null; // parámetro para ordenar 
  }
}

interface MoviesResponse {
  metaData: {
    pagination: {
      currentPage: number;
      totalPages: number;
    }
  }
  movies: Movie[];
}

export function getMovies(params : GetMoviesParams, genresMap:  Map<number, string>): Promise<MoviesResponse> { //funcion para obtener datos de peliculas desde el endpoint (Devuelve una Promise que resuelve un array de objetos de tipo Movie)

  const {filters } = params; //Desestructuracion para obtner el objeto filters
  const {page, genreId = null, sortBy = null } = filters; // Desestructuación para obtener los valores de page, genreId y sortBy
  //establecer valores predeterminados de null para genreId y sortBy

    if (!API_KEY) { //verifica API_KEY esté definida en las variables de entorno
      throw new Error('API_KEY not found in environment variables');
    }

  //construye la URL de la API incluyendo la clave API
    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}`;
    
// Agregar genreId a la URL si está definido
if (genreId !==  null) {
  url += `&with_genres=${genreId}`;
}

// Agregar sortBy a la URL si está definido
if (sortBy) {
  url += `&sort_by=${sortBy}`;
}

  //Realiza la solicitud GET a la API de The Movie DB
    return fetch(url)
      .then(response => {
        //Verifica si la respuesta de la red es exitosa 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); //convierte la respuesta a JSON
      })
      .then(data => { 
        //Mapea los datos de las peliculas de la API al modelo de negocio Movie utilizando formatMovie
        const movies: Movie[] = data.results.map( (apiMovie: apiMovieData) => formatMovie(apiMovie, genresMap, false) );
        const metaData = {
          pagination: {
            currentPage: data.page,
            totalPages: data.total_pages,
        }
      }

        return {metaData,movies}; //Retorna el array de peliculas trasnformadas
      })
      .catch(error => {
      throw error; 
    });
  }

