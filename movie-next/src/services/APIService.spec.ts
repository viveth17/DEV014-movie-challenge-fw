
import { getMovies } from "./APIService";
import fetchMock from 'jest-fetch-mock';


fetchMock.enableMocks();
 

describe('getMovies', () => {

  //Limpiar el mock antes de cada prueba (Restauración de los mocks, un test no afecte a los demas test)
 
  beforeEach(() => {
    fetchMock.resetMocks();
  });


  it('Debería devolver una lista de peliculas', () => {  // Primer caso de la prueba 
    // Simular la respuesta de la API 
    const mockMovies = [
      {
        genre_ids: [878, 28, 12],
        poster_path: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
        release_date: "2024-03-27",
        title: "Godzilla x Kong: The New Empire",
        vote_average: 7.261,
        backdrop_path : "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg"
        
      }
    ];
    const responseMovies = [
      {
        genre: [878, 28, 12],
        poster: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
        releaseYear: "2024-03-27",
        title: "Godzilla x Kong: The New Empire",
        rating: 7.261,
        backdrop_path : "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg"
      }
    ];
    fetchMock.mockResponseOnce(JSON.stringify(mockMovies));

    return getMovies()
    .then( response =>{
      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/discover/movie?api_key=mock_api_key'
      );
      expect(response).toEqual(responseMovies);
    });
  });
  it('debería manejar errores de red correctamente', () => {

    fetchMock.mockRejectOnce(new Error('Failed to fetch'));


    return expect(getMovies()).rejects.toThrow('Failed to fetch');
  });

  it('debería lanzar un error si la solicitud no es exitosa', () => {

    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 404, statusText: 'Not Found' });


    return expect(getMovies()).rejects.toThrow('Network response was not ok');
  });


 







});




