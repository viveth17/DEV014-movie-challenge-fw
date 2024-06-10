
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
}); 