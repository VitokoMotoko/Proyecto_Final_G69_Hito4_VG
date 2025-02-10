import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Productos from '../pages/Productos';
import QuienesSomos from '../pages/QuienesSomos';
import Contacto from '../pages/Contacto';
import Login from '../pages/Login';
import Register from '../pages/Register';
import MiPerfil from '../pages/MiPerfil';
import Carrito from '../pages/Carrito';
import Export from '../Export'; // Importa el componente Export

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/quienes-somos" element={<QuienesSomos />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/mi-perfil" element={<MiPerfil />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/export" element={<Export />} /> {/* Añade la ruta para Export */}
      
    </Routes>
  );
};

export default AppRoutes;