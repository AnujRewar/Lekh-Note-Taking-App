import React from 'react';
import Login from './components/login/login.jsx';
import Register from './components/register/register.jsx';
import InsertEmail from './components/changePassword/insertEmail.jsx';
import InsertOTP from "./components/changePassword/insertOTP.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerifyEmail from "./components/register/verifyEmail.jsx";
import InsertPassword from "./components/changePassword/insertPassword.jsx";


const App = () =>{
  return (
      <BrowserRouter>
      <Routes>

      <Route path="/" element={<Login/>}/>

      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail/>} />

      <Route path="/insert-email" element={<InsertEmail />} />
      <Route path="/insert-otp" element={<InsertOTP />} />
      <Route path="/insert-password" element={<InsertPassword />} />
      </Routes>
      </BrowserRouter>
  )
}

export default App;