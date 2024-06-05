import Movie from "../models/Movie";
import { MovieCard } from "./MovieCard";
import React from "react";

//Definir una prop llamada movies de tipo Movie [] que represente un array de modelos de negocios de películas
interface MovieListProps {
    movies: Movie[];
}
const MovieList: React.FC<MovieListProps> = ({ movies }) => {
    return (
        <div>
        <h2></h2>
        <div className="movie-list">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    </div>
);
};

export default MovieList;