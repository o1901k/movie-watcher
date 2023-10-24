import NavBar from './components/Navbar';
import Home from './pages/Home';
import LogIn from './pages/login/Login';
import Register from './pages/register/Register';
import MovieDetails from './pages/MovieDetails';
import AuthContext from './context/AuthContext';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { userObserver } from './firebase';



function App() {
  const [LogInUser, setLogInUser] =  useState(true);
  useEffect(() => {
    userObserver(setLogInUser);
  }, [])
  return (
    <AuthContext.Provider value={{LogInUser}}>
    <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LogIn/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/details/:id' element={<MovieDetails/>}/>
      </Routes>
    </AuthContext.Provider>   
  )
   
}

export default App;
