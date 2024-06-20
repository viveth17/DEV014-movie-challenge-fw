import React, { useState } from 'react';
import './App.css'
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginationComponent from './components/Pagination';

//BrowserRouter) envuelve todo el contenido de la aplicación, proporcionando así el contexto de enrutamiento necesario para que Routes y Route funcionen correctamente
//Routes => actua como contenedor padre de todas las rutas 
//Route => se utiliza para crar una única ruta . Recibe 2 atributos: path(ruta URL), element (componente que debe renderizar el enrutador)

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20; // ajustar esto de acuerdo a nuestras necesidades 

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <Router>
      <div className="app-container">
        <h1 className="main-title">MOVIE</h1>
      </div>
      <div className='app-filters'>
      </div>
      {/* Definicion de rutas y direcciones a sus componentes  */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {/* <MovieList movies={movies} /> */}
      <p role="paragraph" title="read-the-docs" className="read-the-docs">
      </p>
      <footer>
        <div className='app-pagination'>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onSelectPage={handlePageChange}
          />
        </div>
      </footer>
    </Router>
  );
}
export default App



