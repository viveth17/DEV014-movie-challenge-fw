// import '@testing-library/jest-dom/extend-expect';
import { render, screen } from "@testing-library/react";
import  { MovieCard }  from "./MovieCard.tsx"; // importamos el componente a probar 
import Movie from "../models/Movie";
import React from "react";


const movieData : Movie = {
    title: "Godzilla x Kong: The New Empire",             
    releaseYear: "2024-03-27",
    backdrop_path : "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
    genre: [
        878,
        12,
        28
    ],
    id: 653346,
    poster: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    rating: 6.933
};

const incompleteMovieDataWithoutTitle: Movie = {
    title: "", // Simulando que le falta el titulo
    releaseYear: "2024-03-27",
    backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
    genre: [
        878,
        12,
        28
    ],
    id: 653346,
    poster: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    rating: 6.933
};


const incompleteMovieDataWithoutYear: Movie = {
    title: "Godzilla x Kong: The New Empire",
    releaseYear: "", // Simulando que le hace falta el año de estreno
    backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
    genre: [
        878,
        12,
        28
    ],
    id: 653346,
    poster: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    rating: 6.933
};


const emptyMovieData: Movie = {
    title: "",
    releaseYear: "",
    backdrop_path: "",
    genre: [],
    id: 0,
    poster: "",
    rating: 0
};


describe('MovieCard', () => {
    it('debería renderizar correctamente con datos de película', () => {
        render( React.createElement(MovieCard, {movie:  movieData }) );
        
        // Verificamos que el título y el año de estreno estén presentes
        expect(screen.getByAltText(/Godzilla x Kong: The New Empire/i)).toBeTruthy();
        expect(screen.getByText('2024-03-27')).toBeTruthy();
        
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
        expect(screen.getByText(/Release year not available/i)).toBeTruthy();
    });

    it('debería renderizar mensajes por defecto y una imagen de reemplazo si todos los datos están vacíos', () => {
        render(React.createElement (MovieCard, { movie: emptyMovieData} ));
        
        // Verificamos los mensajes por defecto y la imagen de reemplazo
        expect(screen.getByText(/No title available/i)).toBeTruthy();
        expect(screen.getByText(/Release year not available/i)).toBeTruthy();
        expect(screen.getByAltText(/No image available/i)).toBeTruthy();
    });

}); 