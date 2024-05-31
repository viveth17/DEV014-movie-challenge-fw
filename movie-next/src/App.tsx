import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { MovieCard } from './components/MovieCard'
import Movie from './models/Movie'

function App() {
  const [count, setCount] = useState(0)

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
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p title="read-the-docs" className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <MovieCard movie={exampleMovie} />
    </>
  )
}

export default App
