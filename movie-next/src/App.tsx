import './App.css'
import { MovieCard } from './components/MovieCard'
import Movie from './models/Movie'

function App() {
 

  const exampleMovie: Movie = {
    id: 653346,
    title: "Godzilla x Kong: The New Empire",
    poster: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
    releaseYear: "2024-03-27",
    genre: [
      878,
      28,
      12
    ],
    rating: 7.261
  };

  return (
    <>
      <div className="app-container">
      <h1 className="main-title">MOVIE</h1>
      </div>
      <div className='app-filters'>
     Aqui van los filtros
      </div>
      <MovieCard movie = {exampleMovie} />
 

      <p  role="paragraph" title="read-the-docs" className="read-the-docs">
     
      </p>
     <footer>
      <div className='app-pagination'>Aqui va la paginacion</div>
     </footer>
    </>
  )
}

export default App
