import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import Movie from '../models/Movie';
import { getMovies } from '../services/APIService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import PaginationComponent from './Pagination';
import { useSearchParams } from 'react-router-dom';

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

  // Extraer la página actual de los parámetros de búsqueda, por defecto será 1
  //searchParamas.get('page') Obtiene el valor del párametro 'page' de la Url
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [totalPages, setTotalPages] = useState(0);  // Estado para el total de páginas 

  // Función para manejar el cambio de página
  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() }); // Actualiza URL con el nuevo número de página, 
    //toString: Convierte el valor de 'page' que es un número a una cadena de texto 
  };

  // useEffect para simular la carga de datos
  useEffect(() => {

    const fetchMovies = async (page: number) => {
      try {
        setIsLoading(true);
        const response = await getMovies({ filters: { page } });
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

    fetchMovies(currentPage); // Llama a fetchMovies cuando se carga el componente y cada vez que currentPage cambia
  }, [currentPage]);

  return (
    <div>
      {isLoading && (
        <div className='App'>
          <Spinner />
          <p className='loading-text'>Loading...</p>
        </div>
      )}
      {error && (
        <div className='App'>
          <Modal isOpen={showModal} toggle={() => setShowModal(!showModal)}>
            <ModalHeader toggle={() => setShowModal(!showModal)}>Error</ModalHeader>
            <ModalBody>{errorMessage}</ModalBody>
            <ModalFooter>
              <Button color='secondary' onClick={() => setShowModal(!showModal)}>Close</Button>
            </ModalFooter>
          </Modal>
        </div>
      )}
      {!isLoading && !error && (
        <div>
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
