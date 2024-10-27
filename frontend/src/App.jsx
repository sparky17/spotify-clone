import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./routes/Login";
import './App.css'
import SingUp from "./routes/SingUp";
import Home from "./routes/Home";
import { useCookies } from "react-cookie";

export default function App() {
  console.log("from app");
  const [cookie,setCookie]=useCookies(["token"]);
  console.log(cookie.token);

  return (
    <div className='w-screen h-screen font-poppins'>
   <Router>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
      
      {cookie.token ? (
        // If token exists, redirect all unknown routes to /home
        <Route path="*" element={<Navigate to="/home" />} />
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SingUp />} />
          {/* Redirect unknown routes to /login if not authenticated */}
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  </Router>

    </div>
    
  );
} 