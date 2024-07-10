import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Movie from '../models/Movie';
import { getMovieDetail } from '../services/movieService';
import styles from '../styles/MovieDetail.module.css';
import { FaArrowLeft, FaStar } from 'react-icons/fa'; //  icono de flecha y estrella
import { Spinner } from 'reactstrap';

const MovieDetail: React.FC = () => {

    const { id } = useParams<{ id: string }>(); 
    const navigate = useNavigate(); 

    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                setLoading(true);
                const movieDetail = await getMovieDetail(parseInt(id ?? '0'));
                setMovie(movieDetail);
                setLoading(false);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                setError(error.message || 'Error fetching movie detail');
                setLoading(false);
            }
        };

        fetchMovieDetail();
    }, [id]);

    if (loading) return  <div className={styles.spinner}><Spinner/><p className={styles.loading}>Loading...</p></div>;
    if (error) return <div>Error: {error}</div>;
    if (!movie) return <div>No movie details available</div>;

    const releaseYear = movie.releaseYear ? new Date(movie.releaseYear).getFullYear() : "Fecha de estreno no disponible";

    return (
        <><div className='back-list'>
            <div className={styles['back-button']} onClick={() => navigate(-1)}>
                <FaArrowLeft className={styles['back-icon']} /> Regresar al listado
            </div>
        </div><div className={styles['movie-detail']}>
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
                    <h2 className={styles['original-title']}>{movie.original_title || "Título original no disponible"}({releaseYear})</h2>
                    <p className={styles['rating']}><FaStar className={styles['star-icon']} />{movie.rating}/10</p>
                    <p className={styles['genres']}><span className={styles['title-genres']}>Géneros: </span>{movie.genres?.join(", ")}</p>
                    <div className={styles['synopsis']}>
                        <p className={styles['title-synopsis']}>Sinópsis:</p>
                        <p> {movie.overview || "Sinópsis no disponible"}</p>
                    </div>
                </div>
            </div></>
    );
};

export default MovieDetail;

