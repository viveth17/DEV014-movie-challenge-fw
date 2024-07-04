import { apiMovieData } from "../models/ApiMovieData";
import Movie from "../models/Movie";
import { formatMovie, formatGenresToMap } from "../utils/transformers";


const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.REACT_APP_API_KEY;

interface Genre {
    id: number;
    name: string;
}

// Esta función hace una llamada a una API para obtener los géneros de películas.
// La función debe devolver una Promise que resuelva un array de objetos como [{id: number, name: string}]
export async function getMovieGenres(): Promise<Genre[]> {
    // Verifica que API_KEY esté definida en las variables de entorno
    if (!API_KEY) {
        throw new Error('API_KEY not found in environment variables');
    }

    // Construye la URL de la API incluyendo la clave API
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`;

    // Realiza la solicitud GET a la API de The Movie DB
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await fetch(url);
        // console.log('Response:', response); // Log de la respuesta completa
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // console.log('Data:', data); // Log de los datos JSON


        // Verifica que el campo 'genres' exista en la respuesta
        if (!data.genres) {
            throw new Error('No genres found in response');
        }
        // console.log('Genres:', data.genres); // Log de la lista de géneros
        return data.genres;
    } catch (error) {
        throw error;
    }
}

//Esta función hace una llamada a la API para obtener los detalles de la película por ID
//La función debe devolver una Promise que resuelva un modelo de negocio Movie

export async function getMovieDetail(id: number) : Promise<Movie>  {

if (!API_KEY) {
    throw new Error('API_KEY not found in environment variables');
}

const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES`;


// eslint-disable-next-line no-useless-catch
try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: apiMovieData = await response.json();

    //Obtener los géneros
    const genres = await getMovieGenres();
    const genresMap = formatGenresToMap(genres);

    return formatMovie(data, genresMap);
} catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Network request failed');
      }
    throw error;
}
}
