import { getMovieGenres } from './movieService';

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
      'https://api.themoviedb.org/3/genre/movie/list?api_key=undefined'
    );
  });

  it('debería lanzar un error cuando la clave de API no está definida', async () => {
    // Backup de la API key original
    const originalApiKey = process.env.REACT_APP_API_KEY;

    // Eliminar la API key para esta prueba
    delete process.env.REACT_APP_API_KEY;

    await expect(getMovieGenres()).rejects.toThrow('API_KEY not found in environment variables');

    // Restaurar la API key original
    process.env.REACT_APP_API_KEY = originalApiKey;
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
