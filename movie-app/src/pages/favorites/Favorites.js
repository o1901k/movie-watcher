import { React, useContext } from 'react';
import MovieCard from '../../components/movieCard/MovieCard';
import FavoriteContext from '../../context/FavoriteContext';

const FavoriteList = () => {
const {favoriteMovies} = useContext(FavoriteContext);
const list = localStorage.length;
	return (
    list ?
(<div className='d-flex justify-content-center flex-wrap vh-100 page' style={{background: '#070707'}}>
{favoriteMovies.map(favoriteMovie => <MovieCard key={favoriteMovie.kinopoiskId} movie={favoriteMovie}/>)}</div>)  :
(<div className='d-flex justify-content-center align-items-center vh-100 page' style={{background: '#070707', color: '#FFF'}}>
  <h3>Add something to favorite</h3></div>)
  )  
};
export default FavoriteList;