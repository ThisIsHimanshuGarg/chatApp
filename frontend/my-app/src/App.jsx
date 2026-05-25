import React from 'react'
import Login from './Pages/Login';
import Singup from './Pages/Singup';
import Page from './Pages/Page';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
   <>
    <BrowserRouter>
       <ToastContainer
       position="top-right"
        autoClose={3000}
       />
      <Routes>
        <Route path="/" element={<Singup/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="*" element={<Page/>} />
      </Routes>
    </BrowserRouter>
   </>   

  )
}

export default App

