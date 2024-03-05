import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
// import Cadastro from './pages/Cadastro';

function Routers() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/cadastro" element={<Cadastro />} /> */}
    </Routes>
  )
};

export default Routers;