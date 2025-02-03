import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

// Componente Header: contiene el logo, menú de navegación y botones de sesión
const Header = () => {
  return (
    <header className="header">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo de la empresa */}
        <div className="logo">Mi Logo</div>
        {/* Menú de navegación */}
        <nav>
          <Link to="/productos" className="btn btn-link">Productos</Link>
          <Link to="/quienes-somos" className="btn btn-link">Quienes Somos</Link>
          <Link to="/locales" className="btn btn-link">Locales</Link>
          {/* Barra de búsqueda */}
          <input type="text" placeholder="Buscar" className="form-control" />
        </nav>
        {/* Botones de sesión */}
        <div>
          <button className="btn btn-light">Iniciar Sesión</button>
          <button className="btn btn-light">Registrarse</button>
        </div>
      </div>
    </header>
  );
};

export default Header;