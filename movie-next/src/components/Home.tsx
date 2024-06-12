import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import Movie from '../models/Movie';
import { getMovies } from '../services/APIService';


const Home: React.FC = () => {
  //componente de modo cargando
  const [isLoading, setIsLoading] = useState(true);

  // Estado para las películas
  const [movies, setMovies] = useState<Movie[]>([]);

  // useEffect para simular la carga de datos
  useEffect(() => {
    // Aquí se puede hacer una llamada a una API para obtener los datos de las películas
    getMovies()
      .then(response => {
        setMovies(response); //Setea los datos 
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
      setIsLoading(false); // Desactiva modo "cargando"
  }, []);

  if (isLoading) { // si esta cargando, mostramos un texto que lo indique 
    console.log("is loading...");
    return (
      <div className='App'>
        <h1>Loading...</h1>
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


