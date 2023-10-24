import React, {useState} from 'react';
import classes from './Login.module.css';
import {useNavigate} from 'react-router-dom';
import { login, signUpProvider, forgotPassword } from '../../firebase';

const LogIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(null);
    const submitHandler = async() => {
        if(!email || !password) {
            setError('Invalid Entry');
            return;
        }
        const message = await login(email, password);
        if(message) {
            setError(message);
            navigate('/login');
            return;
        }
        setError(null);
        navigate('/');
    };
    const providerHandler = () => {
        signUpProvider();
        navigate('/');
    };
    const forgotPasswordHandler = async(email) => {
        const message = await forgotPassword(email);
        if(message) setError(message);
    }
    return (
        <div className={`${classes.LogIn} page`}>
        <div className={classes.LogInForm}>
            <h1>LogIn</h1>
            {error&& <p className='text-danger text-center m-3'>{error}</p>}
            <form>
                <div className='mb-3'>
                    <label htmlFor='email' className='form-label text-light'>Email</label>
                    <input type='email' className='form-control' id='email' autoComplete='off' placeholder='Enter your Email' 
                    value={email} onChange={(event)=> setEmail(event.target.value)}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='password' className='form-label text-light'>Password</label>
                    <input type='password' className='form-control' id='password' placeholder='Enter your Password'
                    value={password} onChange={(event)=> setPassword(event.target.value)}/>
                    <div className='text-center text-warning mt-3' style={{cursor: 'pointer'}} 
                    onClick={()=>forgotPasswordHandler(email)}>Forgot Password?</div>
                </div>
                <div className='d-grid '>
                <button type='button' className='btn btn-primary form-control mt-3' onClick={submitHandler}>LogIn</button>
                <button type='button' className='btn btn-primary form-control mt-3' onClick={providerHandler}>Continue with Google</button>
                </div>
            </form>
            <p className='text-center text-light mt-3'>Doesn't have an account?
            <span className='text-warning' style={{cursor: 'pointer'}} onClick={()=> navigate('/register')}> Sign Up</span></p>
        </div>
        </div>
    )
};

export default LogIn;