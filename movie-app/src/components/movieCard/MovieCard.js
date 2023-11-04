import React, {useContext, useState} from 'react';
import classes from './MovieCard.module.css';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import MovieFavoriteBtn from './MovieFavoriteBtn';


const MovieCard = (props) => {
const navigate = useNavigate();
const {LogInUser} = useContext(AuthContext);
const {nameOriginal, nameRu, ratingKinopoisk, posterUrl, kinopoiskId, year, type, rating, filmId} = props.movie;
const [showModal, setShowModal] = useState(false);

  
const showDetails = (id) => {
    if(LogInUser) {
        navigate(`/details/${id}`)
    } else { return setShowModal(true)}};

const setRatingColor = (rating) => {
if (rating >= 8) return 'green';
else if(rating >= 6) return 'orange';
else if (rating < 6) return 'red';
else return '';
};
    return (
        <>       
        <div className={classes.movie} onClick={()=> showDetails(kinopoiskId||filmId)}>
        <img src={posterUrl} alt={nameOriginal} />
            <div className='text-center p-2 text-white' style={{borderTop: '1px solid white'}} onClick={(e) => e.stopPropagation()}>
            <h5>{nameOriginal}</h5>
            <h5>{nameRu}</h5>
            {LogInUser&&(
                <><span className={ classes.rating } style={{backgroundColor: setRatingColor(ratingKinopoisk||rating)}}>{ratingKinopoisk||rating}</span>
                <MovieFavoriteBtn kinopoiskId={kinopoiskId||filmId} />
                </>
                )}
            </div>
            <div className={classes.overview}>
                <h5>{year}</h5>
                <h5>{type}</h5>
            </div>
        </div>
        {showModal && createPortal(
                <>
                <div className=' vw-100 vh-100' style={{position: 'absolute', top: '0', backgroundColor: 'rgba(0, 0, 0, 0.7)'}}> 
                <div className='class="alert alert-light text-center p-4' style={{position: 'fixed', top: '40%', left: '40%'}}>
                <h5>Please, LogIn to see movie details.</h5>
                 <button type="button" className="btn btn-outline-danger mt-3" onClick={() => setShowModal(false)}>Ok</button>
                </div>
            </div>
                </>, document.body)}  
        </>
        
    )
};

export default MovieCard;