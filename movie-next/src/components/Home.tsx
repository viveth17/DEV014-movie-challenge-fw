import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import Movie from '../models/Movie';
import { getMovies } from '../services/APIService';
import { getMovieGenres } from '../services/movieService';
import { formatGenresToMap, formatGenresToOptions } from '../utils/transformers';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, Modal, ModalHeader, ModalBody, ModalFooter, Button, Fade } from 'reactstrap';
import PaginationComponent from './Pagination';
import { useSearchParams } from 'react-router-dom';
import ListOptions from '../components/ListOptions';
import styles from '../styles/Home.module.css';
import appStyles from '../styles/App.module.css';
import movieListStyles from '../styles/MovieList.module.css';


const Home: React.FC = () => {
  //componente de modo cargando
  const [isLoading, setIsLoading] = useState(true);
  // Estado para las películas
  const [movies, setMovies] = useState<Movie[]>([]);
  // estado de error
  const [error, setError] = useState(false);
  // estado para controlar visibilidad del modal
  const [showModal, setShowModal] = useState(false);
  //estado para almacenar el mensaje de error 
  const [errorMessage, setErrorMessage] = useState('');
  //hook de react-router-dom para gestionar los parámetros de búsqueda en la URL
  const [searchParams, setSearchParams] = useSearchParams();

  const [genresMap, setGenresMap] = useState<Map<number, string>>(new Map());

  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);  // Estado para género seleccionado
  const [sortBy, setSortBy] = useState<string | null>(null);  // Estado para ordenamiento


  // Extraer la página actual de los parámetros de búsqueda, por defecto será 1
  //searchParamas.get('page') Obtiene el valor del párametro 'page' de la Url
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [totalPages, setTotalPages] = useState(0);  // Estado para el total de páginas 

  // Función para manejar el cambio de página
  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() }); // Actualiza URL con el nuevo número de página, 
    //toString: Convierte el valor de 'page' que es un número a una cadena de texto 
  };

  const handleGenreChange = (option: { value: string; label: string } | null) => {
    const genreId = option ? parseInt(option.value) : null;
    setSelectedGenre(genreId);
  };

  const handleSortChange = (option: { value: string; label: string } | null) => {
    setSortBy(option ? option.value : null);
  };

  const handleClearGenre = () => {
    setSelectedGenre(null);
  };

  const handleClearSort = () => {
    setSortBy(null);
  };

  // useEffect para obtener las películas
  useEffect(() => {
    const fetchMovies = async (page: number, genreId: number | null, sortBy: string | null) => {
      try {
        setIsLoading(true);
        const genres = await getMovieGenres();
        // console.log('Generos encontrados:', genres); 
        const genresMap = formatGenresToMap(genres);
        setGenresMap(genresMap); // actualizando el estado de genresMap
        const response = await getMovies({ filters: { page, genreId, sortBy } }, genresMap);
        setMovies(response.movies);
        setTotalPages(response.metaData.pagination.totalPages);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(true); // activando el estado de error 
        setErrorMessage('An error occurred while fetching data from the API.'); // Establecemos el mensaje de error
        setShowModal(true); // Mostramos el modal en caso de error
      }
    };

    fetchMovies(currentPage, selectedGenre, sortBy); // Llama a fetchMovies cuando se carga el componente y cada vez que currentPage cambia
  }, [currentPage, selectedGenre, sortBy])

  const genreArray = Array.from(genresMap, ([id, name]) => ({ id, name }));
  const genreOptions = formatGenresToOptions(genreArray);

  const sortOptions = [
    { value: 'popularity.desc', label: 'Most Popular' },
    { value: 'release_date.desc', label: 'Newest' },
    { value: 'vote_average.desc', label: 'Top Rated' },
  ];

  return (
    <div className={appStyles.root}>
      {isLoading && (
        <div className={appStyles.root}>
          <Spinner />
          <p className={appStyles.loading}>Loading...</p>
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
          <MovieList movies={movies} />
          <PaginationComponent // Renderiza el componente de paginación
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
