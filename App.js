import React from 'react';

import {BrowserRouter, Routes, Route} from "react-router-dom"
import Books from './pages/Books';
import Update from './pages/Update';
import Add from './pages/Add';
import "./style.css"
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
       <Toaster/>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='/books' element={<Books/>}/>
        <Route path='/update/:id' element={<Update/>}/>
        <Route path='/add' element={<Add/>}/>
      </Routes>
      </BrowserRouter>
    </>
    
  );
}

export default App;
