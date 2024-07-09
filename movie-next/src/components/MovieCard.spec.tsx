// import '@testing-library/jest-dom/extend-expect';
import {fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { MovieCard } from "./MovieCard.tsx"; // importamos el componente a probar 
import Movie from "../models/Movie";
import '@testing-library/jest-dom';
import MovieDetail from "./MovieDetail.tsx";

// Mock de fetch
beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          genres: [
            "Science Fiction",
            "Adventure",
            "Action"
          ],
          genre_ids: [878, 28, 12],
          poster_path: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
          release_date: "2024-03-27",
          title: "Godzilla x Kong: The New Empire",
          vote_average: 7.261,
          backdrop_path: "/some_backdrop_path.jpg",
          id: 653346,
          original_title: "Godzilla vs Kong Original Title",
          overview: "This is an overview.",
          releaseYear: "2024-03-27",
        }),
      })
    ) as jest.Mock;
});

//Datos de película son géneros
const movieData: Movie = {
    title: "Godzilla x Kong: The New Empire",
    releaseYear: "2024-03-27",
    backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
    genres: [
        "Science Fiction",
        "Adventure",
        "Action"
    ],
    id: 653346,
    poster: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    rating: 6.933,
    poster_path: "",
    original_title: "",
    overview: ""
};

//Datos de la película sin géneros
const movieDataWithoutGenres: Movie = {
    title: "Godzilla x Kong: The New Empire",
    poster: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    releaseYear: "2024-03-27",
    backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
    genres: [],
    id: 653346,
    rating: 6.933,
    poster_path: "",
    original_title: "",
    overview: ""
};
//Datos de película sin título
const incompleteMovieDataWithoutTitle: Movie = {
    title: "", // Simulando que le falta el titulo
    releaseYear: "2024-03-27",
    backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
    genres: [
        "Science Fiction",
        "Adventure",
        "Action"
    ],
    id: 653346,
    poster: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    rating: 6.933,
    poster_path: "",
    original_title: "",
    overview: ""
};

//Datos de película sin año de estreno 
const incompleteMovieDataWithoutYear: Movie = {
    title: "Godzilla x Kong: The New Empire",
    releaseYear: "", // Simulando que le hace falta el año de estreno
    backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
    genres: [
        "Science Fiction",
        "Adventure",
        "Action"
    ],
    id: 653346,
    poster: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    rating: 6.933,
    poster_path: "",
    original_title: "",
    overview: ""
};

//Datos de película vacíos 
const emptyMovieData: Movie = {
    title: "",
    releaseYear: "",
    backdrop_path: "",
    genres: [],
    id: 0,
    poster: "",
    rating: 0,
    poster_path: "",
    original_title: "",
    overview: ""
};


describe('MovieCard', () => {

    it('debería renderizar correctamente con datos de película', () => {
        render(
            <Router>
                <MovieCard movie={movieData} />
            </Router>
        );

        // Verificamos que el título y el año de estreno estén presentes
        expect(screen.getByAltText(/Godzilla x Kong: The New Empire/i)).toBeInTheDocument();
        expect(screen.getByText('2024')).toBeInTheDocument();

        // Verificamos que la imagen de fondo esté presente y tenga la ruta correcta
        const imageElement = screen.getByAltText(/Godzilla x Kong: The New Empire/i);
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg');
    });

    it('debería renderizar un mensaje por defecto si falta el título', () => {
        render(
            <Router>
                <MovieCard movie={incompleteMovieDataWithoutTitle} />
            </Router>
        );

        // Verificamos el mensaje por defecto cuando falta el título
        expect(screen.getByText(/No title available/i)).toBeInTheDocument();
    });


    it('debería renderizar un mensaje por defecto si falta el año de estreno', () => {
        render(
            <Router>
                <MovieCard movie={incompleteMovieDataWithoutYear} />
            </Router>
        );

        // Verificamos el mensaje por defecto cuando falta el año de estreno
        expect(screen.getByText(/Fecha de estreno no disponible/i)).toBeInTheDocument();
    });

    it('debería renderizar mensajes por defecto y una imagen de reemplazo si todos los datos están vacíos', () => {
        render(
            <Router>
                <MovieCard movie={emptyMovieData} />
            </Router>
        );

        // Verificamos los mensajes por defecto y la imagen de reemplazo
        expect(screen.getByText(/No title available/i)).toBeInTheDocument();
        expect(screen.getByText(/Fecha de estreno no disponible/i)).toBeInTheDocument();
        expect(screen.getByAltText(/No image available/i)).toBeInTheDocument();
    });

    it('debería renderizar correctamente los géneros de la película', () => {
        render(
            <Router>
                <MovieCard movie={movieData} />
            </Router>
        );

        //Verificamos que los géneros esten presentes 
        expect(screen.getByText(/Science Fiction/i)).toBeInTheDocument();
        expect(screen.getByText(/Adventure/i)).toBeInTheDocument();
        expect(screen.getByText(/Action/i)).toBeInTheDocument();
    });

    it('debería renderizar un mensaje por defecto si no hay géneros disponibles', () => {
        render(
            <Router>
                <MovieCard movie={movieDataWithoutGenres} />
            </Router>
        );
        //verificamos el mensaje por defecto cuando no hay géneros
        expect(screen.getByText(/Géneros no disponibles/i)).toBeInTheDocument();
    });

    it('should navigate to MovieDetail on click', async () => {
        render(
          <Router>
            <Routes>s
              <Route path="/" element={<MovieCard movie={movieData} />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
            </Routes>
          </Router>
        );
    
        const movieCard = screen.getByText('Godzilla x Kong: The New Empire');
        fireEvent.click(movieCard);
    
        // Usa waitFor para esperar la actualización del estado y la navegación
        await waitFor(() => {
            expect(screen.getByText((content) => {
                return content.includes('Godzilla vs Kong Original Title') && content.includes('2024');
              })).toBeInTheDocument();
        });
      });

}); 