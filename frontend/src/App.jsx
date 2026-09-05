import React from 'react';
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';
import InsertEmail from './components/changePassword/InsertEmail.jsx';
import InsertOTP from "./components/changePassword/InsertOTP.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerifyEmail from "./components/register/VerifyEmail.jsx";
import InsertPassword from "./components/changePassword/InsertPassword.jsx";
import Dashboard from "./components/home/Dashboard.jsx";
import NoteCanvas from "./components/editor/NoteCanvas.jsx";

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

          {/*  Home page */}
      <Route path="/dashboard" element={<Dashboard/>} />

          {/*Note Editor Canvas Route*/}
          <Route path="/note/:id" element={
              <NoteCanvas
                  onSave={(strokes)=>{
                      {/*Index db or sqlite db will be used here */}
                  }}
                  />
          }
                 />
      </Routes>

      </BrowserRouter>
  )
}

export default App;