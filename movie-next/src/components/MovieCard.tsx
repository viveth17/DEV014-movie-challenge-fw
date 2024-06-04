import React, { useEffect, useState } from "react";
import Movie from "../models/Movie";
import { getImages } from "../services/APIService";

interface MovieCardProps {
    // definir una prop movie de tipo Movie
    movie: Movie;
}
export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {

    const [imagePath, setImagePath] = useState<string | null>(null);

    useEffect(() => {
        // Llamada a la función asincrónica para obtener la imagen
        getImages(movie.id)
            .then(filePath => {
                setImagePath(filePath);
            })
            .catch(error => {
                console.error('Error fetching image:', error);
            });
    }, [movie.id]);

    return (
        <div className="movie-card">
            <div className="image-container">
                <img src={`https://image.tmdb.org/t/p/w500${imagePath}`} alt={`${movie.title} poster`} className="image-card" />
                </div>
                <div className="container-infoMovie">
                <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-release-year">{movie.releaseYear}</p>
            </div>
        </div>
    );

}
