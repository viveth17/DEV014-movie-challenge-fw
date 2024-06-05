import './App.css'
import Movie from './models/Movie'
import MovieList from './components/MovieList';

function App() {
    //Definir una lista de peliculas de ejemplo

    const movies: Movie[] = [
        {
            backdrop_path: "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
            genre: [
                878,
                12,
                28
            ],
            id: 653346,
            poster: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
            releaseYear: "2024-05-08",
            title: "Kingdom of the Planet of the Apes",
            rating: 6.933
        },
        {
            backdrop_path: "/z121dSTR7PY9KxKuvwiIFSYW8cf.jpg",
            genre: [
                10752,
                28,
                18
            ],
            id: 929590,
            poster: "/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg",
            releaseYear: "2024-04-10",
            title: "Civil War",
            rating: 7.097
        },
        {
            backdrop_path: "/otfoeC96neoOdA4HqsX06OWuzE9.jpg",
            genre: [
                27,
                53
            ],
            id: 719221,
            poster: "/gAEUXC37vl1SnM7PXsHTF23I2vq.jpg",
            releaseYear: "2024-05-01",
            title: "Tarot",
            rating: 6.479
        },
        {
            backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
            genre: [
                878,
                28,
                12
            ],
            id: 823464,
            poster: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
            releaseYear: "2024-03-27",
            title: "Godzilla x Kong: The New Empire",
            rating: 7.234
        },
        {
            backdrop_path: "/3TNSoa0UHGEzEz5ndXGjJVKo8RJ.jpg",
            genre: [
                878,
                28
            ],
            id: 614933,
            poster: "/bcM2Tl5HlsvPBnL8DKP9Ie6vU4r.jpg",
            releaseYear: "2024-05-23",
            title: "Atlas",
            rating: 6.74
        },
        {
            backdrop_path: "/tkHQ7tnYYUEnqlrKuhufIsSVToU.jpg",
            genre: [
                27
            ],
            id: 437342,
            poster: "/uGyiewQnDHPuiHN9V4k2t9QBPnh.jpg",
            releaseYear: "2024-04-03",
            title: "The First Omen",
            rating: 6.807
        },
        {
            backdrop_path: "/H5HjE7Xb9N09rbWn1zBfxgI8uz.jpg",
            genre: [
                28,
                35,
                80,
                9648,
                10749
            ],
            id: 746036,
            poster: "/tSz1qsmSJon0rqjHBxXZmrotuse.jpg",
            releaseYear: "2024-04-24",
            title: "The Fall Guy",
            rating: 7.296
        },
        {
            backdrop_path: "/fY3lD0jM5AoHJMunjGWqJ0hRteI.jpg",
            genre: [
                878,
                27,
                28
            ],
            id: 940721,
            poster: "/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg",
            releaseYear: "2023-11-03",
            title: "Godzilla Minus One",
            rating: 7.675
        },
        {
            backdrop_path: "/shrwC6U8Bkst9T9J7fr1A50n6x6.jpg",
            genre: [
                28,
                12,
                878
            ],
            id: 786892,
            poster: "/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
            releaseYear: "2024-05-22",
            title: "Furiosa: A Mad Max Saga",
            rating: 7.73
        },
        {
            backdrop_path: "/1m1rXopfNDVL3UMiv6kriYaJ3yE.jpg",
            genre: [
                28,
                53,
                80,
                878
            ],
            id: 882059,
            poster: "/25JskXmchcYwj3jHRmcPm738MpB.jpg",
            releaseYear: "2024-04-24",
            title: "Boy Kills World",
            rating: 6.88
        },
        {
            backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
            genre: [
                878,
                12
            ],
            id: 693134,
            poster: "/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg",
            releaseYear: "2024-02-27",
            title: "Dune: Part Two",
            rating: 8.168
        },
        {
            backdrop_path: "/kYgQzzjNis5jJalYtIHgrom0gOx.jpg",
            genre: [
                16,
                28,
                10751,
                35,
                14
            ],
            id: 1011985,
            poster: "/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
            releaseYear: "2024-03-02",
            title: "Kung Fu Panda 4",
            rating: 7.115
        },
        {
            backdrop_path: "/iafs5DG5fGq7ef0acl3xlX4BFrs.jpg",
            genre: [
                18,
                10770
            ],
            id: 1219685,
            poster: "/4xJd3uwtL1vCuZgEfEc8JXI9Uyx.jpg",
            releaseYear: "2024-04-21",
            title: "Un père idéal",
            rating: 5.695
        },
        {
            backdrop_path: "/qjoX7hl721FOiyeHsDkeQ6rFVLl.jpg",
            genre: [
                16,
                10751,
                18,
                12,
                35
            ],
            id: 1022789,
            poster: "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
            releaseYear: "2024-06-12",
            title: "Inside Out 2",
            rating: 0.0
        },
        {
            backdrop_path: "/vWzJDjLPmycnQ42IppEjMpIhrhc.jpg",
            genre: [
                16,
                35,
                10751,
                12
            ],
            id: 748783,
            poster: "/p6AbOJvMQhBmffd0PIv0u8ghWeY.jpg",
            releaseYear: "2024-04-30",
            title: "The Garfield Movie",
            rating: 6.545
        },
        {
            backdrop_path: "/5Eip60UDiPLASyKjmHPMruggTc4.jpg",
            genre: [
                27,
                9648,
                53
            ],
            id: 1041613,
            poster: "/fdZpvODTX5wwkD0ikZNaClE4AoW.jpg",
            releaseYear: "2024-03-20",
            title: "Immaculate",
            rating: 6.273
        },
        {
            backdrop_path: "/42rp8MkwOEFA62wwgKcuOpP8Fjb.jpg",
            genre: [
                28,
                36,
                18,
                10752
            ],
            id: 660360,
            poster: "/wFAe7gA513Pi2meI4ECwf6YEKR1.jpg",
            releaseYear: "2023-12-20",
            title: "Noryang: Deadly Sea",
            rating: 7.207
        },
        {
            backdrop_path: "/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg",
            genre: [
                28,
                80,
                53
            ],
            id: 385687,
            poster: "/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
            releaseYear: "2023-05-17",
            title: "Fast X",
            rating: 7.121
        },
        {
            backdrop_path: "/qwK9soQmmJ7kRdjLZVXblw3g7AQ.jpg",
            genre: [
                28,
                12,
                53,
                80
            ],
            id: 7451,
            poster: "/xeEw3eLeSFmJgXZzmF2Efww0q3s.jpg",
            releaseYear: "2002-08-09",
            title: "xXx",
            rating: 5.934
        },
        {
            backdrop_path: "/s9hW1DHfgy5ppK1fTUJuMKh4YFK.jpg",
            genre: [
                28,
                53
            ],
            id: 980083,
            poster: "/29UCk1nvPzn2XubLk5rKDMlHBRu.jpg",
            releaseYear: "2022-05-20",
            title: "Top Gunner: Danger Zone",
            rating: 4.0
        }
    ];


    return (
        <>
            <div className="app-container">
                <h1 className="main-title">MOVIE</h1>
            </div>
            <div className='app-filters'>

            </div>
            <MovieList movies={movies} />


            <p role="paragraph" title="read-the-docs" className="read-the-docs">

            </p>
            <footer>
                <div className='app-pagination'></div>
            </footer>
        </>
    )
}

export default App
