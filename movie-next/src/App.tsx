import './App.css'
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//BrowserRouter) envuelve todo el contenido de la aplicación, proporcionando así el contexto de enrutamiento necesario para que Routes y Route funcionen correctamente
//Routes => actua como contenedor padre de todas las rutas 
//Route => se utiliza para crar una única ruta . Recibe 2 atributos: path(ruta URL), element (componente que debe renderizar el enrutador)

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1 className="main-title">MOVIE</h1>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        
      </Routes>
      <p role="paragraph" title="read-the-docs" className="read-the-docs">
      </p>
      <footer>
      </footer>
    </Router>
  );
}
export default App



