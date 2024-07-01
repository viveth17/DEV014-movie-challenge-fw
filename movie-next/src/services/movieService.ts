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
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;

    // Realiza la solicitud GET a la API de The Movie DB
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
        console.error('Error fetching movie genres:', error);
        throw error;
    }
}