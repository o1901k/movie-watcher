
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const MovieDetails = () => {
    const [MovieDetails, setMovieDetails] = useState();
    const {id} = useParams();
    const baseUrl = 'https://kinopoiskapiunofficial.tech/api/v2.2/films';
    const movieDetailsUrl = `${baseUrl}/${id}`;
    axios.defaults.headers = {'X-API-KEY': '6c5fa0f9-d88e-4ccf-b2be-86198565ef10'};

    useEffect(()=> {
        axios.get(movieDetailsUrl).then(result=> {console.log(result.data); setMovieDetails(result.data)});
     }, []);
    
    return (
        <div className='py-5 page' style={{background: '#555'}}>
            <div className='container'>
                <div className='card mb-3 bg-dark text-light shadow-lg'>
                    <div className='row'>
                        <div className='col-md-4 '>
                            <img src={MovieDetails?.posterUrl} alt={MovieDetails?.nameOriginal} className='img-fluid rounded-start'/>
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item d-flex justify-content-between'>
                                <b>Year:</b> <span>{MovieDetails?.year}</span></li>
                                <li className='list-group-item d-flex justify-content-between'>
                                <b>Rate:</b> <span>{MovieDetails?.ratingKinopoisk || MovieDetails?.ratingImdb}</span></li>
                                <li className='list-group-item d-flex justify-content-center'>
                                <button title='Add to favorite' type="button" className='btn btn-outline-danger'>Add to favorite</button></li>
                                <li className='list-group-item text-center'>
                                <Link to={-1} className='btn btn-primary'>Go Back</Link>
                                </li>
                            </ul>
                        </div>
                        <div className='col-md-8 d-flex flex-column'>
                        <div className='card-body'>
                        <h3 className='text-center'>{MovieDetails?.nameOriginal}</h3>
                        <h3 className='text-center'>{MovieDetails?.nameRu}</h3>                 
                       <h5 className='card-title mt-4'>{MovieDetails?.slogan}</h5>
                        <p className='card-title mt-4'>{MovieDetails?.description}</p>
                        <b>Rating Mpaa:</b><span className='card-title mt-4'> {MovieDetails?.ratingMpaa}</span>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default MovieDetails;