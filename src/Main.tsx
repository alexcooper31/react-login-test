import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './Main.scss';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/Signup';

const Main = () => (
  <div className='mainContainer'>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  </div>
);

export default Main;
