
import { getMovies } from "./APIService";
import fetchMock from 'jest-fetch-mock';



fetchMock.enableMocks();


describe('getMovies', () => {

  //Limpiar el mock antes de cada prueba (Restauración de los mocks, un test no afecte a los demas test)

  beforeEach(() => {
    fetchMock.resetMocks();
  });


  it('Debería devolver una lista de peliculas para la primera página', () => {  
    // Simular la respuesta de la API 

    const mockMovies = {

      page: 1,
      total_pages: 10,
      results: [
        {
          genre_ids: [878, 28, 12],
          poster_path: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
          release_date: "2024-03-27",
          title: "Godzilla x Kong: The New Empire",
          vote_average: 7.261,
          backdrop_path: "/some_backdrop_path.jpg",
          id: 12345,
          original_title: "Godzilla vs Kong Original Title",
          overview: "This is an overview."

        }
      ]
    };
    const mockGenresMap: Map<number, string> = new Map<number, string>([
      [878, 'Science Fiction'],
      [28, 'Action'],
      [12, 'Adventure']
    ]);

    const responseMovies = [
      {
        genres: ["Science Fiction", "Action", "Adventure"],
        poster: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
        releaseYear: "2024-03-27",
        title: "Godzilla x Kong: The New Empire",
        rating: 7.261,
        backdrop_path: "/some_backdrop_path.jpg",
        id: 12345, 
        original_title: "Godzilla vs Kong Original Title", 
        overview: "This is an overview.", 
        poster_path: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg"
      }
    ];
    fetchMock.mockResponseOnce(JSON.stringify(mockMovies));

    return getMovies({ filters: { page: 1 } }, mockGenresMap)
      .then(response => {
        expect(fetchMock).toHaveBeenCalledWith(
          `https://api.themoviedb.org/3/discover/movie?api_key=mock_api_key&page=${1}`
        );
        expect(response.movies).toEqual(responseMovies);
        expect(response.metaData.pagination.currentPage).toBe(1);
        expect(response.metaData.pagination.totalPages).toBe(10);
      });
  });
  it('Debería devolver una lista de películas para la segunda página', () => {
    const mockMovies = {
      page: 2,
      total_pages: 10,
      results: [
        {
          genre_ids: [878, 28, 12],
          poster_path: "/another_poster.jpg",
          release_date: "2024-03-27",
          title: "Another Movie",
          vote_average: 6.5,
          backdrop_path: "/another_backdrop.jpg",
          id: undefined, 
          original_title: undefined, 
          overview: undefined 

        }
      ]
    };
    const mockGenresMap: Map<number, string> = new Map<number, string>([
      [878, 'Science Fiction'],
      [28, 'Action'],
      [12, 'Adventure']
    ]);

    const responseMovies = [
      {
        genres: ["Science Fiction", "Action", "Adventure"],
        poster: "/another_poster.jpg",
        releaseYear: "2024-03-27",
        title: "Another Movie",
        rating: 6.5,
        backdrop_path: "/another_backdrop.jpg",
        id: undefined,
        original_title: undefined,
        overview: undefined,
        poster_path: "/another_poster.jpg"

      }
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockMovies));

    return getMovies({ filters: { page: 2 } }, mockGenresMap)
      .then(response => {
        expect(fetchMock).toHaveBeenCalledWith(
          `https://api.themoviedb.org/3/discover/movie?api_key=mock_api_key&page=2`
        );
        expect(response.movies).toEqual(responseMovies);
        expect(response.metaData.pagination.currentPage).toBe(2);
        expect(response.metaData.pagination.totalPages).toBe(10);
      });
  });

  it('debería manejar errores de red correctamente', () => {

    fetchMock.mockRejectOnce(new Error('Failed to fetch'));


    return getMovies({ filters: { page: 1 } }, new Map())
      .catch(error => {
        expect(error).toEqual(new Error('Failed to fetch'));
      });
  });

  it('debería lanzar un error si la solicitud no es exitosa', () => {

    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 404, statusText: 'Not Found' });


    return getMovies({ filters: { page: 1 } }, new Map())
      .catch(error => {
        expect(error).toEqual(new Error('Network response was not ok'));
      });
  });

  it('Debería manejar películas sin géneros', () => {
    const mockMovies = {
      page: 1,
      total_pages: 10,
      results: [
        {
          genre_ids: [],
          poster_path: "/no_genre_poster.jpg",
          release_date: "2024-03-27",
          title: "No Genre Movie",
          vote_average: 5.5,
          backdrop_path: "/no_genre_backdrop.jpg",
          id: 1, 
          original_title: "No Genre Movie Original Title",
          overview: "This is an overview."
        }
      ]
    };

    const responseMovies = [
      {
        genres: [],
        poster: "/no_genre_poster.jpg",
        releaseYear: "2024-03-27",
        title: "No Genre Movie",
        rating: 5.5,
        backdrop_path: "/no_genre_backdrop.jpg",
        id: 1, 
        original_title: "No Genre Movie Original Title", 
        overview: "This is an overview.",
        poster_path: "/no_genre_poster.jpg" 

      }
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockMovies));

    return getMovies({ filters: { page: 1 } }, new Map())
      .then(response => {
        expect(response.movies).toEqual(responseMovies);
        expect(response.metaData.pagination.currentPage).toBe(1);
        expect(response.metaData.pagination.totalPages).toBe(10);
      });
  });

  it('Debería manejar películas con datos incompletos', () => {
    const mockMovies = {
      page: 1,
      total_pages: 10,
      results: [
        {
          genre_ids: [878],
          poster_path: null,
          release_date: null,
          title: null,
          vote_average: null,
          backdrop_path: null,
          id: undefined, 
          original_title: undefined, 
          overview: undefined 
        }
      ]
    };

    const mockGenresMap: Map<number, string> = new Map<number, string>([
      [878, 'Science Fiction']
    ]);

    const responseMovies = [
      {
        genres: ["Science Fiction"],
        poster: null,
        releaseYear: null,
        title: null,
        rating: null,
        backdrop_path: null,
        id: undefined,
        original_title: undefined,
        overview: undefined,
        poster_path: null
      }
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockMovies));

    return getMovies({ filters: { page: 1 } }, mockGenresMap)
      .then(response => {
        expect(fetchMock).toHaveBeenCalledWith(
          `https://api.themoviedb.org/3/discover/movie?api_key=mock_api_key&page=${1}`
        );
        expect(response.movies).toEqual(responseMovies);
        expect(response.metaData.pagination.currentPage).toBe(1);
        expect(response.metaData.pagination.totalPages).toBe(10);
      });
  });
  it('Debería devolver películas filtradas por género y ordenadas por popularidad descendente', () => {
    const mockMovies = {
      page: 1,
      total_pages: 10,
      results: [
        {
          genre_ids: [28],
          poster_path: "/action_popular_movie.jpg",
          release_date: "2024-03-27",
          title: "Action Popular Movie",
          vote_average: 8.0,
          backdrop_path: "/action_popular_backdrop.jpg",
          id: undefined, 
          original_title: undefined, 
          overview: undefined 
        }
      ]
    };

    const mockGenresMap: Map<number, string> = new Map<number, string>([
      [28, 'Action']
    ]);

    const responseMovies = [
      {
        genres: ["Action"],
        poster: "/action_popular_movie.jpg",
        releaseYear: "2024-03-27",
        title: "Action Popular Movie",
        rating: 8.0,
        backdrop_path: "/action_popular_backdrop.jpg",
        id: undefined,
        original_title: undefined,
        overview: undefined,
        poster_path: "/action_popular_movie.jpg"
      }
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockMovies));

    return getMovies({ filters: { page: 1, genreId: 28, sortBy: 'popularity.desc' } }, mockGenresMap)
      .then(response => {
        expect(fetchMock).toHaveBeenCalledWith(
          `https://api.themoviedb.org/3/discover/movie?api_key=mock_api_key&page=1&with_genres=28&sort_by=popularity.desc`
        );
        expect(response.movies).toEqual(responseMovies);
        expect(response.metaData.pagination.currentPage).toBe(1);
        expect(response.metaData.pagination.totalPages).toBe(10);
      });
  });
  it('Debería devolver películas para una página específica', () => {
    const mockMovies = {
      page: 3,
      total_pages: 10,
      results: [
        {
          genre_ids: [28],
          poster_path: "/page3_movie.jpg",
          release_date: "2024-03-27",
          title: "Page 3 Movie",
          vote_average: 7.2,
          backdrop_path: "/page3_backdrop.jpg",
          id: undefined, 
          original_title: undefined, 
          overview: undefined 
        }
      ]
    };

    const mockGenresMap: Map<number, string> = new Map<number, string>([
      [28, 'Action']
    ]);

    const responseMovies = [
      {
        genres: ["Action"],
        poster: "/page3_movie.jpg",
        releaseYear: "2024-03-27",
        title: "Page 3 Movie",
        rating: 7.2,
        backdrop_path: "/page3_backdrop.jpg",
        id: undefined,
        original_title: undefined,
        overview: undefined,
        poster_path: "/page3_movie.jpg"
      }
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockMovies));

    return getMovies({ filters: { page: 3 } }, mockGenresMap)
      .then(response => {
        expect(fetchMock).toHaveBeenCalledWith(
          `https://api.themoviedb.org/3/discover/movie?api_key=mock_api_key&page=3`
        );
        expect(response.movies).toEqual(responseMovies);
        expect(response.metaData.pagination.currentPage).toBe(3);
        expect(response.metaData.pagination.totalPages).toBe(10);
      });
  });
  it('Debería devolver películas filtradas por género y ordenadas por popularidad descendente', () => {
    const mockMovies = {
      page: 1,
      total_pages: 10,
      results: [
        {
          genre_ids: [28],
          poster_path: "/action_popular_movie.jpg",
          release_date: "2024-03-27",
          title: "Action Popular Movie",
          vote_average: 8.0,
          backdrop_path: "/action_popular_backdrop.jpg",
          id: undefined, 
          original_title: undefined, 
          overview: undefined 

        }
      ]
    };

    const mockGenresMap: Map<number, string> = new Map<number, string>([
      [28, 'Action']
    ]);

    const responseMovies = [
      {
        genres: ["Action"],
        poster: "/action_popular_movie.jpg",
        releaseYear: "2024-03-27",
        title: "Action Popular Movie",
        rating: 8.0,
        backdrop_path: "/action_popular_backdrop.jpg",
        id: undefined,
        original_title: undefined,
        overview: undefined,
        poster_path: "/action_popular_movie.jpg"
      }
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockMovies));

    return getMovies({ filters: { page: 1, genreId: 28, sortBy: 'popularity.desc' } }, mockGenresMap)
      .then(response => {
        expect(fetchMock).toHaveBeenCalledWith(
          `https://api.themoviedb.org/3/discover/movie?api_key=mock_api_key&page=1&with_genres=28&sort_by=popularity.desc`
        );
        expect(response.movies).toEqual(responseMovies);
        expect(response.metaData.pagination.currentPage).toBe(1);
        expect(response.metaData.pagination.totalPages).toBe(10);
      });
  });
});




