import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Movie from '../models/Movie';
import { getMovieDetail } from '../services/movieService';
import styles from '../styles/MovieDetail.module.css';
import { FaArrowLeft, FaStar } from 'react-icons/fa'; //  icono de flecha y estrella

const MovieDetail: React.FC= () => {

    const {id} = useParams<{id: string}>(); // para obtener el "id" de la url dinámicamente 
    const navigate = useNavigate(); //Hook para la navegación

    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                setLoading(true);
                const movieDetail = await getMovieDetail(parseInt(id));
                setMovie(movieDetail);
                setLoading(false);
            } catch (error) {
                setError(error.message || 'Error fetching movie detail');
                setLoading(false);
            }
        };

        fetchMovieDetail();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!movie) return <div>No movie details available</div>;

    const releaseYear = movie.releaseYear ? new Date(movie.releaseYear).getFullYear() : "Fecha de estreno no disponible";
    const genres = movie.genres.join(", ");

    return (
        <><div className='back-list'>
            <div className={styles['back-button']} onClick={() => navigate(-1)}>
                <FaArrowLeft className={styles['back-icon']} /> Regresar al listado
            </div>
        </div><div className={styles['movie-detail']}>
                {/* <button className={styles['back-button']} onClick={() => navigate(-1)}>
        <FaArrowLeft className={styles['back-icon']} /> Regresar al listado
    </button> */}
                <div className={styles['poster-container']}>
                    {movie.poster_path ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                            alt={`${movie.title || "No title available"} poster`}
                            className={styles['poster-image']} />
                    ) : (
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                            alt="No poster available"
                            className={styles['poster-image']} />
                    )}
                </div>
                <div className={styles['details-container']}>
                    {/* <h2 className={styles['movie-title']}>{movie.title || "No title available"}</h2> */}
                    <h2 className={styles['original-title']}>{movie.original_title || "Título original no disponible"}({releaseYear}) </h2>
                    <p className={styles['rating']}><FaStar className={styles['star-icon']} />{movie.rating}/10</p>
                    <p className={styles['genres']}>Géneros: {genres}</p>
                    <p className={styles['synopsis']}>Sinópsis: {movie.overview || "Sinopsis no disponible"}</p>
                    {/* <p className={styles['rating']}><FaStar className={styles['star-icon']} />{movie.rating}/10</p> */}
                    {/* <p className={styles['release-year']}>Año de lanzamiento: {releaseYear}</p> */}
                    {/* <p className={styles['genres']}>Géneros: {genres}</p> */}
                </div>
            </div></>
    );
};

export default MovieDetail;

