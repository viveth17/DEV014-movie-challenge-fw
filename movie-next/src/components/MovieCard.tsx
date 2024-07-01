import Movie from "../models/Movie";
import React from "react";

interface MovieCardProps {
    // definir una prop movie de tipo Movie
    movie: Movie;
}
export const MovieCard: React.FC<MovieCardProps> = ({ movie}) => {
    //Extraer el año de la fecha de estreno
    const releaseYear = movie.releaseYear ? new Date(movie.releaseYear).getFullYear() : "Fecha de estreno no disponible";

     // Verificar los géneros disponibles
     console.log("Generos disponibles:", movie.genres);

     // Construir la cadena de géneros separados por comas
    const genres = movie.genres?.join(", ") || "Géneros no disponibles";

    
    return (
        <div className="movie-card">
            <div className="image-container">
                {movie.backdrop_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                        alt={`${movie.title || "No title available"} poster`}
                        className="image-card"
                    />
                ) : (
                    <img
                        src="/default-image.jpg"
                        alt="No image available"
                        className="image-card"
                    />
                )}
            </div>
            <div className="container-infoMovie">
                <h2 className="movie-title">{movie.title || "No title available"}</h2>
                <p className="movie-release-year">{releaseYear}</p>
                <p className="movie-genres">{genres}</p>
            </div>
        </div>
    );

};

export default MovieCard;