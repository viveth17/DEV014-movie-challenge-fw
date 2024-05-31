import React from "react";
import Movie from "../models/Movie";

interface MovieCardProps {
    // definir una prop movie de tipo Movie
    movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <div className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster}`} alt={`$movie.title} poster `} className="image-card"/>
            <h2 className="movie-title"> {movie.title}</h2>
            <p className="movie-release-year"> {movie.releaseYear}</p>
        </div>
    )
}