// import '@testing-library/jest-dom';
// import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
// import fetchMock from 'jest-fetch-mock';
// import Home from './Home';
// import { BrowserRouter as Router } from 'react-router-dom';
// import *  as APIService from '../services/APIService';
// import * as movieService from '../services/movieService';

// // Habilitar mocks para fetch
// fetchMock.enableMocks();

// describe('Home', () => {
//   beforeEach(() => {
//     fetchMock.resetMocks(); // Reiniciar mocks antes de cada prueba
//   });

//   it('debería manejar errores de la API y mostrar un mensaje de error', async () => {
//     fetchMock.mockRejectOnce(new Error('Failed to fetch'));

//     act(() => {
//       render(
//         <Router>
//           <Home />
//         </Router>
//       );
//     });
//     // Verificar que se muestre el spinner mientras se carga
//     expect(screen.queryAllByText('Loading...').length).toBeGreaterThan(0);

//     // Esperar a que la carga de datos termine
//     await waitFor(() => {
//       // Verificar que ya no se muestre el spinner
//       expect(screen.queryAllByText('Loading...').length).toBe(0);

//       // Verificar que se muestre el modal de error
//       expect(screen.getByText('An error occurred while fetching data from the API.')).toBeInTheDocument();

//       // Verificar que se renderice correctamente el error de la modal
//       expect(screen.getByText('An error occurred while fetching data from the API.')).toBeInTheDocument();
//     });
//   });

//   it('debería mostrar el spinner de carga cuando isLoading es true', async () => {
//     render(
//       <Router>
//         <Home />
//       </Router>
//     );

//     // Verificar que se muestre el spinner mientras se carga
//     expect(screen.queryAllByText('Loading...').length).toBeGreaterThan(0);

//     // Esperar a que el componente termine de cargar
//     await waitFor(() => {
//       expect(screen.queryAllByText('Loading...').length).toBe(0); // Spinner ya no debería estar presente
//     });
//   });

//   it('debería actualizar la URL al seleccionar un género y ordenar por opción', async () => {


//     // Mockear las funciones y servicios necesarios
//     // jest.mock('../services/APIService', () => ({
//     //   getMovies: jest.fn().mockResolvedValue({
//     //     movies: [
//     //       {
//     //         genres: [
//     //           "Science Fiction",
//     //           "Adventure",
//     //           "Action"
//     //         ],
//     //         genre_ids: [878, 28, 12],
//     //         poster_path: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
//     //         release_date: "2024-03-27",
//     //         title: "Godzilla x Kong: The New Empire",
//     //         vote_average: 7.261,
//     //         backdrop_path: "/some_backdrop_path.jpg",
//     //         id: 653346,
//     //         original_title: "Godzilla vs Kong Original Title",
//     //         overview: "This is an overview.",
//     //         releaseYear: "2024-03-27",
//     //       }
//     //     ],
//     //     metaData: {
//     //       pagination: {
//     //         totalPages: 1,
//     //       },
//     //     },
//     //   }),
//     // }));

//     // jest.mock('../services/movieService', () => ({
//     //   getMovieGenres: jest.fn().mockResolvedValue([]),
//     // }));

//     // Mock de getMovies
// jest.mock('../services/APIService', () => ({
//   getMovies: jest.fn().mockResolvedValue({
//     movies: [
//       {
//         genres: ["Science Fiction", "Adventure", "Action"],
//         genre_ids: [878, 28, 12],
//         poster_path: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
//         release_date: "2024-03-27",
//         title: "Godzilla x Kong: The New Empire",
//         vote_average: 7.261,
//         backdrop_path: "/some_backdrop_path.jpg",
//         id: 653346,
//         original_title: "Godzilla vs Kong Original Title",
//         overview: "This is an overview.",
//         releaseYear: "2024-03-27",
//       }
//     ],
//     metaData: {
//       pagination: {
//         totalPages: 1,
//       },
//     },
//   }),
// }));

// // Mock de getMovieGenres
// jest.mock('../services/movieService', () => ({
//   getMovieGenres: jest.fn().mockResolvedValue([
//     { id: 28, name: 'Action' },
//     { id: 12, name: 'Adventure' },
//     { id: 878, name: 'Science Fiction' },
//   ]),
// }));


//     // render(
//     //   <Router>
//     //     <Home />
//     //   </Router>
//     // );

//     // await waitFor(() => {
//     //   // Seleccionar opción de género
//     //   fireEvent.change(screen.getByLabelText('Filtrar por género:'), { target: { value: '28' } });

//     //   // Verificar que la URL se actualizó correctamente con el parámetro de género
//     //   expect(window.location.search).toContain('genreId=28');

//     //   // Seleccionar opción de ordenamiento
//     //   fireEvent.change(screen.getByLabelText('Ordenar por:'), { target: { value: 'popularity.desc' } });

//     //   // Verificar que la URL se actualizó correctamente con el parámetro de ordenamiento
//     //   expect(window.location.search).toContain('sortBy=popularity.desc');
//     // });

//     // Esperar a que los géneros se carguen
//     await waitFor(() => expect(movieService.getMovieGenres).toHaveBeenCalled());

//     // Seleccionar opción de género
//     fireEvent.change(screen.getByLabelText('Filtrar por género:'), { target: { value: '28' } });

//     // Verificar que la URL se actualizó correctamente con el parámetro de género
//     await waitFor(() => {
//       expect(window.location.search).toContain('genreId=28');
//     });

//     // Seleccionar opción de ordenamiento
//     fireEvent.change(screen.getByLabelText('Ordenar por:'), { target: { value: 'popularity.desc' } });

//     // Verificar que la URL se actualizó correctamente con el parámetro de ordenamiento
//     await waitFor(() => {
//       expect(window.location.search).toContain('sortBy=popularity.desc');
//     });

//   });




//   // it('debería mostrar las películas cuando los datos se obtienen exitosamente', async () => {

//   //   const mockMovies = {
//   //     page: 1,
//   //     total_pages: 10,
//   //     results: [
//   //       {
//   //         genre_ids: [878, 28, 12],
//   //         poster_path: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
//   //         release_date: "2024-03-27",
//   //         title: "Godzilla x Kong: The New Empire",
//   //         vote_average: 7.261,
//   //         backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
//   //         id: 929590

//   //       }
//   //     ]
//   //   };
//   //   fetchMock.mockResponseOnce(JSON.stringify(mockMovies));

//   //   act(() => {
//   //     render(
//   //       <Router>
//   //         <Home />
//   //       </Router>
//   //     );
//   //   });
//   //   // Verificar que se muestre el spinner mientras se carga
//   //   expect(screen.queryAllByText('Loading...').length).toBeGreaterThan(0);

//   //   // Esperar a que la carga de datos termine
//   //   await waitFor(() => {
//   //     // Verificar que ya no se muestre el spinner
//   //     expect(screen.queryAllByText('Loading...').length).toBe(0);

//   //     // Verificar que se renderice correctamente la lista de películas
//   //     expect(screen.getByText('Godzilla x Kong: The New Empire')).toBeInTheDocument();

//   //   });
//   // });



//   // it('debería manejar clics en los botones de paginación', async () => {
//   //   const mockMoviesPage1 = {
//   //     page: 1,
//   //     total_pages: 2,
//   //     results: [
//   //       {
//   //         genre_ids: [878, 28, 12],
//   //         poster_path: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
//   //         release_date: "2024-03-27",
//   //         title: "Godzilla x Kong: The New Empire",
//   //         vote_average: 7.261,
//   //         backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
//   //         id: 929590
//   //       }
//   //     ]
//   //   };
//   //   const mockMoviesPage2 = {
//   //     page: 2,
//   //     total_pages: 2,
//   //     results: [
//   //       {
//   //         genre_ids: [12, 16, 35],
//   //         poster_path: "/aN7Pr0UrqY5VwGZ7rF7mWzBLpkB.jpg",
//   //         release_date: "2024-03-28",
//   //         title: "Spider-Man: No Way Home",
//   //         vote_average: 8.5,
//   //         backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
//   //         id: 634649
//   //       }
//   //     ]
//   //   };

//   //   fetchMock.mockResponses(
//   //     [JSON.stringify(mockMoviesPage1), { status: 200 }],
//   //     [JSON.stringify(mockMoviesPage2), { status: 200 }]
//   //   );

//   //   act(() => {
//   //     render(
//   //       <Router>
//   //         <Home />
//   //       </Router>
//   //     );
//   //   });

//   //   // Esperar a que la carga de datos termine para la primera página
//   //   await waitFor(() => {
//   //     expect(screen.getByText('Godzilla x Kong: The New Empire')).toBeInTheDocument();
//   //   });

//   //   // Simular clic en el botón de la segunda página
//   //   fireEvent.click(screen.getByRole('button', { name: /2/i }));

//   //   // Esperar a que la carga de datos termine para la segunda página
//   //   await waitFor(() => {
//   //     expect(screen.getByText('Spider-Man: No Way Home')).toBeInTheDocument();
//   //   });
//   // });

//   // it('debería cambiar los parámetros de URL cuando se cambia la página', async () => {
//   //   const mockMovies = {
//   //     page: 1,
//   //     total_pages: 2,
//   //     results: [
//   //       {
//   //         genre_ids: [878, 28, 12],
//   //         poster_path: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
//   //         release_date: "2024-03-27",
//   //         title: "Godzilla x Kong: The New Empire",
//   //         vote_average: 7.261,
//   //         backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
//   //         id: 929590
//   //       }
//   //     ]
//   //   };

//   //   fetchMock.mockResponse(JSON.stringify(mockMovies));

//   //   const { getByRole } = render(
//   //     <Router>
//   //       <Home />
//   //     </Router>
//   //   );

//   //   await waitFor(() => {
//   //     expect(screen.getByText('Godzilla x Kong: The New Empire')).toBeInTheDocument();
//   //   });

//   //   const page2Button = getByRole('button', { name: /2/i });
//   //   fireEvent.click(page2Button);

//   //   expect(window.location.search).toBe('?page=2');
//   // });
// });














// // import React from 'react';
// // import '@testing-library/jest-dom';
// // import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
// // import { BrowserRouter as Router } from 'react-router-dom';
// // import Home from './Home';

// // // Mockear las funciones y servicios necesarios
// // jest.mock('../services/APIService', () => ({
// //   getMovies: jest.fn().mockResolvedValue({
// //     movies: [],
// //     metaData: {
// //       pagination: {
// //         totalPages: 1,
// //       },
// //     },
// //   }),
// // }));

// // jest.mock('../services/movieService', () => ({
// //   getMovieGenres: jest.fn().mockResolvedValue([]),
// // }));

// // describe('Home Component', () => {
//   // it('debería mostrar el spinner de carga cuando isLoading es true', async () => {
//   //   render(
//   //     <Router>
//   //       <Home />
//   //     </Router>
//   //   );

//   //   // Verificar que se muestre el spinner mientras se carga
//   //   expect(screen.queryAllByText('Loading...').length).toBeGreaterThan(0);

//   //   // Esperar a que el componente termine de cargar
//   //   await waitFor(() => {
//   //     expect(screen.queryAllByText('Loading...').length).toBe(0); // Spinner ya no debería estar presente
//   //   });
//   // });

// //   // it('debería actualizar la URL al cambiar de página', () => {
// //   //   const { container } = render(
// //   //     <Router>
// //   //       <Home />
// //   //     </Router>
// //   //   );

// //   //   // Obtener el input de búsqueda por página
// //   //   const pageInput = container.querySelector('input[name="page"]');
// //   //   expect(pageInput).toBeInTheDocument();

// //   //   // Cambiar el valor del input de página a 2
// //   //   fireEvent.change(pageInput!, { target: { value: '2' } });

// //   //   // Verificar que la URL se actualizó correctamente
// //   //   expect(window.location.search).toContain('page=2');
// //   // });

//   // it('debería actualizar la URL al seleccionar un género y ordenar por opción', () => {
//   //   render(
//   //     <Router>
//   //       <Home />
//   //     </Router>
//   //   );

//   //   // Seleccionar opción de género
//   //   fireEvent.change(screen.getByLabelText('Filtrar por género:'), { target: { value: '28' } });

//   //   // Verificar que la URL se actualizó correctamente con el parámetro de género
//   //   expect(window.location.search).toContain('genreId=28');

//   //   // Seleccionar opción de ordenamiento
//   //   fireEvent.change(screen.getByLabelText('Ordenar por:'), { target: { value: 'popularity.desc' } });

//   //   // Verificar que la URL se actualizó correctamente con el parámetro de ordenamiento
//   //   expect(window.location.search).toContain('sortBy=popularity.desc');
//   // });
// // });




// import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event'
// import { MemoryRouter } from 'react-router-dom';
// import Home from './Home';
// import '@testing-library/jest-dom';
// import * as movieService from '../services/movieService';

// // Mock de getMoviesGenres 
// jest.mock('../services/movieService', () => ({
//   getMovieGenres: jest.fn().mockResolvedValue([
//     { id: 28, name: 'Action' },
//     { id: 12, name: 'Adventure' },
//     { id: 878, name: 'Science Fiction' },
//   ]),
// }));

// describe('Home Component', () => {
//   it('debería actualizar la URL al seleccionar un género y ordenar por opción', async () => {
//     // Renderizar el componente Home dentro del MemoryRouter 
//     render(
//       <MemoryRouter initialEntries={['/']}>
//         <Home />
//       </MemoryRouter>
//     );

//     // Esperar a que los géneros se carguen
//     await waitFor(() => expect(movieService.getMovieGenres).toHaveBeenCalled());

//     // Seleccionar opción de género
//     const genreSelectContainer = screen.getByText("Filtrar por género:").closest('.selectContainer');
//     if (genreSelectContainer) {
//       const genreSelect = genreSelectContainer.querySelector('select');
//       if (genreSelect) {
//         userEvent.selectOptions(genreSelect, "Action");
//         console.log("window.location.search después de seleccionar género:", window.location.search);
//       }
//     }

//     // Verificar que la URL se actualizó correctamente con el parámetro de género
//     await waitFor(() => {
//       expect(window.location.search).toContain("genreId=28");
//     });

//     // Seleccionar opción de ordenamiento
//     const sortSelectContainer = screen.getByText('Ordenar por:').closest('.selectContainer');
//     if (sortSelectContainer) {
//       const sortSelect = sortSelectContainer.querySelector('select');
//       if (sortSelect) {
//         fireEvent.mouseDown(sortSelect);
//         fireEvent.change(sortSelect, { target: { value: 'popularity.desc' } });
//         console.log("window.location.search después de seleccionar ordenamiento:", window.location.search);
//       }
//     }
//     // Verificar que la URL se actualizó correctamente con el parámetro de ordenamiento
//     await waitFor(() => {
//       expect(window.location.search).toContain('sortBy=popularity.desc');
//     });
//   });
// });

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './Home';

test('debería actualizar la URL al seleccionar un género y ordenar por opción', async () => {
  render(
    <Router>
      <Home />
    </Router>
  );

  // Espera explícita hasta que el componente Home se renderice completamente
  await waitFor(() => {
    expect(screen.getByText(/Filtrar por género:/i)).toBeInTheDocument();
  });

  // Seleccionar una opción de género y ordenar por opción
  const selectGenre = screen.getByLabelText('Filtrar por género:');
  userEvent.selectOptions(selectGenre, 'Action');

  const selectSortBy = screen.getByLabelText('Ordenar por:');
  userEvent.selectOptions(selectSortBy, 'Popularidad descendente');

  // Asegurar que la URL se actualice después de las selecciones
  await waitFor(() => {
    expect(window.location.pathname).toMatch(/\/movies\?genre=Action&sortBy=popularity.desc/);
  });

  // Aquí puedes realizar más aserciones según sea necesario
});



