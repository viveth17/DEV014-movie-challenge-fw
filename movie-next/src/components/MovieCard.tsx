import Movie from "../models/Movie";
import React from "react";

interface MovieCardProps {
    // definir una prop movie de tipo Movie
    movie: Movie;
}
export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {

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
                <p className="movie-release-year">{movie.releaseYear || "Release year not available"}</p>
            </div>
        </div>
    );

};


// function MovieCard({movie} : {movie:Movie}) {
//     return (
//         <div className="movie-card">
//             <div className="image-container">
//                 <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={`${movie.title} poster`} className="image-card" />
//             </div>
//             <div className="container-infoMovie">
//                 <h2 className="movie-title">{movie.title}</h2>
//                 <p className="movie-release-year">{movie.releaseYear}</p>
//             </div>
//         </div>
//     );
// }

export default MovieCard;