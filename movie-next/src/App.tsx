import './App.css'
import { MovieCard } from './components/MovieCard'
import Movie from './models/Movie'

function App() {
 

  const exampleMovie: Movie = {
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
      <h1>MovieNext</h1>
      <MovieCard movie = {exampleMovie} />

      <p  role="paragraph" title="read-the-docs" className="read-the-docs">
     
      </p>
   
    </>
  )
}

export default App
