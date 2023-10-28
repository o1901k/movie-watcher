import React, {useEffect, useContext} from 'react';
import axios from 'axios';
import MovieCard from '../components/movieCard/MovieCard';
import MovieContext from '../context/MovieContext';

const baseUrl = ' https://kinopoiskapiunofficial.tech/api/v2.2/films';
axios.defaults.headers = {'X-API-KEY': '6c5fa0f9-d88e-4ccf-b2be-86198565ef10'};
const movieUrl = `${baseUrl}/collections`;
const Home = () => {
    const {movies, setMovies} = useContext(MovieContext);
    useEffect(()=> {fetchMovies(movieUrl)}, []);
    const fetchMovies = async(movieUrl) => {
        const result = await axios.get(movieUrl);
         console.log(result.data.items);
        setMovies(result.data.items);
        };
        return (
            <div className='d-flex justify-content-center flex-wrap page' style={{background: '#070707'}}>
            {movies.map(movie => <MovieCard key={movie.kinopoiskId} movie={movie}/>)}
        </div>
    )
}
export default Home;