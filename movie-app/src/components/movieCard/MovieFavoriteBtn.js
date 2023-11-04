import { useState, useContext} from "react";
import React from "react";
import FavoriteContext from '../../context/FavoriteContext';
import axios from "axios";
import classes from './MovieCard.module.css';

const MovieFavoriteBtn = (props) => {
const kinopoiskId = props.kinopoiskId;
const baseUrl = 'https://kinopoiskapiunofficial.tech/api/v2.2/films';
axios.defaults.headers = {'X-API-KEY': '6c5fa0f9-d88e-4ccf-b2be-86198565ef10'};
const [favorite, setFavorite] = useState();
const  {favoriteMovies, setFavoriteMovies} = useContext(FavoriteContext);

const addFavouriteMovie = (id) => {
    localStorage.setItem(id, id);
    axios.get(`${baseUrl}/${id}`).then(res=> { 
        const newFavouriteList = [...favoriteMovies, res.data];
        setFavoriteMovies(newFavouriteList)})	
};

const removeFavouriteMovie = (id) => {
    localStorage.removeItem(id);
    const newFavouriteList = favoriteMovies.filter(
        (favoriteMovie) => favoriteMovie.kinopoiskId !== id
    );
    setFavoriteMovies(newFavouriteList);
};
    return(localStorage.getItem(kinopoiskId)||favorite ? 
          (<button title='Add to favorite' type="button" className={classes.favorite} id={kinopoiskId} onClick={() =>{ 
        return (  removeFavouriteMovie(kinopoiskId),  setFavorite(false)) }}><i className="fa-solid fa-heart fa-2x" style={{color: '#f51919'}}/></button>) 
        : 
        (<button title='Add to favorite' type="button" className={classes.favorite} id={kinopoiskId} onClick={() =>{ 
        return (addFavouriteMovie(kinopoiskId), setFavorite(true))}}><i className="fa-regular fa-heart fa-2x" style={{color: '#f51919'}}/></button>)
    )
}

export default MovieFavoriteBtn;
