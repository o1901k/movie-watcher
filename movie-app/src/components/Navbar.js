import { useContext, useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { logout } from '../firebase';
import MovieContext from '../context/MovieContext';
import axios from 'axios';

   
    
    
const NavBar = () => {
    const {LogInUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const {movies, setMovies} = useContext(MovieContext);
    const [search, setSearch] = useState('');
    const baseUrl = ' https://kinopoiskapiunofficial.tech/api/v2.1/films';
    axios.defaults.headers = {'X-API-KEY': '6c5fa0f9-d88e-4ccf-b2be-86198565ef10'};
    const searchUrl = `${baseUrl}/search-by-keyword?keyword=`;

    const logoutHandler = () => {
        logout();
        navigate('/');
    };
    const seacrchHandler = async () => {
        const result = await axios.get(`${searchUrl}${search}`);
        console.log(result.data)
        setMovies(result.data.films);
    }

    return (
        <nav className='navbar navbar-expand-lg fixed-top navbar-dark' style={{backgroundColor: '#070707'}}>
            <div className='container-fluid'>
                <Link to='/' className='navbar-brand'><h4 className='text-danger'>Movie Watcher</h4></Link>
                <>
                <form className="d-flex mx-auto" style={{flexGrow: 0.6}}>
                    <input className="form-control me-2" type="search" placeholder="Search" 
                    aria-label="Search"  style={{flexBasic: 200}} onChange={ (event) => setSearch(event.target.value) } value = { search }/>
                    <button className="btn btn-outline-danger" type="button" onClick={ seacrchHandler }>Search</button>
                </form>
                </>
                <div className='d-flex align-items-center mx-auto'>
                 {LogInUser? (
                      <>
                        <button type='button' className='ms-2 btn btn-outline-light' >History</button>
                        <button type='button' className='ms-2 btn btn-outline-light' >Favorites</button>
                        <h4 className='text-capitalize d-inline-block text-light mx-2'>{ LogInUser?.displayName }</h4>
                        <button type='button' className='ms-2 btn btn-outline-danger' onClick={logoutHandler}>LogOut</button>
                      </>  
                    ) : (
                        <>
                            <button type='button' className='ms-2 btn btn-outline-danger' onClick={() => navigate('/login')}>LogIn</button>
                            <button type='button' className='ms-2 btn btn-outline-danger' onClick={() => navigate('/register')}>Register</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
};

export default NavBar;