import React, {useContext, useState} from 'react';
import classes from './MovieCard.module.css';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';



const MovieCard = (props) => {
const navigate = useNavigate();
const {LogInUser} = useContext(AuthContext);
const {nameOriginal, nameRu, ratingKinopoisk, posterUrl, kinopoiskId, year, type} = props.movie;
const [showModal, setShowModal] = useState(false);

  
const showDetails = (kinopoiskId) => {
    if(LogInUser) {
        navigate(`/details/${kinopoiskId}`)
    } else { return setShowModal(true)}};

const setRatingColor = (rating) => {
if (rating >= 8) return 'green';
else if(rating >= 6) return 'orange';
else if (rating === null) return '';
else return 'red';
};
    return (
        <>       
        <div className={classes.movie} onClick={()=> showDetails(kinopoiskId)}>
        <img src={posterUrl} alt={nameOriginal} />
            <div className='text-center p-2 text-white' style={{borderTop: '1px solid white'}}>
            <h5>{nameOriginal}</h5>
            <h5>{nameRu}</h5>
            {LogInUser&&(
                <><span className={ classes.rating } style={{backgroundColor: setRatingColor(ratingKinopoisk)}}>{ratingKinopoisk}</span>
                <button title='Add to favorite' type="button" className={classes.favorite}><i className="fa-regular fa-heart fa-2x" style={{color: '#f51919'}}/></button>
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
                 <button type="button" class="btn btn-outline-danger mt-3" onClick={() => setShowModal(false)}>Ok</button>
                </div>
            </div>
                </>, document.body)}  
        </>
        
    )
};

export default MovieCard;