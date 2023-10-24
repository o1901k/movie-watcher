import React, {useState} from 'react';
import classes from './Register.module.css';
import {useNavigate} from 'react-router-dom';
import {registerUser} from '../../firebase';
import { signUpProvider } from '../../firebase';

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [error, setError] = useState(null);
    const submitHandler = async() => {
        if(!name || !email || !password) {
            setError('Invalid Entry')
            return;
        }
        const message = await registerUser(email, password, name);
        if(message) {
            setError(message);
            navigate('/register');
            return;
        }
        setError(null);
        navigate('/');
    };
    const providerHandler = () => {
        signUpProvider();
        navigate('/');
    };
    return (
        <div className={`${classes.Register} page`}>
        <div className={classes.RegisterForm}>
            <h1>Register</h1>
            {error&& <p className='text-danger text-center m-3'>{error}</p>}
            <form>
            <div className='mb-3'>
                    <label htmlFor='name' className='form-label text-light'>Name</label>
                    <input type='text' className='form-control' id='name' placeholder='Enter your Name' 
                    value={name} onChange={(event)=> setName(event.target.value)}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='email' className='form-label text-light'>Email</label>
                    <input type='email' className='form-control' id='email' autoComplete='off' placeholder='Enter your Email' 
                    value={email} onChange={(event)=> setEmail(event.target.value)}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='password' className='form-label text-light'>Password</label>
                    <input type='password' className='form-control' id='password' placeholder='Enter your Password'
                    value={password} onChange={(event)=> setPassword(event.target.value)}/>
                </div>
                <div className='d-grid '>
                <button type='button' className='btn btn-primary form-control mt-3' onClick={submitHandler}>Sign Up</button>
                <button type='button' className='btn btn-primary form-control mt-3' onClick={providerHandler}>Continue with Google</button>
                </div>
            </form>
            <p className='text-center text-light mt-3'>Has an account?
            <span className='text-warning' style={{cursor: 'pointer'}} onClick={()=> navigate('/login')}> LogIn</span></p>
        </div>
        </div>
    )
};

export default Register;