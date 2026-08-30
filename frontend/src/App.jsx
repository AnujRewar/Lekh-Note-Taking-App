import React from 'react';
import Login from './components/login/login.jsx';
import Register from './components/register/register.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";


const App = () =>{
  return (
      <BrowserRouter>
      <Routes>

      <Route path="/" element={<Login/>}/>

      <Route path="/register" element={<Register />} />

      </Routes>
      </BrowserRouter>
  )
}

export default App;