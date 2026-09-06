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
import "tldraw/tldraw.css";
import ProfilePage from "./components/home/profile/ProfilePage.jsx";
import SettingsPage from "./components/home/profile/SettingsPage.jsx";
import OAuthSuccess from "./components/login/OAuth2Succees.jsx";
const App = () =>{
  return (
      <BrowserRouter>
      <Routes>

          {/*Login*/}
      <Route path="/" element={<Login/>}/>
      <Route path="/oauth-success" element={<OAuthSuccess />} />

          {/*Registration*/}
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail/>} />

          {/*Change Password*/}
      <Route path="/insert-email" element={<InsertEmail />} />
      <Route path="/insert-otp" element={<InsertOTP />} />
      <Route path="/insert-password" element={<InsertPassword />} />

          {/*  Home page */}
      <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* Canva */}
      <Route path="/note/:id" element={ <NoteCanvas /> } />


      </Routes>
      </BrowserRouter>
  )
}

export default App;