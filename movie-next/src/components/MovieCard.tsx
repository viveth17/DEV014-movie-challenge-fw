import Movie from "../models/Movie";

interface MovieCardProps {
    // definir una prop movie de tipo Movie
    movie: Movie;
}
export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {

    return (
        <div className="movie-card">
            <div className="image-container">
                <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={`${movie.title} poster`} className="image-card" />
            </div>
            <div className="container-infoMovie">
                <h2 className="movie-title">{movie.title}</h2>
                <p className="movie-release-year">{movie.releaseYear}</p>
            </div>
        </div>
    );

}


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