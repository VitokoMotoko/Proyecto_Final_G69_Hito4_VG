import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Productos from './pages/Productos';
import QuienesSomos from './pages/QuienesSomos';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Register from './pages/Register';
import MiPerfil from './pages/MiPerfil';
import Carrito from './pages/Carrito';
import ProductPage from './pages/ProductPage';
import Pago from './pages/Pago'; // Importa el componente Pago

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/mi-perfil" element={<MiPerfil />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/productos/:id" element={<ProductPage />} />
            <Route path="/pago" element={<Pago />} /> {/* Añade la ruta para Pago */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;