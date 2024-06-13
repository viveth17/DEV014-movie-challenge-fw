import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import Movie from '../models/Movie';
import { getMovies } from '../services/APIService';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Loading } from '../components/Loading';
import { Spinner } from "reactstrap"



const Home: React.FC = () => {
  //componente de modo cargando
  const [isLoading, setIsLoading] = useState(true);

  // Estado para las películas
  const [movies, setMovies] = useState<Movie[]>([]);

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
      .catch(error => {
        console.error('Error fetching movies:', error);
        setIsLoading(false);
      });
    }, delay);
    // setIsLoading(false); // Desactiva modo "cargando"
  }, []);

  if (isLoading) { // si esta cargando, mostramos un texto que lo indique 
    return (
      <div className='App'>
        <Spinner />  
         <p className='loagin-text'>Loading...</p> 
      </div>
    );
  }
  else {
    return (
      <div>
        <MovieList movies={movies} />
      </div>
    );
  }
};


export default Home;


