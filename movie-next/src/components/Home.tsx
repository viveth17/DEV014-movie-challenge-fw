import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from './MovieList';
import Movie from '../models/Movie';
import { getMovies } from '../services/APIService';
import { getMovieGenres } from '../services/movieService';
import { formatGenresToMap, formatGenresToOptions } from '../utils/transformers';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, Modal, ModalHeader, ModalBody, ModalFooter, Button, Fade } from 'reactstrap';
import PaginationComponent from './Pagination';
import ListOptions from '../components/ListOptions';
import styles from '../styles/Home.module.css';
import appStyles from '../styles/App.module.css';

const Home: React.FC = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState(false);
  const [, setFilters] = useState<{ genreId: string | null; sortBy: string | null }>({ genreId: null, sortBy: null });
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [genresMap, setGenresMap] = useState<Map<number, string>>(new Map());
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const genreId = searchParams.get('genreId');
    const sortBy = searchParams.get('sortBy');
    setFilters({ genreId, sortBy });
    setSelectedGenre(genreId ? parseInt(genreId) : null);
    setSortBy(sortBy);
  }, [searchParams]);

  useEffect(() => {
    const fetchMovies = async (page: number, genreId: number | null, sortBy: string | null) => {
      try {
        setIsLoading(true);
        const genres = await getMovieGenres();
        const genresMap = formatGenresToMap(genres);
        setGenresMap(genresMap);
        const response = await getMovies({ filters: { page, genreId, sortBy } }, genresMap);
        setMovies(response.movies);
        setTotalPages(response.metaData.pagination.totalPages);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(true);
        setErrorMessage('An error occurred while fetching data from the API.');
        setShowModal(true);
      }
    };

    fetchMovies(currentPage, selectedGenre, sortBy);
  }, [currentPage, selectedGenre, sortBy]);

  const handlePageChange = (page: number) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('page', page.toString());
      return newParams;
    });
  };

  const handleGenreChange = (option: { value: string; label: string } | null) => {
    const genreId = option ? parseInt(option.value) : null;
    setSelectedGenre(genreId);
    console.log("hasChange");
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      if (genreId !== null) {
        newParams.set('genreId', genreId.toString());
      } else {
        newParams.delete('genreId');
      }
      return newParams;
    });
  };

  const handleSortChange = (option: { value: string; label: string } | null) => {
    const sortByValue = option ? option.value : null;
    setSortBy(sortByValue);
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      if (sortByValue) {
        newParams.set('sortBy', sortByValue);
      } else {
        newParams.delete('sortBy');
      }
      return newParams;
    });
  };

  const handleClearGenre = () => {
    setSelectedGenre(null);
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.delete('genreId');
      return newParams;
    });
  };

  const handleClearSort = () => {
    setSortBy(null);
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.delete('sortBy');
      return newParams;
    });
  };

  const genreArray = Array.from(genresMap, ([id, name]) => ({ id, name }));
  const genreOptions = formatGenresToOptions(genreArray);

  const sortOptions = [
    { value: 'popularity.desc', label: 'Más popular Desc' },
    { value: 'popularity.asc', label: 'Más popular Asc' },
    { value: 'release_date.desc', label: 'Más reciente Desc' },
    { value: 'release_date.asc', label: 'Más reciente Asc' },
    { value: 'vote_average.desc', label: 'Mejor valoradas Desc' },
    { value: 'vote_average.asc', label: 'Mejor valoradas Asc' },
    { value: 'revenue.asc', label: 'Ingresos Asc' },
    { value: 'revenue.desc', label: 'Ingresos Desc' },
    { value: 'primary_release_date.asc', label: 'Fecha de lanzamiento Asc' },
    { value: 'primary_release_date.desc', label: 'Fecha de lanzamiento Desc' },
  ];

  return (
    <div className={appStyles.root}>
      {isLoading && (
        <div className={styles.spinnerContainer}>
          <Spinner />
          <p className={styles.loading}>Loading...</p>
        </div>
      )}
      {error && (
        <div className={appStyles.root}>
          <Modal isOpen={showModal} toggle={() => setShowModal(!showModal)}>
            <ModalHeader className={styles.error} toggle={() => setShowModal(!showModal)}>Error</ModalHeader>
            <Fade>
              <ModalBody>{errorMessage}</ModalBody>
            </Fade>
            <ModalFooter>
              <Button color='secondary' onClick={() => setShowModal(!showModal)}>Close</Button>
            </ModalFooter>
          </Modal>
        </div>
      )}
      {!isLoading && !error && (
        <div>
          <div className={styles.containerSelect}>
            <ListOptions
              title="Filtrar por género:"
              options={genreOptions}
              selectedOption={genreOptions.find(option => option.value === selectedGenre?.toString()) || null}
              onChange={handleGenreChange}
              onClear={handleClearGenre}
            />
            <ListOptions
              title="Ordenar por:"
              options={sortOptions}
              selectedOption={sortOptions.find(option => option.value === sortBy) || null}
              onChange={handleSortChange}
              onClear={handleClearSort}
            />
          </div>
          <MovieList movies={movies} />
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onSelectPage={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Home;

