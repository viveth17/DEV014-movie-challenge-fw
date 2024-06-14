import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import Movie from '../models/Movie';
import { getMovies } from '../services/APIService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"




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

  // useEffect para simular la carga de datos
  useEffect(() => {
    // Simular un tiempo de respuesta de la API con un retraso de 5 segundos
    const delay = 3000;
    // Aquí se hace una llamada a la API para obtener los datos de las películas
    setTimeout(() => {
      getMovies()
        .then(response => {
          setMovies(response); //Setea los datos 
          setIsLoading(false);
        })
        .catch(() => {
          setError(true); // activando el estado de error 
          setErrorMessage('An error occurred while fetching data from the API.'); // Establecemos el mensaje de error
          setShowModal(true); // Mostramos el modal en caso de error
          setIsLoading(false);
        });
    }, delay);
  }, []);

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
              <Button color="secondary" onClick={() => setShowModal(!showModal)}>Close</Button>
            </ModalFooter>
          </Modal>
        </div>
      )}
      {!isLoading && !error && (
        <div>
          <MovieList movies={movies} />
        </div>
      )}
    </div>
  );
};

export default Home;






















// return (
//   <div className='App'>
//     <Message text="An error occurred while fetching data from the API." />
//   </div>
// );



