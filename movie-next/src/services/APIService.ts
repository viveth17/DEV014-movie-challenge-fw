//agregar el metodo "getMovies" (Metodo que hara la solicitud a The Movie DB para obtner los datos de las peliculas)
//importar funcion "formatMovie" (Para transformar esos datos)
import { formatMovie } from "../utils/transformers";
import Movie from "../models/Movie";
// import dotenv from 'dotenv'; //para acceder a la variable de entorno (importar 'dotenv')
import { apiMovieData } from "../models/ApiMovieData";

// dotenv.config(); //configuracion 


const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '507d215bc9cdb8bdfd69fe3f82871b8b'  // para acceder a la variable de entorno definida en .env

export function getMovies(): Promise<Movie[]> { //funcion para obtener datos de peliculas desde el endpoint (Devuelve una Promise que resuelve un array de objetos de tipo Movie)
    if (!API_KEY) { //verifica API_KEY esté definida en las variables de entorno
      throw new Error('API_KEY not found in environment variables');
    }
  //construye la URL de la API incluyendo la clave API
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}`;
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
        const movies: Movie[] = data.map( (apiMovie: apiMovieData) => formatMovie(apiMovie) );
        return movies; //Retorna el array de peliculas trasnformadas
      })
      .catch(error => {
      throw error; 
    });
  }

  export function getImages(id:number){ //funcion para obtener datos de peliculas desde el endpoint (Devuelve una Promise que resuelve un array de objetos de tipo Movie)
    if (!API_KEY) { //verifica API_KEY esté definida en las variables de entorno
      throw new Error('API_KEY not found in environment variables');
    }
  //construye la URL de la API incluyendo la clave API
    const url = `${BASE_URL}/movie/${id}/images?api_key=${API_KEY}`;
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
        // Asegúrate de que backdrops sea un array y accede a file_path del primer elemento
        if (!data.backdrops || !Array.isArray(data.backdrops) || data.backdrops.length === 0) {
          throw new Error('No backdrops found');
        }
        return data.backdrops[0].file_path; // Accede a file_path del primer backdrop
      })
      .catch(error => {
      throw error; 
    });
  }

