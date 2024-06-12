import './App.css'
import Home from './components/Home';

function App() {
  //Definir una lista de peliculas de ejemplo


  return (
    <>
      <div className="app-container">

        <h1 className="main-title">MOVIE</h1>
      </div>
      <div className='app-filters'>

      </div>
      <Home />
      {/* <MovieList movies={movies} /> */}

      <p role="paragraph" title="read-the-docs" className="read-the-docs">

      </p>
      <footer>
        <div className='app-pagination'></div>
      </footer>
    </>
  )
}

export default App



