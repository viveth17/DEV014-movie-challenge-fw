// import '@testing-library/jest-dom/extend-expect';
import { render, screen } from "@testing-library/react";
import  { MovieCard }  from "./MovieCard.tsx"; // importamos el componente a probar 
import Movie from "../models/Movie";
import React from "react";

//Datos de película son géneros
const movieData : Movie = {
    title: "Godzilla x Kong: The New Empire",             
    releaseYear: "2024-03-27",
    backdrop_path : "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
    genres: [
        "Science Fiction",
        "Adventure",
        "Action"
    ],
    id: 653346,
    poster: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    rating: 6.933
};

//Datos de la película sin géneros
const movieDataWithoutGenres: Movie = {
    title: "Godzilla x Kong: The New Empire",
    poster: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    releaseYear: "2024-03-27",
    backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
    genres: [],
    id: 653346,
    rating: 6.933
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
    rating: 6.933
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
    rating: 6.933
};

//Datos de película vacíos 
const emptyMovieData: Movie = {
    title: "",
    releaseYear: "",
    backdrop_path: "",
    genres: [],
    id: 0,
    poster: "",
    rating: 0
};


describe('MovieCard', () => {
    it('debería renderizar correctamente con datos de película', () => {
        render( React.createElement(MovieCard, {movie:  movieData }) );
        
        // Verificamos que el título y el año de estreno estén presentes
        expect(screen.getByAltText(/Godzilla x Kong: The New Empire/i)).toBeTruthy();
        expect(screen.getByText('2024')).toBeTruthy();
        
        // Verificamos que la imagen de fondo esté presente y tenga la ruta correcta
        const imageElement = screen.getByAltText(/Godzilla x Kong: The New Empire/i);
        expect(imageElement).toBeTruthy();
        expect(imageElement.getAttribute('src')).toBe('https://image.tmdb.org/t/p/w500/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg');
    });

    it('debería renderizar un mensaje por defecto si falta el título', () => {
        render(React.createElement (MovieCard, {movie: incompleteMovieDataWithoutTitle} ));
        
        // Verificamos el mensaje por defecto cuando falta el título
        expect(screen.getByText(/No title available/i)).toBeTruthy();
    });

    it('debería renderizar un mensaje por defecto si falta el año de estreno', () => {
        render(React.createElement (MovieCard, {movie: incompleteMovieDataWithoutYear} ));
        
        // Verificamos el mensaje por defecto cuando falta el año de estreno
        expect(screen.getByText(/Fecha de estreno no disponible/i)).toBeTruthy();
    });

    it('debería renderizar mensajes por defecto y una imagen de reemplazo si todos los datos están vacíos', () => {
        render(React.createElement (MovieCard, { movie: emptyMovieData} ));
        
        // Verificamos los mensajes por defecto y la imagen de reemplazo
        expect(screen.getByText(/No title available/i)).toBeTruthy();
        expect(screen.getByText(/Fecha de estreno no disponible/i)).toBeTruthy();
        expect(screen.getByAltText(/No image available/i)).toBeTruthy();
    });

    it ('debería renderizar correctamente los géneros de la película', () => {
        render (React.createElement (MovieCard, { movie:  movieData } ));

        //Verificamos que los géneros esten presentes 
        expect(screen.getByText(/Science Fiction/i)).toBeTruthy();
        expect(screen.getByText(/Adventure/i)).toBeTruthy();
        expect(screen.getByText(/Action/i)).toBeTruthy();
    });

    it('debería renderizar un mensaje por defecto si no hay géneros disponibles', () => {
        render (React.createElement (MovieCard, { movie:  movieDataWithoutGenres } ));
        //verificamos el mensaje por defecto cuando no hay géneros
        expect(screen.getByText(/Géneros no disponibles/i)).toBeTruthy();
    });

}); 