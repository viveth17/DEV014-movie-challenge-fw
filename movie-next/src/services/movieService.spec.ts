import { getMovieGenres, getMovieDetail } from './movieService';
// import {formatMovie, formatGenresToMap} from '../utils/transformers';
import { apiMovieData } from '../models/ApiMovieData';
import Movie from '../models/Movie';

// Mock de fetch para simular solicitudes a la API
global.fetch = jest.fn();

const mockGenresResponse = {
  genres: [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
  ],
};

describe('getMovieGenres', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('debería devolver una lista de géneros cuando la llamada a la API sea exitosa', async () => {
    // Configura fetch para devolver una respuesta exitosa
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockGenresResponse,
    });

    const genres = await getMovieGenres();

    expect(genres).toEqual(mockGenresResponse.genres);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=mock_api_key&language=es-ES'
    );
  });


  it('debería lanzar un error cuando la respuesta de red no es correcta', async () => {
    // Configura fetch para devolver una respuesta de error
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    await expect(getMovieGenres()).rejects.toThrow('Network response was not ok');
  });

  it('debería lanzar un error cuando no se encuentran géneros en la respuesta', async () => {
    // Configura fetch para devolver una respuesta sin géneros
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    await expect(getMovieGenres()).rejects.toThrow('No genres found in response');
  });

  it('debería lanzar un error cuando falla fetch', async () => {
    // Configura fetch para lanzar un error
    (fetch as jest.Mock).mockRejectedValue(new Error('Fetch failed'));

    await expect(getMovieGenres()).rejects.toThrow('Fetch failed');
  });
});


describe('getMovieDetail', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  const mockApiMovieData: apiMovieData = {
    id: 1,
    title: 'Mock Movie',
    poster_path: '/mockposter.jpg',
    release_date: '2022-01-01',
    genres: [{ id: 28, name: "Action" }, { id: 12, name: "Adventure" }],
    vote_average: 8.5,
    backdrop_path: '/mockbackdrop.jpg',
    overview: 'Mock overview', // Agregar overview
    original_title: 'Mock Original Title' // Agregar original_title
    ,
    genre_ids: []
  };

  const mockGenres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
  ];

  const mockFormattedMovie: Movie = {
    id: 1,
    title: 'Mock Movie',
    poster: '/mockposter.jpg',
    releaseYear: '2022-01-01',
    genres: ['Action', 'Adventure'],
    rating: 8.5,
    backdrop_path: '/mockbackdrop.jpg',
    overview: 'Mock overview',
    original_title: 'Mock Original Title',
    poster_path: '/mockposter.jpg'
  };

  it('debería obtener los detalles de la película y transformarlos al modelo de Movie', async () => {
    // Configura fetch para devolver la respuesta de la película
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiMovieData,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ genres: mockGenres }),
      });

    const result = await getMovieDetail(1);

    // Verifica que se llamó a fetch dos veces (una para la película y otra para los géneros)
    expect(fetch).toHaveBeenCalledTimes(2);

    // Verifica la llamada para obtener detalles de la película
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/movie/1'));

    // Verifica la llamada para obtener los géneros
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/genre/movie/list'));

    // Verifica que el resultado sea el modelo de película formateado correctamente
    expect(result).toEqual(mockFormattedMovie);
  });

  it('debería lanzar un error si falta la API_KEY', async () => {
    //Guarda la API_KEY original
    const originalApiKey = process.env.REACT_APP_API_KEY;
    //elimina la API_KEY 
    delete process.env.REACT_APP_API_KEY;
    try{
    await expect(getMovieDetail(1)).rejects.toThrow('API_KEY not found in environment variables');
    }finally {
    //Retaura la API_KEY original
    process.env.REACT_APP_API_KEY = originalApiKey;
    }
  });

  it('debería lanzar un error si falla la solicitud de película', async () => {
    // Configura fetch para devolver una respuesta de error
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(getMovieDetail(1)).rejects.toThrow('Network response was not ok');
  });

  it('debería lanzar un error si falla la solicitud de géneros', async () => {
    // Configura fetch para lanzar un error al obtener géneros
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiMovieData,
      })
      .mockResolvedValueOnce({
        ok: false,
      });

    await expect(getMovieDetail(1)).rejects.toThrow('Network response was not ok');
  });
});

